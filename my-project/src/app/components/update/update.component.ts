/** Purpose         : For update Notes
 *  @description
 *  @file           : update.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit, Inject, Output, EventEmitter } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { UserService } from "../../core/services/user.service";
import { MatSnackBar } from "@angular/material";
@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"]
})
export class UpdateComponent implements OnInit {
  public checklist = false;
  public modifiedCheckList;
  public newList;
  public tempArray = [];
  public newData: any = {};
  @Output()
  onNewEntryAdded = new EventEmitter();
  public labels = [];
  constructor(
    public dialogRef: MatDialogRef<UpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: UserService,
    public snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.tempArray = [];
    this.labels = this.data.noteLabels;
    if (this.data.noteCheckLists.length > 0) {
      this.checklist = true;
    }
    this.tempArray = this.data.noteCheckLists;
  }
  /**@function:onClick() for closing & update the change in note card */
  onNoClick(): void {
    this.dialogRef.close();

    this.update();
  }
  /**@function:update() for updating the contents */
  update() {
    if (this.checklist == false) {
      var title = document.getElementById("title").innerHTML;
      var description = document.getElementById("description").innerHTML;

      var body = {
        title: title,
        description: description,
        noteId: [this.data.id]
      };

      var token = localStorage.getItem("token");

      this.service.addingNote("/notes/UpdateNotes", body, token).subscribe(
        data => {
          this.labels = [];

          this.onNewEntryAdded.emit({});
        },
        error => {}
      );
    } else {
      if(this.modifiedCheckList!=null){
      var apiData = {
        itemName: this.modifiedCheckList.itemName,
        status: this.modifiedCheckList.status
      };

      var url =
        "notes/" +
        this.data.id +
        "/checklist/" +
        this.modifiedCheckList.id +
        "/update";
      this.service
        .post(url, JSON.stringify(apiData), localStorage.getItem("token"))
        .subscribe(response => {
          console.log(response);
          console.log(this.modifiedCheckList.itemName);
        });
      }
    }
  }
  editing(editedList, event) {
    console.log(editedList);
    console.log(event);
    if (event.code == "Enter"||event.isTrusted==true) {
      this.modifiedCheckList = editedList;
      this.update();
    }
  }
  updateColor = this.data.color;

  /**@function: colorUpdate() for catching the changes */

  colorUpdate(event) {
    if (event) {
      this.updateColor = event;
    }
  }
  /**@function: eventOccured() for catching the changes */
  eventOccured(event) {
    if (event) {
      this.dialogRef.close();
    }
  }
  /**@function:  labelAdded() for catching the changes */
  labelAdded(event) {
    if (event.isChecked == true) {
      this.labels.push(event);
    } else {
      let temp = [];
      for (let i = 0; i < this.labels.length; i++) {
        if (this.labels[i].id === event.id) {
          continue;
        }
        temp.push(this.labels[i]);
      }
      this.labels = temp;
    }
  }
  /**@function:  deleteLabel() for deleting labels */
  deleteLabel(note, label) {
    this.labels.splice(this.labels.indexOf(event), 1);
    var token = localStorage.getItem("token");
    this.service
      .post(
        "/notes/" + note + "/addLabelToNotes/" + label + "/remove",
        null,
        token
      )
      .subscribe(Response => {}, error => {});
  }
  checkBox(checkList) {
    if (checkList.status == "open") {
      checkList.status = "close";
    } else {
      checkList.status = "open";
    }
    console.log(checkList);
    this.modifiedCheckList = checkList;
    this.update();
  }
  public removedList;
  removeList(checklist) {
    console.log(checklist);
    this.removedList = checklist;
    this.removeCheckList();
  }
  removeCheckList() {
    var url =
      "notes/" + this.data.id + "/checklist/" + this.removedList.id + "/remove";
    this.service
      .post(url, null, localStorage.getItem("token"))
      .subscribe(response => {
        console.log(response);
        for (var i = 0; i < this.tempArray.length; i++) {
          if (this.tempArray[i].id == this.removedList.id) {
            this.tempArray.splice(i, 1);
          }
        }
      });
  }
  public adding = false;
  public addCheck = false;
  public status = "open";
  addList(event) {
    if (this.newList != "") {
      this.adding = true;
    } else {
      this.adding = false;
    }
    if (event.code == "Enter") {
      if (this.addCheck == true) {
        this.status = "close";
      } else {
        this.status = "open";
      }
      this.newData = {
        itemName: this.newList,
        status: this.status
      };

      var url = "notes/" + this.data.id + "/checklist/add";
      this.service
        .post(url, this.newData, localStorage.getItem("token"))
        .subscribe(response => {
          console.log(response);
          this.newList = null;
          this.addCheck = false;
          this.adding = false;
          console.log(response["data"].details);

          this.tempArray.push(response["data"].details);

          console.log(this.tempArray);
        });
    }
  }
}
