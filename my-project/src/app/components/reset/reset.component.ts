import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { HttpService } from "../../core/services/httpService/http.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { passValidator } from "./cutomReset";
@Component({
  selector: "app-reset",
  templateUrl: "./reset.component.html",
  styleUrls: ["./reset.component.scss"]
})
export class ResetComponent implements OnInit {
  public hide;
  constructor(
    private route: ActivatedRoute,
    private _Service: HttpService,
    public snackbar: MatSnackBar,
    private router: Router,
    fb: FormBuilder
  ) {
    this.rForm = fb.group({
      password: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(10)]
      ],
      cnfpassword: [null, passValidator]
    });
  }
  public acessToken = this.route.snapshot.params["token"];
  rForm: FormGroup;
  post: any;

  password: string = "";
  cnfpassword: string = "";

  ngOnInit() {
    this.acessToken=this.route.snapshot.params['token'];

  }
  model: any = {};

  ChangePassword() {
    // let input = new FormData();
    localStorage.setItem('token',this.acessToken);

    var mybody = { newPassword: this.model.password };



    this._Service
      .ResetPassword("user/reset-password", mybody, this.acessToken)
      .subscribe(
        response => {

          this.snackbar.open("Reset", "success", {
            duration: 2000
          });
          this.router.navigate(["/", "login"]);


        },
        error => {

          this.snackbar.open("Reset", "failed,Try again", {
            duration: 2000
          });

        }
      );
  }
}
