/** Purpose         : For more components
 *  @description
 *  @file           : more.component.ts
 *  @author         : Arghya Ray
*/

import { Component, OnInit,Input,EventEmitter, Output} from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.css']
})
export class MoreComponent implements OnInit {
  @Input() note:any;
  @Output() eventEmit=new EventEmitter();      //creating instance of event emitter
  constructor(private service:UserService,public snackbar:MatSnackBar) { }

  ngOnInit() {

  }
deleteNotes()                //for deleting the notes
{
  var token=localStorage.getItem('token')

  var idList=[];
  idList.push(this.note.id);
  var body=
  {
    "isDeleted":true,
    "noteIdList":idList
  };                                 //api call for deleting the notes
this.service.deletingNote('/notes/trashNotes',body,token).subscribe(
  data=>{
console.log("succes");
this.snackbar.open("Note", "Deleted", {
  duration: 2000,
});
this.eventEmit.emit({})
  },
  error=>{
    this.snackbar.open("Note", "not deleted,Try again", {
      duration: 2000,
    });
console.log("error");

  }
)


}
}
