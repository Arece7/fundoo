/** Purpose         : For Add Notes
 *  @description
 *  @file           : main-archive.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit } from "@angular/core";
import {Note} from '../../core/Model/note'
import { NoteService } from '../../core/services/noteService/note.service';
@Component({
  selector: "app-main-archive",
  templateUrl: "./main-archive.component.html",
  styleUrls: ["./main-archive.component.scss"]
})
export class MainArchiveComponent implements OnInit {
  constructor(private service: NoteService) {}
  public notes = [];
  ngOnInit() {
    this.getNotes();
  }
  addNewEntry(event) {
    this.getNotes();
  }
  eventLabel(event) {
    this.getNotes();
  }

  getNotes() //for getting the notes in archive
  {


    this.service.getarchive().subscribe(
      data => {
        this.notes = [];
        var notesData: Note[]=data["data"].data;
        for (var i = notesData.length - 1; i >= 0; i--) {
          if (notesData[i].isDeleted == false)
            this.notes.push(notesData[i]);
        }

      },
      error => {

      }
    );
  }
}
