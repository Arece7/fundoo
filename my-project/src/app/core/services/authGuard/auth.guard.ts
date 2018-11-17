import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate() {
    if (localStorage.getItem("token")) {
      // logged in so return true
      return true;
  }
   // not logged in so redirect to login page with the return url
   window.location.href='/login';
   return false;
  }
  }

