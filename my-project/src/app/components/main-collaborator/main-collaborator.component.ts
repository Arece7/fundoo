import { Component, OnInit,Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-main-collaborator',
  templateUrl: './main-collaborator.component.html',
  styleUrls: ['./main-collaborator.component.scss']
})
export class MainCollaboratorComponent implements OnInit {

  @Input() note;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public  dialogRef: MatDialogRef<MainCollaboratorComponent>) { }

  ngOnInit() {

  }
   image=localStorage.getItem('imageUrl');
  img=environment.apiurl+this.image;
  email=localStorage.getItem('email');
  firstName=localStorage.getItem('fName');
  lastName=localStorage.getItem('lName');
}
