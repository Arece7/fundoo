import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { NoteService } from  '../../core/services/noteService/note.service';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-archive",
  templateUrl: "./archive.component.html",
  styleUrls: ["./archive.component.scss"]
})
export class ArchiveComponent implements OnInit {
  @Input()
  note: any;
  @Output()
  eventEmit = new EventEmitter();
  @Input()
  Delete: any;
  constructor(private service: NoteService, public snackbar: MatSnackBar) {}
  public isArchived = false;
  public isDeleted = false;
  ngOnInit() {
    if (this.note != undefined && this.note.isArchived == true) {
      this.isArchived = true;
    }
    if (this.note != undefined && this.note.isDeleted == true) {
      this.isDeleted = true;
    }
  }

  ArchiveNotes(flag) {
    if (this.note) {


      var idList = [];
      idList.push(this.note.id);
      var body = {
        isArchived: flag,
        noteIdList: idList
      };
      if (this.note != undefined && this.note.noteLabels.length != undefined) {
        this.service.addArchive(body).subscribe(
          data => {


            this.eventEmit.emit({});
          },
          error => {

          }
        );
      }
    } else {
      this.eventEmit.emit({});
    }
  }
}
