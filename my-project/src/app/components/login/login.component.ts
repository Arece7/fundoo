import { LoggerService } from '../../core/services/logger.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../core/services/user.service";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  public hide;

  lForm: FormGroup;
  post: any;
  email: string = "";
  password: string = "";

  constructor(
    private _Service: UserService,
    fb: FormBuilder,
    public snackbar: MatSnackBar,
    private router: Router
  ) {
    this.lForm = fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
          )
        ]
      ],
      password: [null, [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {

if(localStorage.getItem('token')!=null)
{
  this.router.navigateByUrl('/dashboard')
}
  }
  model: any = {};
  login() {
    this._Service
      .checkData("user/login", {
        email: this.model.uname,
        password: this.model.pass
      })
      .subscribe(
        response => {
          var token = response["id"];


          localStorage.setItem("token", token);
          localStorage.setItem("uId", response["userId"]);
          localStorage.setItem("fName", response["firstName"]);
          localStorage.setItem("lName", response["lastName"]);
          localStorage.setItem("email", response["email"]);
          localStorage.setItem("imageUrl", response["imageUrl"]);

          var body=
          {
            "pushToken": localStorage.getItem('pushtoken')
          }
          this._Service.post('user/registerPushToken',body,localStorage.getItem('token'))
          .subscribe(
            data => {
             LoggerService.log("success" +  data)
            },
            error => {
              LoggerService.error("error" + error)
            }
          );
          this.snackbar.open("login", "success", {
            duration: 2000
          });
          this.router.navigate(["/", "dashboard"]);

        },
        error => {
          this.snackbar.open("login", "failed,Try again", {
            duration: 2000
          });

        }
      );
  }
}
