import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { NavbarComponent } from "../navbar/navbar.component";
import { NoteService } from '../../core/services/noteService/note.service'

@Component({
  selector: "app-createlabel",
  templateUrl: "./createlabel.component.html",
  styleUrls: ["./createlabel.component.scss"]
})
export class CreatelabelComponent implements OnInit {
  @ViewChild("labelName")
  labelName: ElementRef;
  @ViewChild("updateName")
  updateName: ElementRef;
  @ViewChild("editDiv")
  editDiv: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<NavbarComponent>,
    private Service: NoteService
  ) {}

  public id = localStorage.getItem("uId");
  public labelList;

  ngOnInit() {
    this.show();
  }

  add() {
    this.addbox();
    this.dialogRef.close();
  }
  done() {
    this.dialogRef.close();
  }
  addbox() {
    var label = this.labelName.nativeElement.innerHTML;

    if (label == "") {
      return false;
    }

    this.Service.createLabel(

      {
        label: label,
        isDeleted: false,
        userId: this.id
      }

    ).subscribe(
      response => {
        this.show();
        this.labelName.nativeElement.innerHTML = null;

      },
      error => {

      }
    );
  }
  show() {
    this.Service.getLabel().subscribe(
      response => {
        this.labelList = response["data"].details;

      },
      error => {

      }
    );
  }
  clear() {
    this.labelName.nativeElement.innerHTML = null;
  }
  delete(labelId) {
    this.Service.deleteLabel(labelId ).subscribe(
      response => {

        this.show();
      },
      error => {

      }
    );
  }

  update(labelId) {
    var label1 = this.updateName.nativeElement.innerHTML;

    this.Service.updateLabel(
      labelId ,
      {
        label: label1
      }

    ).subscribe(
      response => {
        this.show();

      },
      error => {

      }
    );
  }

  public editClick;
  public editId;
  public editLabel;
  public editDoneIcon;
  public editable;

  edit(label) {
    this.editClick = true;
    this.editId = label.id;
    this.editLabel = label.label;
    this.editDoneIcon = false;
    this.editable = true;
  }
  editparticular(label) {
    this.editDoneIcon = true;
    this.editClick = false;
    this.editable = false;


    this.Service.updateLabel(
      label.id,
      {
        label: this.editDiv.nativeElement.innerHTML,
        isDeleted: false,
        id: label.id,
        userId: localStorage.getItem("userId")
      },

    ).subscribe(
      response => {


        this.show();
      },
      error => {

      }
    );
  }
}
