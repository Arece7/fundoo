import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NavbarComponent } from '../navbar/navbar.component';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-createlabel',
  templateUrl: './createlabel.component.html',
  styleUrls: ['./createlabel.component.css']
})
export class CreatelabelComponent implements OnInit {
  @ViewChild('labelName') labelName: ElementRef;
  @ViewChild('updateName') updateName: ElementRef;
  @ViewChild('editDiv') editDiv: ElementRef;

  constructor( public dialogRef : MatDialogRef<NavbarComponent>, private Service : UserService ) { }
  public token=localStorage.getItem('token' );
  public id=localStorage.getItem('uId');
  public labelList;

  ngOnInit() {
    this.show();
  }

  add(){
   this.addbox();
    this.dialogRef.close();
  }
  done()
  {
    this.dialogRef.close();
  }
  addbox(){
    var label=this.labelName.nativeElement.innerHTML;

    if(label==""){

      return false;
    }

    this.Service.post("/noteLabels",
    {
      "label": label,
      "isDeleted": false,
      "userId":this.id
    },this.token)
    .subscribe((response) =>{
      this.show();
      this.labelName.nativeElement.innerHTML=null;
      console.log(response);
    },(error) => {
      console.log("failed");
      console.log(error);
    });


  }
  show(){
    this.Service.getnotes("/noteLabels/getNoteLabelList",this.token)
    .subscribe((response) =>{
      this.labelList=response["data"].details;
      console.log(this.labelList)
    },(error) => {
      console.log("failed");
      console.log(error);
    });
  }
  clear()
  {
    document.getElementById("labelName").innerHTML=null;
  }
  delete(labelId){
    this.Service.delete("/noteLabels/"+labelId+"/deleteNoteLabel")
    .subscribe((response) =>{
     console.log(response);
     this.show();
    },(error) => {
      console.log(error);
    });
  }

  update(labelId){
    var label1=this.updateName.nativeElement.innerHTML;
    console.log(label1);
    this.Service.post("/noteLabels/"+labelId+"/updateNoteLabel",
    {
      "label":label1
    },this.token)
    .subscribe((response) =>{
      this.show();
      console.log(response);
    },(error) => {
      console.log(error);
    });
  }


public editClick;
public editId;
public editLabel;
public editDoneIcon;
public editable;


edit(label){
  this.editClick=true;
  this.editId=label.id;
  this.editLabel=label.label;
  this.editDoneIcon=false;
  this.editable=true;
  console.log(this.editClick)

}
editparticular(label){
  this.editDoneIcon = true;
  this.editClick=false;
  this.editable=false;
   var url = "noteLabels/" + label.id +"/updateNoteLabel"
   console.log("edit")
  this.Service.colorChange(url,{
    "label": this.editDiv.nativeElement.innerHTML ,
    "isDeleted": false,
    "id":label.id,
    "userId":localStorage.getItem('userId')
  },localStorage.getItem('token')).subscribe(response=>{
    console.log(response)

    this.show();
  },error=>{
    console.log(error)
  })
}
}
