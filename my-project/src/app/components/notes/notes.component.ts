/** Purpose         : For Notes
 *  @description
 *  @file           : notes.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"]
})
export class NotesComponent implements OnInit {
  constructor(private service: UserService) {}
  public notes = [];
  public pin=[]

  ngOnInit() {
    this.getNotes();
    this.pinNotes();
  }
  addNewEntry(event) {

    if (event) {
      this.getNotes();
      this.pinNotes();
    }
  }

  getNotes() //for getting the data of the notes
  {
    var token = window.localStorage.getItem("token");

    //api call for getting note list

    this.service.getnotes("/notes/getNotesList", token).subscribe(
      data => {
        this.notes = [];
        for (var i = data["data"].data.length - 1; i >= 0; i--) {
          if (
            //checking the flags
            data["data"].data[i].isDeleted == false &&
            data["data"].data[i].isArchived == false &&
            data["data"].data[i].isPined == false
          ) {
            this.notes.push(data["data"].data[i]); //pusing in note array
          }
        }

      },
      error => {

      }
    );
  }
  pinNotes() //for getting the data of the notes
  {
    var token = window.localStorage.getItem("token");

    //api call for getting note list

    this.service.getnotes("/notes/getNotesList", token).subscribe(
      data => {
        this.pin = [];
        for (var i = data["data"].data.length - 1; i >= 0; i--) {
          if (
            //checking the flags
            data["data"].data[i].isDeleted == false &&
            data["data"].data[i].isArchived == false &&
            data["data"].data[i].isPined == true
          ) {
            this.pin.push(data["data"].data[i]); //pusing in note array
          }
        }

      },
      error => {

      }
    );
  }



  change(event) {
    this.getNotes();
    this.pinNotes(); // event for catching the changes
  }
  eventLabel(event) {

    this.getNotes();
    this.pinNotes();
  }
}
