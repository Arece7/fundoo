import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import {passValidator} from './custom'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  hide = true;

  rForm: FormGroup;
  post: any;
  fname: string = '';
  lname: string = '';
  email: string = '';
  password: string = '';
  cnfpassword: string = '';

  public cards=[];

  constructor(private _getService:UserService,private _postService:UserService,fb: FormBuilder) 
  {
    this.rForm = fb.group({
      'fname': [null, Validators.required],
      'lname': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'password': [null,Validators.required],
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
    public service;
    toggle(card){
      card.select = !card.select;
      console.log(card.name);
       this.service=card.name;
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
    this._postService.postData("user/userSignUp",
    {
      "firstName": this.model.fname,
      "lastName": this.model.lname,
      "phoneNumber": 8617666305,
       "service": this.service,
      "createdDate": "2018-10-09T06:35:12.617Z",
      "modifiedDate": "2018-10-09T06:35:12.617Z",
      "username": this.model.uname,
      "email": this.model.uname,
      "emailVerified": true,
      "password": this.model.pass
    }).subscribe(response=>
    {
      console.log("signup done");
      console.log(response);
    })
}
  


}
