import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

url="http://34.213.106.173/api";

  constructor(private http: HttpClient) { }

  getData(adress)
  {
    return this.http.get(this.url+"/"+adress);
  }
  postData(adress,bodydata)
  {
    return this.http.post(this.url+"/"+adress,bodydata);
  }
  checkData(adress,bodydata)
  {
    return this.http.post(this.url+"/"+adress,bodydata);
  }
  postPassword(adress,bodydata,acessToken)
  {
    console.log(acessToken);
    console.log(bodydata);
    
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': acessToken
      })

    };
    
  
    return this.http.post(this.url+"/"+adress,this.getFormUrlEncoded(bodydata),httpAuthOptions1)
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
   }
}
