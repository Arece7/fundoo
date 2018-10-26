/** Purpose         : For Add Notes
 *  @description
 *  @file           : add.component.ts
 *  @author         : Arghya Ray
*/

import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']

})
export class AddNotesComponent implements OnInit {
  public note1:boolean=true;

  @Output() onNewEntryAdded = new EventEmitter(); //creating an instance

  constructor(private service:UserService,public snackbar:MatSnackBar) { }

  ngOnInit() {
  }
  postValue()                //for posting the data of Notes
  {
    var title=document.getElementById("title").innerHTML;
    var description=document.getElementById("description").innerHTML;

          var body={

            'title':title,
            'description':description
          }

var token=localStorage.getItem('token')

                                 //api call for add notes

    this.service.addingNote('/notes/addNotes',body,token).subscribe(

          data=>{
              console.log('post sucessfull');
              this.snackbar.open("Note", "Added", {
                duration: 2000,
              });
              this.onNewEntryAdded.emit
              ({

                  })
          },
          error=>{
            this.snackbar.open("Note", "not added", {
              duration: 2000,
            });
            console.log('error happened');

          }
    )

  }
}
