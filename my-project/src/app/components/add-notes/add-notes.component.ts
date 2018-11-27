
/** Purpose         : For Add Notes
 *  @description
 *  @file           : add.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {userList} from '../../core/Model/note'
import { NoteService } from '../../core/services/noteService/note.service';
import { MatSnackBar } from "@angular/material";
import { ClientService } from '../../core/services/userService/client.service';
import { environment } from './../../../environments/environment';
@Component({
  selector: "app-add-notes",
  templateUrl: "./add-notes.component.html",
  styleUrls: ["./add-notes.component.scss"]
})
export class AddNotesComponent implements OnInit {
  public note1: boolean = true;
  public check:boolean=false;
  public archive = false;
  public cardColor = "#FFFFFF";
  public body:any={};
  public checkList=[];
public dataArray=[];
public dataArrayApi=[];
public isChecked=false;
public nameList=[];
public listCollaborator=[];
public colList=[];

public collaboratorList=[];
public col:boolean=false;
public img:string;
public name:string;
public nameInput:string;
public mail:string;
public status="open";
public tempTitle:string;
public tempDescription:string;
  @Output()
  onNewEntryAdded = new EventEmitter(); //creating an instance

  constructor(private service: NoteService,private _Service: ClientService, public snackbar: MatSnackBar) {}

  ngOnInit() {
    localStorage.getItem('userid');
    this.img= environment.apiurl+localStorage.getItem('imageUrl');
    this.name=localStorage.getItem('fName')+' '+ localStorage.getItem('lName')+'(Owner)';
    this.mail=localStorage.getItem('email')
    this.labelId = [];
    this.labelName = [];
    this.cardColor = "#FFFFFF";
        this.dataArray=[];
        this.dataArrayApi=[];
        this.collaboratorList=[];
        this.adding = false;
        this.reminder=null;
  }
  public isPinned=false;
  postValue()      //for posting the data of Notes
  {
    var title = document.getElementById("title").innerHTML;
    if(this.check==false){
    var description = document.getElementById("description").innerHTML;

    this.body = {
      title: title,
      description: description,
      isPined:this.isPinned,
      isArchived: this.archive,
      color: this.cardColor,
      labelIdList: JSON.stringify(this.labelId),
      reminder:this.reminder,
      collaberators:JSON.stringify(this.collaboratorList)
    };
  }
  else{


for(var i=0;i<this.dataArray.length;i++){
if(this.dataArray[i].isChecked==true){
this.status="close"
}
var apiObj={
 "itemName":this.dataArray[i].data,
 "status":this.status
}
this.dataArrayApi.push(apiObj)
this.status="open"
}


    this.body={
     "title": title,
     "checklist":JSON.stringify(this.dataArrayApi),
     "isPined": this.isPinned,
     "color": this.cardColor,
     "isArchived":this.archive,
     "labelIdList": JSON.stringify(this.labelId),
     "reminder":this.reminder,
     "collaberators":JSON.stringify(this.collaboratorList)
    }
}


    if (title == "" && description == "") {
      this.labelId = [];
      this.labelName = [];
      this.reminder=null;
      return;
    } //api call for add notes
    if (title != ""){
    this.service.addnote(this.body).subscribe(
      data => {
        this.collaboratorList=[];
        this.labelId = [];
        this.labelName = [];
        this.cardColor = "#FFFFFF";
        this.dataArray=[];
        this.dataArrayApi=[];
        this.reminder=null;
        this.tempTitle=null;
        this.tempDescription=null;
        this.adding=false;
        this.snackbar.open("Note", "Added", {
          duration: 2000
        });
        this.onNewEntryAdded.emit({});
      },
      error => {

        this.collaboratorList=[];
        this.labelId = [];
        this.reminder=null;
        this.labelName = [];
        this.cardColor = "#FFFFFF";
        this.dataArray=[];
        this.dataArrayApi=[];
        this.tempTitle=null;
        this.tempDescription=null;
        this.adding = false
        this.snackbar.open("Note", "not added", {
          duration: 2000
        });
        throw error;
      }
    );
  }
  }
  public reminder
  reminderEvent(event)
  {
this.reminder=event;
  }
  removeRemainder()
  {
    this.reminder=null;
  }
  eventOccured(event) {
    if (event) {
      if (event) {
        this.archive = true;
        this.postValue();
      }
    }
  }
  eventOccuredcolor(event) {
    this.cardColor = event;
  }
  eventpin(event)
  {
    this.isPinned=true;
  }
  public labelId = [];
  public labelName = [];
  eventlabel(event) {
    this.labelId.push(event.id);
    if (this.labelName.indexOf(event) < 0) this.labelName.push(event);
    else {
      this.labelName.splice(this.labelName.indexOf(event, 1));
      this.labelId.splice(this.labelId.indexOf(event, 1));
    }
  }
  delete() {
    this.labelName.splice(this.labelName.indexOf(event, 1));
    this.labelId.splice(this.labelId.indexOf(event, 1));
  }


  noteOpen()
  {
    this.data=null;
    this.note1 = !this.note1;
    this.labelId = [];
    this.labelName = [];
    this.cardColor = "#FFFFFF";
        this.dataArray=[];
        this.dataArrayApi=[];
        this.adding = false
        this.collaboratorList=[];
        this.colList=[];
  }
  public data;
  public i=0;
  public adding=false;
  public addCheck=false;
  onEnter(event){
    if (this.data != "") {
      this.adding = true;
    }
    else {
      this.adding = false;
    }
   this.i++;
   this.isChecked=this.addCheck
    if (this.data != null && event.code == "Enter"){

    var obj={
      "index":this.i,
      "data":this.data,
      "isChecked":this.isChecked
    }
    this.dataArray.push(obj)

    this.data=null;
    this.adding=false;
    this.isChecked=false;
      this.addCheck = false;
     }
  }
  onDelete(deletedObj){

       for(var i=0;i<this.dataArray.length;i++){
          if(deletedObj.index==this.dataArray[i].index){
            this.dataArray.splice(i,1);
            break;
       }

      }

  }
  getName(event){
    if(this.nameInput!=null && this.nameInput!=undefined && this.nameInput.length!=0){
      var reqBody={
        "searchWord":this.nameInput
      }
      this._Service.searchUser(reqBody).subscribe(
        data=>{
          let arr:userList[]=data["data"].details
         this.nameList=arr;
        },
        error=>{

          throw error;
        })
      }
  }
  addToColaborator(user){
    var name=user.email.split('')
      let letter=name[0].toUpperCase();
      let body={
        "letter":letter,
        "userobj":user
      }
    this.colList.push(body);
    this.nameInput=null;
  }

  removeCollaborator(data){
    this.colList.splice(this.colList.indexOf(data),1);
    this.collaboratorList.splice(this.collaboratorList.indexOf(data.userobj),1)
  }

  saveToList(){
  this.collaboratorList=[];
  for(var i=0;i<this.colList.length;i++){
    this.collaboratorList.push(this.colList[i].userobj)
  }
    this.col=false;
  }
  cancel(){
    this.col=false;
    this.colList=[];
  }

  addTitle(){
  this.tempTitle=document.getElementById("title").innerHTML;
  if(this.check==false)
  this.tempDescription=document.getElementById("description").innerHTML
  }


}
