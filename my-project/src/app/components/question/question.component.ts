// import { NoteService } from './../../core/services/noteService/note.service';

/** Purpose         : For Question & Answer
 *  @description
 *  @file           : question.component.ts
 *  @author         : Arghya Ray
 */



import { LoggerService } from './../../core/services/logger.service';
import { environment } from './../../../environments/environment';
import { Component, OnInit,ViewChild, ElementRef  } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NoteService } from '@service/noteService/note.service'


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
  public showHide:boolean=false;

  ngOnInit() {
    this.getNoteDetails();
  }
  /*@functuion: getNoteDetails() for getting the note details */
  getNoteDetails(){
    this.service.getNoteDetails(this.id)
    .subscribe( (response)=>{
      this.note=response["data"].data[0];
      this.questions=this.note['questionAndAnswerNotes']
      this.img=environment.apiurl;

    },(error)=>{
      LoggerService.log("notedetails"+error);
    });
  }
   /*@functuion: addrate() to  give rate  */
   addrate(data,rate){
    let body={
      "rate":rate
    }
    this.service.addrating(body,data.id)
    .subscribe((response)=>{

      this.getNoteDetails()


    },(error)=>{

    })
  }

 /*@functuion: rateChecking() for checking rate details */
  rateChecking(data){
    // debugger;

      if(data.length>0){
        for(let i=0;i<data.length;i++){
          if(data[i].userId==localStorage.getItem("uId")){
            this.ratingValue=data[i].rate;
            return true
          }
          if(data[i].userId!=localStorage.getItem("uId")){

            return true
          }
        }
      }
else if(data.length==0){
  this.ratingValue=0;
  return true
}
  }
  /*@functuion: rateCount() for counting rate details */
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
  /*@functuion: addQuestion() for adding question */
  addQuestion(){
    let body={
      "message":this.question.nativeElement.innerHTML,
      "notesId":this.id
    }
    this.service.askQuestion(body)
    .subscribe((response)=>{
      this.getNoteDetails()
    },(error)=>{
    })
  }
   /*@functuion: close() for redirecting to dashboard*/
  close(){
    this.router.navigate(["/dashboard"]);
  }
   /*@functuion:  replyToQuestion() to identify a particular Queston reply */
  replyToQuestion(data){
    this.replyid=data.id
    this.reply=!this.reply;
  }
 /*@functuion:  replyToReply() to identify a particular reply to a reply */
  replyToReply(data){
    this.replyid=data.id
    this.reply2=!this.reply2;
  }
   /*@functuion:  like() to give like to a Question or reply */

  like(data){
    let body={
      "like":false
    }
    if(data.like.length==0)
      body.like=true;
    else{
      body.like=!data.like[0].like
      for(let n=0;n<data.like.length;n++){
        if(data.like[n].userId==localStorage.getItem("uId") && data.like[n].like==false)
          body.like=true;
      }
    }
    LoggerService.log("like"+body)
    this.service.addLike(body,data.id)
    .subscribe((response)=>{
      this.getNoteDetails()
    },(error)=>{

    })
  }

  likeCheck(question){
    for(let p=0;p<question.length;p++){
      if(question[p].like==true){
        if(question[p].userId==localStorage.getItem("uId")){
          return true
        }
      }
    }
    return false
  }
   /* @functuion: countLIke() to count the likes  */
  countLIke(data){
    let count=0
    for(let m=0;m<data.like.length;m++){
      if(data.like[m].like==true){
        count+=1;
      }
    }
    return count;
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
 /*@functuion:   answer() to add a reply to a question */
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
      this.getNoteDetails();
    },(error)=>{
    })
  }
  /*@functuion:  replyShowing() to show & hide replies  */

  replyShowing(data,value){
    this.showHide=value;
    this.replyid=data.id;
  }

}
