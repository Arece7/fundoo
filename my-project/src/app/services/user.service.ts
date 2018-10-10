import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
}
