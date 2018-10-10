import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(private _getService:UserService) { }

  ngOnInit() {
    this._getService.getData("user").subscribe((data)=>{console.log(data)})
  }

}
