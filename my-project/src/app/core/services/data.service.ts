import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class DataService {
  private messageSource = new BehaviorSubject("default message");
  currentMessage = this.messageSource.asObservable();

  private viewSource = new BehaviorSubject(false);
  currentView = this.viewSource.asObservable();

  private viewSource1 = new BehaviorSubject(false);
  currentView1 = this.viewSource1.asObservable();

  private viewSource2 = new Subject<any>();
  currentView2= this.viewSource2.asObservable();

  constructor() {}
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  changeView(message: boolean) {
    this.viewSource.next(message);
  }
  changeView1(message: boolean) {
    this.viewSource1.next(message);
  }
  changeView2(message: boolean) {
    console.log("print",message);

    this.viewSource2.next(message);
  }
}
