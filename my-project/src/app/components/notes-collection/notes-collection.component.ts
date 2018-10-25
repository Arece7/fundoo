import { Component, OnInit,Input ,Output,EventEmitter} from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-notes-collection',
  templateUrl: './notes-collection.component.html',
  styleUrls: ['./notes-collection.component.css']
})


export class NotesCollectionComponent implements OnInit {
  public notes=[];
@Output()   onNewEntryDeleted = new EventEmitter();
@Output()   onNewColorChange= new EventEmitter();
  constructor(private service:UserService) { }

  @Input() NoteArray;
  ngOnInit() {

  }
  eventOccured(event){
    if(event){
      console.log("noteCollection",event)
      this.onNewEntryDeleted.emit({})
    }
  }


}
