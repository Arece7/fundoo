import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private service: HttpService) { }
  getData(){     //creating get method for a get request
    var url="user/service"
    return  this.service.httpGetWithoutToken(url);  //concatinating both url
    }
  signUp(body){
    var url="user/userSignUp"
    return this.service.httpPostWithoutToken(url,body);
  }

  loggingin(body){
    var url="user/login";
    return this.service.httpPostWithoutToken(url,body);
  }

  forgotPassword(body){
    var url="user/reset"
    return this.service.httpPostWithoutToken(url,body);
  }
  loggingout(){
    var url='/user/logout';
    return this.service.httpPostData(url,null)
  }
  registerPushToken(body){
    var url='user/registerPushToken'
    return this.service.httpPostData(url,body);
  }
  searchUser(body){
    var url='user/searchUserList'
    return this.service.httpPostData(url,body);
  }
}
