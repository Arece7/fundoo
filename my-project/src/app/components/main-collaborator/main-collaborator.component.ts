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
   colList=[];
  image=localStorage.getItem('imageUrl');
  img=environment.apiurl+this.image;
  email=localStorage.getItem('email');
  firstName=localStorage.getItem('fName');
  lastName=localStorage.getItem('lName');
  userId=localStorage.getItem('userId');
  public search:String;
  public userlist=[];
  listCollaborator=[];
  // public collabArray=[]
  ngOnInit() {
    if(this.data.collaborators!=null)
    for(var i=0;i<this.data.collaborators.length;i++){
      this.colList.push(this.data.collaborators[i]);}
  }
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
  addToColaborator(data){
    this.listCollaborator.push(data);
    this.search = '';
 }

 addCollaboratorList(user){
  this.listCollaborator.splice(this.listCollaborator.indexOf(user),1)
  this.colList.push(user);
  this.data.collaborators.push(user)
  this.noteservice.addCollab(this.data,user).subscribe(
    data=>{
      console.log('add sucessfull');

    },
    error=>{
      console.log('add failed');
    })
 }

 removeCollaborator(user){
  this.data.collaborators.splice(this.data.collaborators.indexOf(user),1);
  this.colList.splice(this.colList.indexOf(user),1);
  this.noteservice.deleteCollab(this.data,user).subscribe(
    data=>{
      console.log('sucess in delete');
    },
    error=>{
      console.log('failed to delete');
    })
 }

  close()
  {
    this.dialogRef.close();
  }

}
