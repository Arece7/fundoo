/** Purpose         : For changing color of Notes
 *  @description
 *  @file           : change-color.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { NoteService } from '../../core/services/noteService/note.service';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: "app-change-color",
  templateUrl: "./change-color.component.html",
  styleUrls: ["./change-color.component.scss"]
})
export class ChangeColorComponent implements OnInit {
  @Input()
  Delete: any;
  @Input()
  note;
  @Output()
  eventEmit = new EventEmitter();
  constructor(private service: NoteService, public snackbar: MatSnackBar) {}

  ngOnInit() {}
  // for changing the color
  setcolor(str) {
    if (this.note) {
      var idlist = [];
      idlist.push(this.note.id);

      var body = {
        color: str,
        noteIdList: idlist
      };

      //api call for changing color

      this.service
        .changecolor(body)
        .subscribe(
          data => {

            this.eventEmit.emit(str);
            this.snackbar.open("Note", "Color Changed", {
              duration: 2000
            });
          },
          error => {

            this.snackbar.open("Note", "Color not changed,Try again", {
              duration: 2000
            });
          }
        );
    } else {
      this.eventEmit.emit(str);
    }
  }
}
