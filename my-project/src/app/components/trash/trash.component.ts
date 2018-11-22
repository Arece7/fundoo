/** Purpose         : For update Notes
 *  @description
 *  @file           : trash.component.ts
 *  @author         : Arghya Ray
 */
import { Component, OnInit } from "@angular/core";
import { NoteService } from "../../core/services/noteService/note.service";
import {Note} from '../../core/Model/note'
@Component({
  selector: "app-trash",
  templateUrl: "./trash.component.html",
  styleUrls: ["./trash.component.scss"]
})
export class TrashComponent implements OnInit {
  public notes = [];
  constructor(private service: NoteService) {}

  ngOnInit() {
    this.getNotes();
  }
/**@function:getNotes() for getting the notes in trash */
  getNotes()
  {


    this.service.getTrash().subscribe(
      data => {
        this.notes = [];
        var notesData: Note[]=data["data"].data;
        for (var i = notesData.length - 1; i >= 0; i--) {
          if(notesData[i].isDeleted==true)
          this.notes.push(notesData[i]);
        }

      },
      error => {

      }
    );
  }
  /** @function:eventLabel() for catching the events */
  eventLabel(event) {
    this.getNotes();
  }
}
