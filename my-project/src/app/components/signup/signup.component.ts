import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {passValidator} from './custom'
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = false;
   service="";
  rForm: FormGroup;
  post: any;
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  cnfpassword: string = '';

  public cards=[];

  constructor(private _getService:UserService,private _postService:UserService,fb: FormBuilder ,public snackbar:MatSnackBar,private router: Router) 
  {
    this.rForm = fb.group({
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'email': [null, [Validators.required, Validators.pattern(/^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/)]],
      'password': [null,[Validators.required,Validators.minLength(6),Validators.maxLength(10)]],
      'cnfpassword': [null, passValidator]

    });



   }

  ngOnInit() {
    this._getService.getData("user/service").subscribe((response)=>
    {
      console.log(response);
      var data=response["data"];
      for(var i=0;i<data.data.length;i++)
      {
        data.data[i].select=false;
        this.cards.push(data.data[i]);
      }
      console.log("cards",this.cards);
    });

    }
   
    toggle(card){
      card.select = !card.select;
      this.service=card.name;
      if(card.select==false)
      {
        this.service="";
      }
      console.log(this.service);
       
      for(var i = 0; i < this.cards.length; i++){
        if(card.name==this.cards[i].name){
          continue;
        }
        this.cards[i].select=false;
      }
  }
  
  model:any={};
  Signup()
  {
    if(this.service.length===0)
    {
      this.snackbar.open("services", "select a service first", {
        duration: 2000,
      });
    }
    else
    this._postService.postData("user/userSignUp",
    {
      "firstName": this.model.fname,
      "lastName": this.model.lname,
       "service": this.service,
      "email": this.model.uname,
      "emailVerified": true,
      "password": this.model.pass
    }).subscribe(response=>
    {
      console.log("signup done");
      this.snackbar.open("signup", "success", {
        duration: 2000,
      });
      this.router.navigate(['/', 'login']);
      console.log(response);
    },error=>
    {
      this.snackbar.open("signup", "failed,Try again", {
        duration: 2000,
      });
      console.log(error);
      
    }
  )
}
  


}
