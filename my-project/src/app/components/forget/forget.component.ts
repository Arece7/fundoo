import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  constructor(private _Service:UserService,public snackbar:MatSnackBar) { }

  ngOnInit() {
  }
  model:any={};
  reset()
  {
   this._Service.checkData("user/reset",{
    "email": this.model.uname,
   }).subscribe(response=>
    {
      console.log("you got a mail");
      this.snackbar.open("Email", "success", {
        duration: 2000,
      });
      console.log(response);
    },error=>
    {
      this.snackbar.open("Email", "failed,Try again", {
        duration: 2000,
      });
      console.log(error);
      
    }
  )
  }
}
