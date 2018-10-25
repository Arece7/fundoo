import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  constructor(private service:UserService) { }
 public notes=[];

  ngOnInit() {
    this.getNotes();
  }
  addNewEntry(event){

    console.log(event);
    if(event){

     this.notes = [];
      this.getNotes();
    }
  }
  getNotes()
  {
    var token=window.localStorage.getItem('token')

    this.service.getnotes('/notes/getNotesList',token).subscribe(

      data=>{
        this.notes=[];
       for(var i=data["data"].data.length-1;i>=0;i--)
       {
         if(data["data"].data[i].isDeleted==false)
         {
          this.notes.push(data["data"].data[i])
         }

       }
       console.log(this.notes);

      },
      error=>{
       console.log(error);

      }
    )
  }
}
