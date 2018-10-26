/** Purpose         : For Add Notes
 *  @description
 *  @file           : main-archive.component.ts
 *  @author         : Arghya Ray
*/

import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-archive',
  templateUrl: './main-archive.component.html',
  styleUrls: ['./main-archive.component.css']
})
export class MainArchiveComponent implements OnInit {

  constructor(private service:UserService) { }
public Array=[]
  ngOnInit() {
    this.getNotes();
  }
  getNotes()                   //for getting the notes in archive
  {
    var token=localStorage.getItem('token')

    this.service.getnotes('/notes/getArchiveNotesList',token).subscribe(

      data=>{
        this.Array=[];
       for(var i=data["data"].data.length-1;i>=0;i--)
       {

          this.Array.push(data["data"].data[i])

       }
       console.log(this.Array);

      },
      error=>{
       console.log(error);

      }
    )
  }
}
