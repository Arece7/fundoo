import { Component, OnInit } from '@angular/core';
import { DataService } from "../../services/data.service";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private data: DataService,private service:UserService) { }
  searchInput:string;
  ngOnInit() {
    this.data.currentMessage.subscribe(message => {this.searchInput = message
    console.log(this.searchInput,"searchbar")})
    this.getNotes();
  }
  public notes=[];
  getNotes()              //for getting the data of the notes
  {
    var token=window.localStorage.getItem('token')

                             //api call for getting note list


    this.service.getnotes('/notes/getNotesList',token).subscribe(

      data=>{
        this.notes=[];
       for(var i=data["data"].data.length-1;i>=0;i--)
       {
         if(data["data"].data[i].isDeleted==false && data["data"].data[i].isArchived==false )
         {                                                   //checking the flags
          this.notes.push(data["data"].data[i])            //pusing in note array
         }

       }
       console.log(this.notes);

      },
      error=>{
       console.log(error);

      }

    )}
}
