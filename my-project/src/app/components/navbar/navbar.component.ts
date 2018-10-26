/** Purpose         : For Navigation bar
 *  @description
 *  @file           : navbar.component.ts
 *  @author         : Arghya Ray
*/

import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
public logout: Boolean = false;
public Fname=localStorage.getItem("fName");    //storing data in local storage
public Lname=localStorage.getItem("lName");
public Email=localStorage.getItem("email");
public word=this.Fname[0];
  constructor(private router:Router,private _Service:UserService,public snackbar:MatSnackBar) { }

  ngOnInit() {

  }
  notes()
    {
      this.router.navigate(['/dashboard']);         //redirecting to dashboard
    }
    archive()
    {
      this.router.navigate(['/archive']);     //redirecting to archive
    }
    trash()
    {
      this.router.navigate(['/trash']);        //redirecting to trash
    }
    Logout()
                                           //logout function
      {

      var Token= localStorage.getItem('token');
         var mybody={}
                                              //api call for logout
        this._Service.postPassword("user/logout",mybody,Token).subscribe(response=>
          {
            console.log("reset done");
            localStorage.removeItem('token');
            this.snackbar.open("LogOut", "success", {
              duration: 2000,
            });
            this.router.navigate(['/', 'login']);

            console.log(response);
          },error=>
          {

            this.snackbar.open("LogOut", "failed,Try again", {
              duration: 2000,
            });
            console.log(error);

          }
        )
      }

}
