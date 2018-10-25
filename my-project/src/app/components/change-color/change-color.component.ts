import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.css']
})
export class ChangeColorComponent implements OnInit {

  @Input() note
  @Output() eventEmit=new EventEmitter();
  constructor(private service: UserService) { }

  ngOnInit() {
  }

  setcolor(str) {
    var idlist = []
    idlist.push(this.note.id);
    var token=localStorage.getItem('token')
    var body = {
      "color": str,
      "noteIdList": idlist

    }


    this.service.colorChange('/notes/changesColorNotes', body,token).subscribe(

      data => {
        console.log(data);
        this.eventEmit.emit({});

      },
      error => {
        console.log('error happened');

      }
    )

  }


}
