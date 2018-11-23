import { NoteService } from './../../core/services/noteService/note.service';
import { Component, OnInit,Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { environment } from '../../../environments/environment';
import { ClientService } from '../../core/services/userService/client.service';

@Component({
  selector: 'app-main-collaborator',
  templateUrl: './main-collaborator.component.html',
  styleUrls: ['./main-collaborator.component.scss']
})
export class MainCollaboratorComponent implements OnInit {

  @Input() note;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,public  dialogRef: MatDialogRef<MainCollaboratorComponent>,
  private _Service: ClientService,private noteservice:NoteService) { }

  ngOnInit() {

  }
  image=localStorage.getItem('imageUrl');
  img=environment.apiurl+this.image;
  email=localStorage.getItem('email');
  firstName=localStorage.getItem('fName');
  lastName=localStorage.getItem('lName');
  userId=localStorage.getItem('userId');
  public search:String;
  public userlist=[];
  public collabArray=[]
  Collabname()
  {
      if(this.search!=null && this.search!=undefined && this.search!="")
      {
      var body={
        "searchWord":this.search
      }
      this._Service.searchUser(body).subscribe(data=>{

        this.userlist=data['data'].details;
      },
      error=>{

      })
    }
  }

  // addCollab(search){

  //   var body={
  //     "firstName":search.firstName,
  //     "lastName":search.lastName,
  //     "email":search.email,
  //     "userId":search.userId
  //   }
  //   this.noteservice.addCollab(this.data,body).subscribe(data=>{
  //   console.log("success");

  //     this.collabArray=data['data'].details;
  //   },
  //   error=>{

  //    })
  // }

  close()
  {
    this.dialogRef.close();
  }

}
