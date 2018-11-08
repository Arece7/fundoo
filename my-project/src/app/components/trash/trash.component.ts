/** Purpose         : For update Notes
 *  @description
 *  @file           : trash.component.ts
 *  @author         : Arghya Ray
 */
import { Component, OnInit } from "@angular/core";
import { UserService } from "../../core/services/user.service";
@Component({
  selector: "app-trash",
  templateUrl: "./trash.component.html",
  styleUrls: ["./trash.component.css"]
})
export class TrashComponent implements OnInit {
  public notes = [];
  constructor(private service: UserService) {}

  ngOnInit() {
    this.getNotes();
  }
/**@function:getNotes() for getting the notes in trash */
  getNotes()
  {
    var token = localStorage.getItem("token");

    this.service.getnotes("/notes/getTrashNotesList", token).subscribe(
      data => {
        this.notes = [];
        for (var i = data["data"].data.length - 1; i >= 0; i--) {
          this.notes.push(data["data"].data[i]);
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
