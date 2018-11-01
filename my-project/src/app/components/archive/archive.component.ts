import { Component, OnInit,Input,EventEmitter,Output } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  @Input() note:any;
  @Output() eventEmit=new EventEmitter();

  constructor(private service:UserService,public snackbar:MatSnackBar) { }

  ngOnInit() {
  }

  ArchiveNotes()
  {
    if(this.note ){
  var token=localStorage.getItem('token')

  var idList=[];
  idList.push(this.note.id);
  var body=
  {
    "isArchived":true,
    "noteIdList":idList
  };
  if(this.note!=undefined && this.note.noteLabels.length!=undefined){
    this.service.deletingNote('/notes/archiveNotes',body,token).subscribe(
      data=>{
    console.log("succes");
    this.snackbar.open("Note", "Archived", {
      duration: 2000,
    });
    this.eventEmit.emit({});
      },
      error=>{
        this.snackbar.open("Note", "not archived", {
          duration: 2000,
        });
    console.log("error");

      });
  }


}
else{
  this.eventEmit.emit({});
}
}
}
