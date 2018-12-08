import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { NotesCollectionComponent } from "../notes-collection/notes-collection.component";
// import { DialogData } from '../update/update.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-service',
  templateUrl: './cart-service.component.html',
  styleUrls: ['./cart-service.component.scss']
})
export class CartServiceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NotesCollectionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router,
    private dialog: MatDialog,) { }

  ngOnInit() {
  }
remove(){
  this.dialogRef.close();
}
proceed(){
  this.router.navigate(['/signup'])
  this.dialogRef.close();
}

}







