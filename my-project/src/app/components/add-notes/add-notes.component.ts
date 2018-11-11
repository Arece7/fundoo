/** Purpose         : For Add Notes
 *  @description
 *  @file           : add.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserService } from "../../core/services/user.service";
import { MatSnackBar } from "@angular/material";
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
public status="open"
  @Output()
  onNewEntryAdded = new EventEmitter(); //creating an instance

  constructor(private service: UserService, public snackbar: MatSnackBar) {}

  ngOnInit() {
    this.labelId = [];
    this.labelName = [];
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
      labelIdList: JSON.stringify(this.labelId)
    };
  }
  else{
    console.log("else part");
    
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
console.log(this.dataArrayApi);

    this.body={
     "title": title,
     "checklist":JSON.stringify(this.dataArrayApi),
     "isPined": this.isPinned,
     "color": this.cardColor,
     "isArchived":this.archive,
     "labelIdList": JSON.stringify(this.labelId)
    }
}
    var token = localStorage.getItem("token");

    if (title == "" && description == "") {
      this.labelId = [];
      this.labelName = [];
      return;
    } //api call for add notes
    if (title != ""){
    this.service.addingNote("/notes/addNotes", this.body, token).subscribe(
      data => {
        this.labelId = [];
        this.labelName = [];
        this.cardColor = "#FFFFFF";
        this.dataArray=[];
        this.dataArrayApi=[];
        this.adding=false;
        this.snackbar.open("Note", "Added", {
          duration: 2000
        });
        this.onNewEntryAdded.emit({});
      },
      error => {
        this.labelId = [];
        this.labelName = [];
        this.cardColor = "#FFFFFF";
        this.dataArray=[];
        this.dataArrayApi=[];
        this.adding = false
        this.snackbar.open("Note", "not added", {
          duration: 2000
        });
      }
    );
  }
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
    this.note1 = !this.note1;
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
    console.log(event,"keydown");
    var obj={
      "index":this.i,
      "data":this.data,
      "isChecked":this.isChecked
    }
    this.dataArray.push(obj)
    console.log(this.dataArray);
    this.data=null;
    this.adding=false;
    this.isChecked=false;
      this.addCheck = false;
     }
  }
  onDelete(deletedObj){
    console.log("onDelete function");
       for(var i=0;i<this.dataArray.length;i++){
          if(deletedObj.index==this.dataArray[i].index){
            this.dataArray.splice(i,1);
            break;
       }
        
      }
    console.log(this.dataArray)
  }
}
