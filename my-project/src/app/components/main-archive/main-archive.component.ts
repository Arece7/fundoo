/** Purpose         : For Add Notes
 *  @description
 *  @file           : main-archive.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: "app-main-archive",
  templateUrl: "./main-archive.component.html",
  styleUrls: ["./main-archive.component.css"]
})
export class MainArchiveComponent implements OnInit {
  constructor(private service: UserService) {}
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
    var token = localStorage.getItem("token");

    this.service.getnotes("/notes/getArchiveNotesList", token).subscribe(
      data => {
        this.notes = [];
        for (var i = data["data"].data.length - 1; i >= 0; i--) {
          if (data["data"].data[i].isDeleted == false)
            this.notes.push(data["data"].data[i]);
        }

      },
      error => {

      }
    );
  }
}
