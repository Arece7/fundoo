
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { NoteService } from '../../core/services/noteService/note.service'
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
public noteId;
public note;
public noteTitle;
rate=3.5;
public inputMessage:string;
private questionAsked:string;
public questionAsk;
  constructor(public route: ActivatedRoute, private service: NoteService,private router: Router,private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
       this.noteId= params['id'];
      })
      this.getNoteDetails();
      // this.question(event);
}
getNoteDetails()
{
  this.service.getNoteDetails(this.noteId).subscribe(
    data=>{
      this.note=data['data'].data[0];
      this.questionAsk=this.note.questionAndAnswerNotes[0];
      console.log(this.note);
      console.log(this.questionAsk);

    },
    error=>{

    }
  )

}
close()
{
  this.router.navigate(["/dashboard"]);
}
question(event){

  if (event.key === "Enter" && event.target.value.length != 0 &&
  event.target.value.trim().length != 0){
    this.questionAsked=event.target.value;
    this.spinnerService.show();
    // console.log(this.questionAsked);
    let questionBody={
      "message":this.questionAsked,
      "notesId":this.note.id
    }
    this.service.askQuestion(questionBody).subscribe(
      data=>{
        console.log(this.questionAsk);
        this.getNoteDetails();

      },
      error=>{
        console.log(error);
      }
    )
  }
}
}
