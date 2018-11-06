/** Purpose         : For Note cards
 *  @description
 *  @file           : notes-collection.component.ts
 *  @author         : Arghya Ray
*/

import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatDialog} from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { DataService } from "../../services/data.service";
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})


export class NotesCollectionComponent implements OnInit {
  public notes=[];
@Output()   onNewEntryDeleted = new EventEmitter();
@Output() eventEmit=new EventEmitter();              //creating instances of event emitter
@Input() searchInput
  constructor(private service:UserService,public dialog: MatDialog,private data: DataService) { }

  @Input() NoteArray;        //receving the array

@Output() update=new EventEmitter();
  ngOnInit() {

  }

  eventOccured(event){
    if(event){

      this.onNewEntryDeleted.emit({})
    }
  }
  openDialog(note): void {                            // for dialog mateial
    const dialogRef = this.dialog.open(UpdateComponent, {
      width: '600px',
       data: note
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.update.emit()

    });
  }


  deleteLabel(note,label)
  {
    var token=localStorage.getItem('token');
    this.service.post("/notes/" + note['id'] + "/addLabelToNotes/" + label.id + "/remove", null, token)
    .subscribe(Response => {
      console.log(Response);
      this.eventEmit.emit({})
    }, error => {
      console.log(error)
    })
  }

}
