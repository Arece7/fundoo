import { MainCollaboratorComponent } from './../main-collaborator/main-collaborator.component';
import { Component, OnInit, Input } from "@angular/core";
import { MatDialog } from '@angular/material';

@Component({
  selector: "app-collaborator",
  templateUrl: "./collaborator.component.html",
  styleUrls: ["./collaborator.component.scss"]
})
export class CollaboratorComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  @Input()
  Delete: any;
  @Input() note
  ngOnInit() {}
  openDialog(): void {
    const dialogRef = this.dialog.open(MainCollaboratorComponent,{
          width: "700px",
          data: this.note
    });
    dialogRef.afterClosed()
      .subscribe(result => {
      console.log('The dialog was closed');
     });
  }
}
