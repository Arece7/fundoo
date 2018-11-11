import { Component, OnInit, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
// import {MomentDateAdapter} from '@angular/material-moment-adapter';
// import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
// import * as _moment from 'moment';
// import * as _moment1 from 'moment';
// import { SignupService } from '../../core/services/http/http.service';


// const moment = _moment1 || _moment;
// export const MY_FORMATS = {
//   parse: {
//     dateInput: 'LL',
//   },
//   display: {
//     dateInput: 'LL',
//     monthYearLabel: 'MMM YYYY',
//     dateA11yLabel: 'LL',
//     monthYearA11yLabel: 'MMMM YYYY',
//   },
// };
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss'],
//   providers: [
//     {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
//     {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
// ],

})
export class ReminderComponent implements OnInit {

  constructor() { }
  @Input()Delete: any;
  ngOnInit() {
  }

}
