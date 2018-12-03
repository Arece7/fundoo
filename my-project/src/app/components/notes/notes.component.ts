/** Purpose         : For Notes
 *  @description
 *  @file           : notes.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit } from "@angular/core";
import { NoteService } from  '../../core/services/noteService/note.service';
import {Note} from '../../core/Model/note'
@Component({
  selector: "app-notes",
  templateUrl: "./notes.component.html",
  styleUrls: ["./notes.component.scss"]
})
export class NotesComponent implements OnInit {
  constructor(private service: NoteService) {}
  public notes = [];
  public pin=[];
  public loader:boolean=false;

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
    //api call for getting note list

    this.service.getnotes().subscribe(
      data => {
        this.notes = [];
        var notesData: Note[]=data["data"].data;
        for (var i = notesData.length - 1; i >= 0; i--) {
          if (
            //checking the flags
            notesData[i].isDeleted == false &&
            notesData[i].isArchived == false &&
            notesData[i].isPined == false
          ) {
            this.notes.push(data["data"].data[i]);
            this.loader=true;                        //pusing in note array
          }
        }

      },
      error => {

      }
    );
  }
  pinNotes() //for getting the data of the notes
  {


    //api call for getting note list

    this.service.getnotes().subscribe(
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
