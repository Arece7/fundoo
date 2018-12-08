import { LoggerService } from '../../core/services/logger.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { ClientService } from '../../core/services/userService/client.service';
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public hide;
 public services=[];
  lForm: FormGroup;
  post: any;
  email: string = "";
  password: string = "";

  constructor(
    private _Service: ClientService,
    fb: FormBuilder,
    public snackbar: MatSnackBar,
    private router: Router,
    private userService : ClientService
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
this.getServices();
  }
  model: any = {};
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
  login() {
    this._Service
      .loggingin( {
        email: this.model.uname,
        password: this.model.pass
      })
      .pipe(takeUntil(this.destroy$))
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
          this._Service.registerPushToken(body)
          .pipe(takeUntil(this.destroy$))
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
  ngOnDestroy() {
    console.log('destroyed');
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
    }
}
