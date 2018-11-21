

/** Purpose         : For Navigation bar
 *  @description
 *  @file           : navbar.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit,OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { MatDialog } from "@angular/material";
import { DataService } from "../../core/services/data.service";
import { CropImageComponent } from '../crop-image/crop-image.component';
import{environment} from '../../../environments/environment'
import { ClientService } from '../../core/services/userService/client.service';
import { ActivatedRoute ,ParamMap} from '@angular/router';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public logout: Boolean = false;
  public Fname = localStorage.getItem("fName"); //storing data in local storage
  public Lname = localStorage.getItem("lName");
  public Email = localStorage.getItem("email");
  public word = this.Fname[0];
  public width;

  constructor(
    private router: Router,
    private _Service: ClientService,
    public snackbar: MatSnackBar,
    public dialog: MatDialog,
    private data: DataService,
    private route:ActivatedRoute
  ) {}
  message: string;
  ngOnInit() {
    this.isLargeScreen()
    this.data.currentMessage.subscribe(message => (this.message = message));
    this.data.currentView2.subscribe(message => (this.name = message));
    this.route.firstChild.paramMap.subscribe(
      (params: ParamMap) => {

        this.name = params['params'].labelName;

      })

    if(this.router.url=="/dashboard"){
      this.name="Fundoo notes"
    }
    if(this.router.url=="/archive"){
      this.name="Archive"
    }
    if(this.router.url=="/search"){
      this.name="Fundoo notes"
    }
    if(this.router.url=="/reminder"){
      this.name="Reminders"
    }
    if(this.router.url=="/trash"){
      this.name="Trash "
    }
    if(this.router.url=="/trash"){
      this.name="Trash "
    }

 }
  notes() {
    this.router.navigate(["/dashboard"]); //redirecting to dashboard
  }
  archive() {
    this.router.navigate(["/archive"]); //redirecting to archive
  }
  trash() {
    this.router.navigate(["/trash"]); //redirecting to trash
  }
  search() {
    this.router.navigate(["/search"]); //redirecting to search
  }
  reminder() {
    this.router.navigate(["/reminder"]); //redirecting to reminder
  }
  Logout() //logout function
  {

    var mybody = {};
    //api call for logout
    this._Service.loggingout()
    .pipe(takeUntil(this.destroy$)).subscribe(
      response => {
        localStorage.removeItem("token");
        localStorage.removeItem("uId");
        localStorage.removeItem("fName");
        localStorage.removeItem("lName");
        localStorage.removeItem("email");
        localStorage.removeItem("imageUrl");
        this.snackbar.open("LogOut", "success", {
          duration: 2000
        });
        this.router.navigate(["/", "login"]);
      },
      error => {
        this.snackbar.open("LogOut", "failed,Try again", {
          duration: 2000
        });
      }
    );
  }

  public searchInput;
  sendmessage() {
    this.data.changeMessage(this.searchInput);
  }
  grid = 0;
  viewList() {
    this.grid = 1;
    this.data.changeView(true);
  }
  viewGrid() {
    this.grid = 0;
    this.data.changeView(false);
  }

 public selectedFile = null;
 public image2 = localStorage.getItem("imageUrl");
 public img = environment.apiurl + this.image2;

  onFileSelected(event: any): void {
    this.selectedFile = event.path[0].files[0];
    this.openDialog(event);
  }

public pic;
  openDialog(data): void {       //Function for the dialog box
    const dialogRef = this.dialog.open(CropImageComponent, {
      width: '650px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.data.currentView1.subscribe(message=>this.pic=message)
      if(this.pic){
       this.image2 = localStorage.getItem("imageUrl");
       this.img = environment.apiurl + this.image2;
      }

      })
    }
    public name=" Fundoo Notes";
    displayName(changename)
    {
      this.name=changename;
    }
    eventlabel(event)
    {
      this.name=event;
    }
    isLargeScreen() {
      this.width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      }
      ngOnDestroy() {
        console.log('destroyed');
        this.destroy$.next(true);
        // Now let's also unsubscribe from the subject itself:
        this.destroy$.unsubscribe();
        }
}
