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
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent implements OnInit {
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
    this.labels = this.data.noteLabels;

  }
/**@function:onClick() for closing & update the change in note card */
  onNoClick(): void {
    this.dialogRef.close();
    this.update();
  }
  /**@function:update() for updating the contents */
  update() {
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
      error => {

      }
    );
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
      .subscribe(
        Response => {

        },
        error => {

        }
      );
  }
}
