import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "../../../environments/environment"
@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private http: HttpClient) {}

  getData(adress) {
    return this.http.get(environment.baseurl+ "/" + adress);
  }
  postData(adress, bodydata) {
    return this.http.post(environment.baseurl + "/" + adress, bodydata);
  }
  checkData(adress, bodydata) {
    return this.http.post(environment.baseurl + "/" + adress, bodydata);
  }
  postPassword(adress, bodydata, acessToken) {
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: acessToken
      })
    };

    return this.http.post(
      environment.baseurl + "/" + adress,
      this.getFormUrlEncoded(bodydata),
      httpAuthOptions1
    );
  }
  addingNote(adress, bodydata, acessToken) {
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: acessToken
      })
    };

    return this.http.post(
      environment.baseurl + "/" + adress,
      this.getFormUrlEncoded(bodydata),
      httpAuthOptions1
    );
  }
  getnotes(adress, token) {
    var httpheaders = {
      headers: new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: token
      })
    };

    return this.http.get(environment.baseurl + "/" + adress, httpheaders);
  }
  deletingNote(adress, bodydata, acessToken) {
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: acessToken
      })
    };

    return this.http.post(environment.baseurl + "/" + adress, bodydata, httpAuthOptions1);
  }
  post(adress, bodydata, acessToken) {
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: acessToken
      })
    };

    return this.http.post(environment.baseurl + "/" + adress, bodydata, httpAuthOptions1);
  }
  colorChange(adress, bodydata, acessToken) {
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: acessToken
      })
    };

    return this.http.post(environment.baseurl + "/" + adress, bodydata, httpAuthOptions1);
  }

  delete(path) {
    return this.http.delete(environment.baseurl + "/" + path);
  }
  AddImage(nexturl, body, acessToken) {
    var httpAuthOptions1 = {
      headers: new HttpHeaders({
        Authorization: acessToken
      })
    };
    return this.http.post(environment.baseurl + "/" + nexturl, body, httpAuthOptions1);
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    return formBody.join("&");
  }
}
