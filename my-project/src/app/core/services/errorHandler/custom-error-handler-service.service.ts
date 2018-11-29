import {ErrorHandler, Injectable,Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {MatSnackBar} from '@angular/material';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerServiceService implements
  ErrorHandler {
    constructor(public snackBar: MatSnackBar,private injector: Injector) {}
    handleError(error) {

      let router = this.injector.get(Router);





if (error instanceof HttpErrorResponse ) {
  if(!error.status){
    window.location.href = '/error'
  }
  if(error.status==500){
    this.snackBar.open('Something bad happened', 'close', {
      duration: 2500,
    })
  }
  else{
    this.snackBar.open('failed to load ', 'close', {
      duration: 2500,
    })
  }
}

// else if(error instanceof TypeError || error instanceof ReferenceError){
// this.snackBar.open('Some error happened ', 'close', {
//   duration: 2500,
// })
// }

// else{
// this.snackBar.open('some error happened', 'close', {
//   duration: 2500,
// })
// }

  }
    }
