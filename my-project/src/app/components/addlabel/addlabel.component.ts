/** Purpose         : For more components
 *  @description
 *  @file           : addlabel.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CreatelabelComponent } from "../createlabel/createlabel.component";
import { UserService } from "../../core/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-addlabel",
  templateUrl: "./addlabel.component.html",
  styleUrls: ["./addlabel.component.scss"]
})
export class AddlabelComponent implements OnInit {
  public labelList;
  public token = localStorage.getItem("token");

  constructor(
    private _Service: UserService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.show();
  }

  ngOnInit() {}
  /**
   * @function:createLabel() for dialog open
   */
  createLabel(): void {
    const dialogRef = this.dialog.open(CreatelabelComponent, {
      width: "300px"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.show();
    });
  }
  show() {
    this._Service
      .getnotes("/noteLabels/getNoteLabelList", this.token)
      .subscribe(
        response => {
          this.labelList = response["data"].details;

        },
        error => {

        }
      );
  }
  labelClick(data) {
    var labelName = data.label;
    this.router.navigate(["label/" + labelName]);
  }
}
