import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  lForm: FormGroup;
  post: any;
  email: string = '';
  password: string = '';



  constructor(private _Service:UserService,fb: FormBuilder,public snackbar:MatSnackBar,private router: Router) {
    this.lForm = fb.group({


      'email': [null, [Validators.required, Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]],
      'password': [null,[Validators.required, Validators.minLength(6)]]


    });


   }

  ngOnInit() {
    // this._Service.getData("user").subscribe((data)=>{console.log(data)})
  }
  model:any={};
  login()
  {
   this._Service.checkData("user/login",{
    "email": this.model.uname,
    "password": this.model.pass
   }).subscribe(response=>
    {
      var token=response["id"];

      console.log("login done");
      localStorage.setItem('token',token);
      localStorage.setItem('uId',response['userId']);
      localStorage.setItem('fName',response['firstName']);
      localStorage.setItem('lName',response['lastName']);
      localStorage.setItem('email',response['email']);
      this.snackbar.open("login", "success", {
        duration: 2000,
      });
      this.router.navigate(['/', 'dashboard']);
      console.log(response);
    },error=>
    {
      this.snackbar.open("login", "failed,Try again", {
        duration: 2000,
      });
      console.log(error);

    }
  )
  }

}
