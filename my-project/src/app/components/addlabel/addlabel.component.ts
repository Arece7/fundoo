import { EventEmitter } from '@angular/core';
/** Purpose         : For more components
 *  @description
 *  @file           : addlabel.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit,Output } from "@angular/core";
import { MatDialog } from "@angular/material";
import { CreatelabelComponent } from "../createlabel/createlabel.component";
import { Router } from "@angular/router";
import { HttpService } from '../../core/services/httpService/http.service';
@Component({
  selector: "app-addlabel",
  templateUrl: "./addlabel.component.html",
  styleUrls: ["./addlabel.component.scss"]
})
export class AddlabelComponent implements OnInit {
  public labelList;

  @Output() labelname=new EventEmitter();

  constructor(
    private _Service: HttpService,
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
      .httpGetData("/noteLabels/getNoteLabelList")
      .subscribe(
        response => {
          this.labelList = response["data"].details;

        },
        error => {
         throw error;
        }
      );
  }
  labelClick(data) {
    var labelName = data.label;
    this.router.navigate(["label/" + labelName]);
    this.labelname.emit(labelName)
  }

}
