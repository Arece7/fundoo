import { LoggerService } from './../../core/services/logger.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from "../../core/services/user.service";


@Component({
  selector: 'app-main-reminder',
  templateUrl: './main-reminder.component.html',
  styleUrls: ['./main-reminder.component.scss']
})
export class MainReminderComponent implements OnInit {
  public notes = [];
  constructor(private service: UserService) { }

  ngOnInit() {
    this.getNotes();
  }
  addNewEntry(event) {
    this.getNotes();
  }
  eventLabel(event) {
    this.getNotes();
  }
  getNotes() //for getting the notes in archive
  {
    var token = localStorage.getItem("token");

    this.service.getnotes("/notes/getReminderNotesList", token).subscribe(
      data => {
        this.notes = [];
        for (var i = data["data"].data.length - 1; i >= 0; i--) {
          if (data["data"].data[i].isDeleted == false)
            this.notes.push(data["data"].data[i]);
            this.notes.sort(function(a,b)
            {
               a=new Date(a.reminder[0]);
               b=new Date(b.reminder[0]);
              return a-b;
            })
        }

      },
      error => {

      }
    );
  }
}
