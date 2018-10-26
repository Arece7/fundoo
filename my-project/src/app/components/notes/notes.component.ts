/** Purpose         : For Notes
 *  @description
 *  @file           : notes.component.ts
 *  @author         : Arghya Ray
*/

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private service:UserService) { }
 public notes=[];

  ngOnInit() {
    this.getNotes();
  }
  addNewEntry(event){
    console.log(event);
    if(event){
      this.getNotes();
    }
  }
  getNotes()              //for getting the data of the notes
  {
    var token=window.localStorage.getItem('token')

                             //api call for getting note list


    this.service.getnotes('/notes/getNotesList',token).subscribe(

      data=>{
        this.notes=[];
       for(var i=data["data"].data.length-1;i>=0;i--)
       {
         if(data["data"].data[i].isDeleted==false && data["data"].data[i].isArchived==false )
         {                                                   //checking the flags
          this.notes.push(data["data"].data[i])            //pusing in note array
         }

       }
       console.log(this.notes);

      },
      error=>{
       console.log(error);

      }

    )
  }
  change(event){
      this.getNotes();            // event for catching the changes
  }
}
