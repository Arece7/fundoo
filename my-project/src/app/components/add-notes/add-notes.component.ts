import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']

})
export class AddNotesComponent implements OnInit {
  public note1:boolean=true;

  @Output() onNewEntryAdded = new EventEmitter();

  constructor(private service:UserService) { }

  ngOnInit() {
  }
  postValue()
  {
    var title=document.getElementById("title").innerHTML;
    var description=document.getElementById("description").innerHTML;

          var body={

            'title':title,
            'description':description
          }

var token=localStorage.getItem('token')


    this.service.addingNote('/notes/addNotes',body,token).subscribe(

          data=>{
              console.log('post sucessfull');
              this.onNewEntryAdded.emit
              ({
                  })
          },
          error=>{

            console.log('error happened');

          }
    )

  }
}
