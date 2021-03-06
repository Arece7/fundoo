import { Component, OnInit } from "@angular/core";
import { DataService } from "../../core/services/data.service";
import { NoteService } from "../../core/services/noteService/note.service";

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
  styleUrls: ["./search-bar.component.scss"]
})
export class SearchBarComponent implements OnInit {
  constructor(private data: DataService, private service: NoteService) {}
  searchInput: string;
  ngOnInit() {
    this.data.currentMessage.subscribe(message => {
      this.searchInput = message;

    });
    this.getNotes();
  }
  public notes = [];
  getNotes() //for getting the data of the notes
  {


    //api call for getting note list

    this.service.getnotes().subscribe(
      data => {
        this.notes = [];
        for (var i = data["data"].data.length - 1; i >= 0; i--) {
          if (
            data["data"].data[i].isDeleted == false &&
            data["data"].data[i].isArchived == false
          ) {
            //checking the flags
            this.notes.push(data["data"].data[i]); //pusing in note array
          }
        }

      },
      error => {

      }
    );
  }
  addNewEntry(event) {

    if (event) {
      this.getNotes();
    }
  }
  change(event) {
    this.getNotes(); // event for catching the changes
  }
  eventLabel(event) {

    this.getNotes();
  }
}
