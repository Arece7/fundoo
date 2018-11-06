/** Purpose         : For Add Notes
 *  @description
 *  @file           : add.component.ts
 *  @author         : Arghya Ray
*/

import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']

})
export class AddNotesComponent implements OnInit {
  public note1:boolean=true;
  public archive=false;
  public cardColor='#FFFFFF';
  @Output() onNewEntryAdded = new EventEmitter(); //creating an instance

  constructor(private service:UserService,public snackbar:MatSnackBar) { }

  ngOnInit() {
   this.labelId=[]
   this.labelName=[]
  }
  postValue()                //for posting the data of Notes
  {
    var title=document.getElementById("title").innerHTML;
    var description=document.getElementById("description").innerHTML;

          var body={
            'title':title,
            'description':description,
            'isArchived':this.archive,
            "color": this.cardColor,
            "labelIdList":JSON.stringify(this.labelId)
          }
          console.log(body)

var token=localStorage.getItem('token')

     if(title=="" && description=="" )    {
      this.labelId=[]
      this.labelName=[]
       return;
     }                      //api call for add notes

    this.service.addingNote('/notes/addNotes',body,token).subscribe(

          data=>{
            this.labelId=[]
           this.labelName=[]
            this.cardColor="#FFFFFF";
              console.log('post sucessfull');
              this.snackbar.open("Note", "Added", {
                duration: 2000,
              });
              this.onNewEntryAdded.emit
              ({

                  })
          },
          error=>{
            this.labelId=[]
           this.labelName=[]
            this.cardColor="#FFFFFF";
            this.snackbar.open("Note", "not added", {
              duration: 2000,
            });
            console.log('error happened');

          }
    )

  }
  eventOccured(event){
    if(event){

      console.log("in")
      if(event){
        this.archive=true;
        this.postValue();
      }

    }
  }
  eventOccuredcolor(event){
    console.log(event);
    this.cardColor=event;
  }
  public labelId=[]
  public labelName=[]
  eventlabel(event)
  {
  this.labelId.push(event.id);
  if(this.labelName.indexOf(event)<0)
  this.labelName.push(event);

  else{

    this.labelName.splice(this.labelName.indexOf(event,1));
    this.labelId.splice(this.labelId.indexOf(event,1));

  }
  }
  delete()
  {
    this.labelName.splice(this.labelName.indexOf(event,1));
    this.labelId.splice(this.labelId.indexOf(event,1));
  }
}
