/** Purpose         : For Note cards
 *  @description
 *  @file           : notes-collection.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { MatDialog } from "@angular/material";
import { UpdateComponent } from "../update/update.component";
import { DataService } from "../../core/services/data.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-notes-collection",
  templateUrl: "./notes-collection.component.html",
  styleUrls: ["./notes-collection.component.scss"]
})
export class NotesCollectionComponent implements OnInit {
  public notes = [];
  @Output()
  onNewEntryDeleted = new EventEmitter();
  @Output()
  eventEmit = new EventEmitter(); //creating instances of event emitter
  @Input()
  searchInput;
  constructor(
    private service: UserService,
    public dialog: MatDialog,
    private data: DataService, private router: Router
  ) {}

  @Input()
  NoteArray; //receving the array
  @Output() labelname=new EventEmitter();
  @Output()
  update = new EventEmitter();
  ngOnInit() {
    this.view();
  }

  eventOccured(event) {
    if (event) {
      this.onNewEntryDeleted.emit({});
    }
  }
  openDialog(note): void {
    // for dialog mateial
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: "600px",
      data: note
    });

    dialogRef.afterClosed().subscribe(result => {

      this.update.emit();
    });
  }

  deleteLabel(note, label) {
    var token = localStorage.getItem("token");
    this.service
      .post(
        "/notes/" + note["id"] + "/addLabelToNotes/" + label.id + "/remove",
        null,
        token
      )
      .subscribe(
        Response => {

          this.eventEmit.emit({});
        },
        error => {

        }
      );
  }
  toggle=false;
  view()
  {
    this.data.currentView.subscribe(message=>{
    this.toggle=message
    })
  }
  public modifiedCheckList
  checkBox(checkList,note) {

    if (checkList.status == "open") {
      checkList.status = "close"
    }
    else {
      checkList.status = "open"
    }

    this.modifiedCheckList = checkList;
    this.updatelist(note.id);
  }
  updatelist(id){
    var apiData = {
      "itemName": this.modifiedCheckList.itemName,
      "status": this.modifiedCheckList.status
    }
    var url = "notes/" + id + "/checklist/" + this.modifiedCheckList.id + "/update";
    this.service.post(url, JSON.stringify(apiData), localStorage.getItem('token')).subscribe(response => {


    })
  }
  removeRemainder(label) {
    var id =[];
    id.push(label)
    var body={
      "noteIdList" : id
    }
    this.service.deletingNote("/notes/removeReminderNotes",body, localStorage.getItem('token'))
      .subscribe((response) => {

        this.eventEmit.emit({});
      },
        (error) => {

        }
      )
  }
  checkDate(date){
  var Present=new Date().getTime();
  var value=new Date(date).getTime();
  if(value > Present){
  return true;
  }
  else false;
}
labelClick(data) {
  var labelName = data;
  this.router.navigate(["label/" + labelName]);

  this.data.changeView2(labelName)
  // this.labelname.emit(labelName)
}

}
