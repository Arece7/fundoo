
import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../core/services/userService/client.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passValidator } from "./custom";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { NoteService } from '../../core/services/noteService/note.service';
import { LoggerService } from '@service/logger.service';
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  hide = false;
  service ="";
  rForm: FormGroup;
  post: any;
  fname: string = "";
  lname: string = "";
  email: string = "";
  password: string = "";
  cnfpassword: string = "";
  private card=[];
  private cardId="";
  private cartId=localStorage.getItem("cartId");



  constructor(
    private _getService: ClientService,
    private _postService:ClientService,
    fb: FormBuilder,
    public snackbar: MatSnackBar,
    private router: Router,
    private userService : ClientService, private cartService : NoteService
  ) {
    this.rForm = fb.group({
      fname: [null, Validators.required],
      lname: [null, Validators.required],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
          )
        ]
      ],
      password: [
        null,
        [Validators.required, Validators.minLength(6)]
      ],
      cnfpassword: [null, passValidator]
    });
  }

  ngOnInit() {
    this.getCardDetails();
    this.getService();
  }

  getCardDetails(){
    this.cartService.getCardDetails(this.cartId)
    .subscribe((response) => {
      this.cardId=response["data"].product.id;
    },(error)=>{
    });
  }
  getService(){
    this.userService.getData()

    .subscribe((response) => {
      for(let i=0;i<response["data"].data.length;i++){
        response["data"].data[i].select=false;
        this.card.push(response["data"].data[i]);
      }
      for(let j=0;j<this.card.length;j++){
        if(this.card[j].id==this.cardId)
          this.service=this.card[j].name;
      }
    });
  }



  model: any = {};
  Signup() {
    if (this.service.length == 0) {
      this.snackbar.open("services", "select a service first", {
        duration: 2000
      });
    } else
      this._postService
        .signUp( {
          firstName: this.model.fname,
          lastName: this.model.lname,
          service: this.service,
          email: this.model.uname,
          emailVerified: true,
          password: this.model.pass,
          cartId:this.cartId
        })
        .subscribe(
          response => {
            this.snackbar.open("signup", "success", {
              duration: 2000
            });
            this.router.navigate(["/", "login"]);

          },
          error => {
            this.snackbar.open("signup", "failed,Try again", {
              duration: 2000
            });

          }
        );
  }

}




