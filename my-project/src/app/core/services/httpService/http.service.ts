import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment} from '../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class HttpService {
//adding api url
API_URL = environment.baseurl;
  constructor(private http: HttpClient) { }

  ResetPassword(url_signup, bodydata, token) {    //creating post method for a perticular post request
    var encodeHeader = {
       headers: new HttpHeaders({
         'Content-Type': 'application/x-www-form-urlencoded',
        //  'Authorization':  localStorage.getItem('token')
       })
     }
     return this.http.post(this.API_URL + '/' + url_signup, this.encode(bodydata),encodeHeader);//concatinating both url
   }
   encode(data) {
     const formBody = [];
     for (const property in data) {
       const encodedKey = encodeURIComponent(property);
       const encodedValue = encodeURIComponent(data[property]);
       formBody.push(encodedKey + '=' + encodedValue);
     }
     return formBody.join('&');
   }

  //---------------------------------------------------------------------------------------
  //common service-------------------------------------------------------------------------
  //---------------------------------------------------------------------------------------

  httpPostWithoutToken(url, body) {
    var headerNoAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    var token = localStorage.getItem('token')
    return this.http.post(this.API_URL + '/' + url, body,headerNoAuthentication)
  }

  httpPostData(url, body) {
  var httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.post(this.API_URL + '/' + url, body,httpHeader)
  }

  httpGetData(url) {
    var httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.get(this.API_URL + '/' + url,httpHeader);
  }

  httpDeleteData(url) {
    var httpHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': localStorage.getItem('token')
      })
    }
    return this.http.delete(this.API_URL + '/' + url,httpHeader);
  }

  httpGetWithoutToken(url) {
    var headerNoAuthentication = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return this.http.get(this.API_URL + '/' + url,headerNoAuthentication);
  }


  httpPostEncoded(url, body) {
    var encodeHeader = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        // 'Authorization':  localStorage.getItem('token')
      })
    }
    return this.http.post(this.API_URL + '/' + url, body,encodeHeader)
  }

  httpPostWithoutcontent(url, body) {

  var headerNoContent = {
    headers: new HttpHeaders({
      // 'Authorization': localStorage.getItem('token')
    })
  }
    return this.http.post(this.API_URL + '/' + url, body,headerNoContent)
  }
  //----------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------
}

