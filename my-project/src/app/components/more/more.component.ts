

/** Purpose         : For more components
 *  @description
 *  @file           : more.component.ts
 *  @author         : Arghya Ray
*/

import { Component, OnInit,Input,EventEmitter, Output} from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material';

import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {


  @Input() note;
  @Output() eventEmit=new EventEmitter();
  @Output() labelEvent= new EventEmitter();    //creating instance of event emitter
  constructor(private service:UserService,public snackbar:MatSnackBar,public dialog:MatDialog) { }
  public noteLabels=[];
  public searchLabel;

  ngOnInit() {

    if(this.note!=undefined && this.note['noteLabels']!=undefined ){

      for (var i = 0; i < this.note['noteLabels'].length; i++) {
        this.noteLabels.push(this.note['noteLabels'][i])
      }



    }
      this.getLabels();


  }
deleteNotes()                //for deleting the notes
{

  var token=localStorage.getItem('token')

  var idList=[];
  idList.push(this.note.id);
  var body=
  {
    "isDeleted":true,
    "noteIdList":idList
  };                                 //api call for deleting the notes
this.service.deletingNote('/notes/trashNotes',body,token).subscribe(
  data=>{
console.log("succes");
this.snackbar.open("Note", "Deleted", {
  duration: 2000,
});
this.eventEmit.emit({})
  },
  error=>{
    this.snackbar.open("Note", "not deleted,Try again", {
      duration: 2000,
    });
console.log("error");

  }
)


}
public labelList;
public token=localStorage.getItem("token")

/**
 * @function:getLabels()  for getting the note labels
 */
getLabels() {

  this.service.getnotes("noteLabels/getNoteLabelList", this.token).subscribe(
    response => {
      this.labelList = response['data'].details;
      if(this.noteLabels.length>0){
      for (var i = 0; i < this.labelList.length; i++) {
        for (var j = 0; j < this.noteLabels.length; j++) {
          if (this.labelList[i].id == this.noteLabels[j].id) {
            this.labelList[i].isChecked = true;
          }
        }
      }
    }
    console.log(this.labelList)
    // this.eventEmit.emit(this.labelList.id);
    })

}

/**
 * @function:addDeleteLabel() for adding & deleteing the note labels
 */
   addDeleteLabel(labelObj) {
     console.log("selected label is", labelObj.isChecked);
     this.labelEvent.emit(labelObj)
     if (this.note != null && labelObj.isChecked==true){
       console.log("add function");

       console.log(labelObj.id)
       this.service.post("/notes/" + this.note['id'] + "/addLabelToNotes/" + labelObj.id + "/add", null, this.token)
         .subscribe(Response => {
           console.log(Response);
           this.eventEmit.emit({})
         }, error => {
           console.log(error)
         })
       }
     if (this.note != null && labelObj.isChecked==false){
       console.log("remove funtion");

       this.service.post("/notes/" + this.note['id'] + "/addLabelToNotes/" + labelObj.id + "/remove", null, this.token)
         .subscribe(Response => {
           console.log(Response);
           this.eventEmit.emit({})
         }, error => {
           console.log(error)
         })
     }
    }












}
