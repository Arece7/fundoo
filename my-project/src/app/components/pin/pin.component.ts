import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { NoteService } from "../../core/services/noteService/note.service";
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})

export class PinComponent implements OnInit {
  @Output() eventEmit=new EventEmitter();
  @Input() note;
    @Input() Pin;
  public isDeleted=false;
  public isPinned=false;

  public body: any = {}

  constructor(private service: NoteService,private snackBar:MatSnackBar ) { }

  ngOnInit() {

 if (this.note != undefined && this.note.isDeleted == true ) {
      this.isDeleted = true;
    }
    if (this.note != undefined && this.note.isPined == true) {
      this.isPinned = true;
   }
  }

  pin(flag) {
    this.eventEmit.emit({});


    if (this.note != undefined) {



      var array = []
      array.push(this.note.id)

      this.service.pinUnpin( this.body = {
        "isPined": flag,
        "noteIdList": array

      }).subscribe((response) => {


        this.eventEmit.emit({});

        if (flag == true) {
          this.snackBar.open("Pinned", "ok", {
            duration: 2000,
          });
        }
        else {
          this.snackBar.open("UnPinned", "ok", {
            duration: 2000,
          });
        }
      },
        (error) => {


        })
    }
  }



}








