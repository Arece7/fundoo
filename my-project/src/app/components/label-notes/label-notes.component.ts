
/** Purpose         : For update Notes
 *  @description
 *  @file           : label-notes.component.ts
 *  @author         : Arghya Ray
 */
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { UserService } from "../../core/services/user.service";

@Component({
  selector: "app-label-notes",
  templateUrl: "./label-notes.component.html",
  styleUrls: ["./label-notes.component.css"]
})
export class LabelNotesComponent implements OnInit {
  constructor(public route: ActivatedRoute, private service: UserService) {}

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
    var url = "notes/getNotesListByLabel/" + labelName;
    this.service.post(url, null, localStorage.getItem("token")).subscribe(
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
