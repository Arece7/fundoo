import { Component, OnInit } from "@angular/core";
import { ClientService } from  '../../core/services/userService/client.service';
import { MatSnackBar } from "@angular/material";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
@Component({
  selector: "app-forget",
  templateUrl: "./forget.component.html",
  styleUrls: ["./forget.component.scss"]
})
export class ForgetComponent implements OnInit {
  rForm: FormGroup;
  post: any;

  email: string = "";

  constructor(
    private _Service: ClientService,
    public snackbar: MatSnackBar,
    fb: FormBuilder
  ) {
    this.rForm = fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/
          )
        ]
      ]
    });
  }

  ngOnInit() {}
  model: any = {};
  reset() {
    this._Service
      .forgotPassword( {
        email: this.model.uname
      })
      .subscribe(
        response => {

          this.snackbar.open("Email", "success", {
            duration: 2000
          });

        },
        error => {
          this.snackbar.open("Email", "failed,Try again", {
            duration: 2000
          });

        }
      );
  }
}
