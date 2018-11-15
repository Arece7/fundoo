

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import * as _moment1 from 'moment';
import { UserService } from './../../core/services/user.service';
import{LoggerService} from '../../core/services/logger.service'

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
    LoggerService
],

})
export class ReminderComponent implements OnInit {

  reminders = [
    {viewPeriod: 'Morning',viewTime: '08:00 AM',disableStatus:false},
    {viewPeriod: 'Afternoon',viewTime: '01:00 PM',disableStatus:false},
    {viewPeriod: 'Evening', viewTime: '06:00 PM',disableStatus:false},
    {viewPeriod: 'Night', viewTime: '08.00 PM',disableStatus:false},
  ];
  currentDate = new Date();
  minDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate());
  @Input()Delete: any;

  date = new FormControl(moment());
  public body:any={}
  constructor(private Service: UserService) { }
@Input()note
@Output() eventEmit = new EventEmitter();
@Output() reminderEmit = new EventEmitter();


reminderBody = {
  "date": new FormControl(new Date()),
  "time": ""
}

public isDeleted=false;
public flag = false;
dateflag=false;
  ngOnInit() {

  }
  remindToday(){
    let currentDate = new Date()
   let emitdate=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
   this.reminderEmit.emit(emitdate);

  if(this.note!=undefined){
    this.body=
    {
      'noteIdList': [this.note.id],
      'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 0, 8, 0, 0)
    }
    this.Service. deletingNote('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('token'))
      .subscribe(data => {

        this.eventEmit.emit({});

      },
        error => {

        })
      }
  }
  remindTomorrow(){
    let currentDate = new Date()
    let emitdate= new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
    this.reminderEmit.emit(emitdate);
    if(this.note!=undefined){
    this.body =
      {
        'noteIdList': [this.note.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1, 8, 0, 0)
      }
    this.Service. deletingNote('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('token'))
      .subscribe(data => {

        this.eventEmit.emit({});

      },
        error => {

        })
      }
  }
  weekRemainder(){
    let currentDate = new Date()
    let emitdate=new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
    this.reminderEmit.emit(emitdate);
    if(this.note!=undefined){
    this.body =
      {
        'noteIdList': [this.note.id],
        'reminder': new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7, 8, 0, 0)
      }
    this.Service. deletingNote('/notes/addUpdateReminderNotes', this.body,localStorage.getItem('token'))
      .subscribe(data => {

        this.eventEmit.emit({});

      },
        error => {

        })
      }
  }
  addRemCustom(date, timing) {
LoggerService.log("value passed  "+ timing);
    timing.match('^[0-2][0-3]:[0-5][0-9]$');
   if (timing == this.reminderBody.time) {

      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);

      if (ampm == 'AM' || ampm == 'am') {
        let emitdate=new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth(), (new Date(date)).getDate(), hour, minute, 0, 0)
        this.reminderEmit.emit(emitdate);
        if(this.note!=undefined){
        this.body = {
          "noteIdList": [this.note.id],
          "reminder": new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth(), (new Date(date)).getDate(), hour, minute, 0, 0)
        }
        this.Service.deletingNote('notes/addUpdateReminderNotes',this.body, localStorage.getItem('token')).subscribe((result) => {

          this.eventEmit.emit({});
        })
      }
      } else if (ampm == 'PM' || ampm == 'pm') {
        let emitdate=new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth(), (new Date(date)).getDate(), hour + 12, minute, 0, 0)
        this.reminderEmit.emit(emitdate);
        if(this.note!=undefined){
        this.body = {
          "noteIdList": [this.note.id],
          "reminder": new Date((new Date(date)).getFullYear(), (new Date(date)).getMonth(), (new Date(date)).getDate(), hour + 12, minute, 0, 0)
        }
        this.Service.deletingNote('notes/addUpdateReminderNotes',this.body, localStorage.getItem('token')).subscribe((result) => {

          this.eventEmit.emit({});
        })
      }
    }

    }
  }

  disable(event)
  {
this.dateflag=false;
  var pattern=/^(2[0-3]|1[0-9]|[0][0-9]):[0-5][0-9] (AM|PM|pm|am|Pm|pM|Am|aM)$/;
   if(pattern.test( this.reminderBody.time))
   {
 this.dateflag=true;
   }
   else
   this.dateflag=false;
  }

}
