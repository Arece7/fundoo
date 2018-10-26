import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  @Input() note:any;
  @Output() eventEmit=new EventEmitter();

  constructor(private service:UserService) { }

  ngOnInit() {
  }

  ArchiveNotes()
{
  var token=localStorage.getItem('token')

  var idList=[];
  idList.push(this.note.id);
  var body=
  {
    "isArchived":true,
    "noteIdList":idList
  };
this.service.deletingNote('/notes/archiveNotes',body,token).subscribe(
  data=>{
console.log("succes");
this.eventEmit.emit({});
  },
  error=>{
console.log("error");

  }
)


}
}
