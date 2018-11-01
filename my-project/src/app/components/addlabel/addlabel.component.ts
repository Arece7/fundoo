/** Purpose         : For more components
 *  @description
 *  @file           : addlabel.component.ts
 *  @author         : Arghya Ray
*/


import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { CreatelabelComponent } from '../createlabel/createlabel.component';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-addlabel',
  templateUrl: './addlabel.component.html',
  styleUrls: ['./addlabel.component.css']
})
export class AddlabelComponent implements OnInit {



  public labelList;
  public token=localStorage.getItem("token")

  constructor(
    private _Service:UserService,
    public dialog:MatDialog

  ) { this.show() }

  ngOnInit() {

  }
  /**
 * @function:createLabel() for dialog open
 */
  createLabel(): void {
    const dialogRef = this.dialog.open(CreatelabelComponent, {
      width: '300px'});

    dialogRef.afterClosed().subscribe(result => {
      this.show();
    });
  }
  show(){
    this._Service.getnotes("/noteLabels/getNoteLabelList",this.token)
    .subscribe((response) =>{
      this.labelList=response["data"].details;
      console.log(this.labelList)
    },(error) => {
      console.log("failed");
      console.log(error);
    });
  }

}

