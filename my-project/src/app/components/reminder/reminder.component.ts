
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as _moment1 from 'moment';
import { UserService } from './../../core/services/user.service';


const moment = _moment1 || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
],

})
export class ReminderComponent implements OnInit {

  reminders = [
    {viewPeriod: 'Morning',viewTime: '08:00 AM'},
    {viewPeriod: 'Afternoon',viewTime: '01:00 PM'},
    {viewPeriod: 'Evening', viewTime: '06:00 PM'},
    {viewPeriod: 'Night', viewTime: '08.00 PM'},
  ];
  currentDate = new Date();
  minDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  @Input()Delete: any;

  date = new FormControl(moment());
  public body:any={}
  constructor(private Service: UserService) { }
@Input() note
@Output() eventEmit = new EventEmitter();



reminderBody = {
  "date": new FormControl(new Date()),
  "time": ""
}

public isDeleted=false;
public flag = false;
  ngOnInit() {
    if(this.note!=undefined && this.note.isDeleted==true){
      this.isDeleted=true
    }
    // this.reminderBody.date =
    console.log(this.note);

  }
  remindToday(){
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.note.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
      }
    this.Service. deletingNote('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('token'))
      .subscribe(data => {
        console.log("success in today reminders",data);
        this.eventEmit.emit({});

      },
        error => {
          console.log("error in today reminders",error)
        })
  }
  remindTomorrow(){
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.note.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
      }
    this.Service. deletingNote('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('token'))
      .subscribe(data => {
        console.log("success in tomorrow reminders",data);
        this.eventEmit.emit({});

      },
        error => {
          console.log("error in tomorrow reminders",error)
        })
  }
  weekRemainder(){
    let currentDate = new Date()
    this.body =
      {
        'noteIdList': [this.note.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
      }
    this.Service. deletingNote('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('token'))
      .subscribe(data => {
        console.log("success in week reminders",data);
        this.eventEmit.emit({});

      },
        error => {
          console.log("error in week reminders",error)
        })
  }
  addRemCustom(date, timing) {

    timing.match('^[0-2][0-3]:[0-5][0-9]$');
   if (timing == this.reminderBody.time) {
      console.log(this.reminderBody.time)
      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);
      console.log(ampm);
      console.log(hour);
      console.log(minute);
      if (ampm == 'AM' || ampm == 'am') {
        this.body = {
          "noteIdList": [this.note.id],
          "reminder": new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth(), (new Date(date)).getDate(), hour, minute, 0, 0)
        }
        this.Service.deletingNote('notes/addUpdateReminderNotes',this.body, localStorage.getItem('token')).subscribe((result) => {
          console.log(result);
          this.eventEmit.emit({});
        })
      } else if (ampm == 'PM' || ampm == 'pm') {
        this.body = {
          "noteIdList": [this.note.id],
          "reminder": new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth(), (new Date(date)).getDate(), hour + 12, minute, 0, 0)
        }
        this.Service.deletingNote('notes/addUpdateReminderNotes',this.body, localStorage.getItem('token')).subscribe((result) => {
          console.log(result);
          this.eventEmit.emit({});
        })
      }

    }
  }

}
