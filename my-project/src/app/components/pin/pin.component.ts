import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { UserService } from "../../core/services/user.service";
@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.css']
})

export class PinComponent implements OnInit {
  @Output() eventEmit=new EventEmitter();
  @Input() note;
  public isDeleted=false;
  public isPinned=false;
  public apiPinned=true;
  constructor(private service: UserService) { }

  ngOnInit() {
    if (this.note != undefined && this.note.isDeleted == true ) {
      this.isDeleted = true;
    }
    if (this.note != undefined && this.note.isPined == true) {
      this.isPinned = true;

    }
  }
  pin(){
    this.eventEmit.emit({});
    if(this.note!==undefined){


      if (this.note.isPined == true){
        this.apiPinned = false;
      }
      var arr = []
      arr.push(this.note.id)
      console.log(arr);
      if (this.note.id != undefined) {
        this.service.post("notes/pinUnpinnotes",
          {
            "isPined":this.apiPinned ,
            "noteIdList": arr

          }, localStorage.getItem("token"))
          .subscribe(response => {
            console.log(response);
            this.eventEmit.emit({})
          }, error => {
            console.log(error)
          })
      }
    }
  }

}
