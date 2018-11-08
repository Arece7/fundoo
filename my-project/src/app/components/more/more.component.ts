/** Purpose         : For more components
 *  @description
 *  @file           : more.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { MatSnackBar } from "@angular/material";

import { MatDialog } from "@angular/material";
@Component({
  selector: "app-more",
  templateUrl: "./more.component.html",
  styleUrls: ["./more.component.css"]
})
export class MoreComponent implements OnInit {
  public searchLabel;

  @Input()
  Delete: any;
  @Input()
  note;
  @Output()
  eventEmit = new EventEmitter();
  @Output()
  labelEvent = new EventEmitter(); //creating instance of event emitter
  constructor(
    private service: UserService,
    public snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  public noteLabels = [];

  ngOnInit() {
    this.getLabels();
  }
  deleteNotes(
    val //for deleting the notes
  ) {
    var token = localStorage.getItem("token");

    var idList = [];
    idList.push(this.note.id);
    var body = {
      isDeleted: val,
      noteIdList: idList
    }; //api call for deleting the notes
    this.service.deletingNote("/notes/trashNotes", body, token).subscribe(
      data => {

        this.eventEmit.emit({});
      },
      error => {

      }
    );
  }
  deleteForever() //for deleting the notes
  {
    var token = localStorage.getItem("token");

    var idList = [];
    idList.push(this.note.id);
    var body = {
      isDeleted: false,
      noteIdList: idList
    }; //api call for deleting the notes
    this.service
      .deletingNote("/notes/deleteForeverNotes", body, token)
      .subscribe(
        data => {

          this.eventEmit.emit({});
        },
        error => {

        }
      );
  }
  public labelList;
  public token = localStorage.getItem("token");

  /**
   * @function:getLabels()  for getting the note labels
   */
  getLabels() {
    this.service
      .getnotes("noteLabels/getNoteLabelList", this.token)
      .subscribe(response => {
        this.labelList = response["data"].details;
        if (this.noteLabels.length > 0) {
          for (var i = 0; i < this.labelList.length; i++) {
            for (var j = 0; j < this.noteLabels.length; j++) {
              if (this.labelList[i].id == this.noteLabels[j].id) {
                this.labelList[i].isChecked = true;
              }
            }
          }
        }


      });
  }

  /**
   * @function:addDeleteLabel() for adding & deleteing the note labels
   */
  addDeleteLabel(labelObj) {

    this.labelEvent.emit(labelObj);
    if (this.note != null && labelObj.isChecked == true) {



      this.service
        .post(
          "/notes/" +
            this.note["id"] +
            "/addLabelToNotes/" +
            labelObj.id +
            "/add",
          null,
          this.token
        )
        .subscribe(
          Response => {

            this.eventEmit.emit({});
          },
          error => {
            }
        );
    }
    if (this.note != null && labelObj.isChecked == false) {

      this.service
        .post(
          "/notes/" +
            this.note["id"] +
            "/addLabelToNotes/" +
            labelObj.id +
            "/remove",
          null,
          this.token
        )
        .subscribe(
          Response => {

            this.eventEmit.emit({});
          },
          error => {

          }
        );
    }
  }
}
