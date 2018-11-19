import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { UserService } from "../../core/services/user.service";
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
  token = localStorage.getItem('token');
  public body: any = {}

  constructor(private service: UserService,private snackBar:MatSnackBar ) { }

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
    console.log(event);

    if (this.note != undefined) {


      console.log(this.note)
      var array = []
      array.push(this.note.id)

      this.service.post("/notes/pinUnpinNotes", this.body = {
        "isPined": flag,
        "noteIdList": array

      }, this.token).subscribe((response) => {


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








