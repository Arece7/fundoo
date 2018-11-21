
/** Purpose         : For update Notes
 *  @description
 *  @file           : label-notes.component.ts
 *  @author         : Arghya Ray
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { NoteService } from '../../core/services/noteService/note.service'

@Component({
  selector: "app-label-notes",
  templateUrl: "./label-notes.component.html",
  styleUrls: ["./label-notes.component.scss"]
})
export class LabelNotesComponent implements OnInit {
  constructor(public route: ActivatedRoute, private service: NoteService) {}

  public labelName;
  public labelNOtes = [];

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {

      this.labelName = params["labelName"];
      this.getLabelNOtes(this.labelName);
    });
  }
  /**@function:  getLabelNOtes() for getting note lists by label */
  getLabelNOtes(labelName) {

    this.service.getListByName( labelName).subscribe(
      response => {

        this.labelNOtes = response["data"].data;

      },
      error => {

      }
    );
  }
   /**@function:  eventLabel() for catching the changes */
  eventLabel(event) {
    this.getLabelNOtes(this.labelName);
  }
    /**@function: addNewEntry() for catching the changes */
  addNewEntry(event) {

    if (event) {
      this.getLabelNOtes(this.labelName);
    }
  }
   /**@function: change() for catching the changes */
  change(event) {
    this.getLabelNOtes(this.labelName); // event for catching the changes
  }


}
