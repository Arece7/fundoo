import { LoggerService } from './../../core/services/logger.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NoteService } from '../../core/services/noteService/note.service'


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild('question') question: ElementRef ;
  @ViewChild('replayMessage') replayMessage: ElementRef ;

  constructor( private route : ActivatedRoute,private service : NoteService, private router : Router) { }
  public id = this.route.snapshot.params.id;
  public note:object={};
  public questions=[]
  public reply:boolean=false;
  public img;
  public replyid;
  public ratingValue;
  public reply2;
  ngOnInit() {
    this.getDetails();
  }
  /*@functuion: getDetails() for getting the note details */
  getDetails(){
    this.service.getNoteDetails(this.id)
    .subscribe( (response)=>{
      this.note=response["data"].data[0];
      this.questions=this.note['questionAndAnswerNotes']
      this.img=environment.apiurl;
    },(error)=>{
      LoggerService.log("notedetails"+error);
    });
  }
 /*@functuion: rateCheck() for getting the note details */
  rateCheck(data){
    // debugger;
    console.log(data);
      if(data.length>0){
        for(let i=0;i<data.length;i++){
          if(data[i].userId==localStorage.getItem("uId")){
            this.ratingValue=data[i].rate;
            return true
          }
          if(data[i].userId!=localStorage.getItem("uId")){
            // this.ratingValue=data[i].rate;
            return true
          }
        }
      }
else if(data.length==0){
  this.ratingValue=0;
  return true
}

  }
  rateCount(data){
    if(data.length==0)
    return 0;
    let value=0;
    for(let a=0;a<data.length;a++){
      value+=data[a].rate;
    }
    let rate=value/(data.length)
    return rate
  }
  addQuestion(){
    let body={
      "message":this.question.nativeElement.innerHTML,
      "notesId":this.id
    }
    this.service.askQuestion(body)
    .subscribe((response)=>{
      this.getDetails()
    },(error)=>{
    })
  }
  close(){
    this.router.navigate(["/dashboard"]);
  }
  replyToQuestion(data){
    this.replyid=data.id
    this.reply=!this.reply;
  }

  replyToReply(data){
    this.replyid=data.id
    this.reply2=!this.reply2;
  }
  like(data){
    let body={
      "like":false
    }
    if(data.like.length==0)
      body.like=true;
    else{
      body.like=!data.like[0].like
      for(let l=0;l<data.like.length;l++){
        if(data.like[l].userId==localStorage.getItem("uId") && data.like[l].like==false)
          body.like=true;
      }
    }
    LoggerService.log("like"+body)
    this.service.addLike(body,data.id)
    .subscribe((response)=>{
      this.getDetails()
    },(error)=>{

    })
  }
  likeCheck(question){
    for(let m=0;m<question.length;m++){
      if(question[m].like==true){
        if(question[m].userId==localStorage.getItem("uId")){
          return true
        }
      }
    }
    return false
  }
  Check(data){
    for(let m=0;m<data.length;m++){
      if(data[m].like==true){
        if(data[m].userId==localStorage.getItem("uId")){
          return true
        }
      }
    }
    return false;
  }
  countLIke(data){
    let count=0
    for(let m=0;m<data.like.length;m++){
      if(data.like[m].like==true){
        count+=1;
      }
    }
    return count;
  }

  answer(){
    let reply=this.replayMessage.nativeElement.innerHTML;
    let body={
      "message":reply
    }
    LoggerService.log("answerdata"+this.replyid);
    LoggerService.log("answerbody"+body)
    this.service.addReply(body,this.replyid)
    .subscribe((response)=>{

      this.reply=this.reply2=false
      this.getDetails();
    },(error)=>{
    })
  }
  rating(data,rate){
    let body={
      "rate":rate
    }
    this.service.addrating(body,data.id)
    .subscribe((response)=>{

      this.getDetails()


    },(error)=>{

    })
  }
}
