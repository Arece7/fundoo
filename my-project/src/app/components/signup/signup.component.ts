
import { Component, OnInit } from "@angular/core";
import { ClientService } from "../../core/services/userService/client.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passValidator } from "./custom";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

import { LoggerService } from '@service/logger.service';
@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  hide = false;
  service = "";
  rForm: FormGroup;
  post: any;
  fname: string = "";
  lname: string = "";
  email: string = "";
  password: string = "";
  cnfpassword: string = "";
  public services=[];


  constructor(
    private _getService: ClientService,
    private _postService:ClientService,
    fb: FormBuilder,
    public snackbar: MatSnackBar,
    private router: Router,
    private userService : ClientService
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
        [Validators.required, Validators.minLength(6), Validators.maxLength(10)]
      ],
      cnfpassword: [null, passValidator]
    });
  }

  ngOnInit() {
    this. getServices();
  }
  getServices(){
    this.services=[];
    this.userService.getData().subscribe(data => {
      for (var i = 0; i < data["data"].data.length; i++) {
        data["data"].data[i].select = false;
        this.services.push(data["data"].data[i]);
      }
      LoggerService.log('Success'+this.services);
    })
  }


  model: any = {};
  Signup() {
    if (this.service.length === 0) {
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
          password: this.model.pass
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
