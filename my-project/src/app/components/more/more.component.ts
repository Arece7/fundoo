import { log } from 'util';
import { Component, OnInit,Input,EventEmitter, Output} from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
  @Input() note:any;
  @Output() eventEmit=new EventEmitter();
  constructor(private service:UserService) { }

  ngOnInit() {

  }
deleteNotes()
{
  var token=localStorage.getItem('token')

  var idList=[];
  idList.push(this.note.id);
  var body=
  {
    "isDeleted":true,
    "noteIdList":idList
  };
this.service.deletingNote('/notes/trashNotes',body,token).subscribe(
  data=>{
console.log("succes");
this.eventEmit.emit({})
  },
  error=>{
console.log("error");

  }
)


}
}
