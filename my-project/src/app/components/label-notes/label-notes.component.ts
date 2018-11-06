import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-label-notes',
  templateUrl: './label-notes.component.html',
  styleUrls: ['./label-notes.component.css']
})
export class LabelNotesComponent implements OnInit {

  constructor(public route: ActivatedRoute,
    private service: UserService) { }


  public labelName ;
  public labelNOtes=[];

  ngOnInit() {

    this.route.params.subscribe(
      (params: Params) => {

        console.log(params['labelName']);
        this.labelName = params['labelName']
        this.getLabelNOtes(this.labelName);

      })


  }
  getLabelNOtes(labelName){

    var url ="notes/getNotesListByLabel/"+labelName
    this.service.post(url, null, localStorage.getItem('token')).subscribe(response => {
      console.log("successfull", response);
      this.labelNOtes=response['data'].data
      console.log(this.labelNOtes);

    }, error => {
      console.log("failed", error)
    })

  }
  eventLabel(event)
  {
    this.getLabelNOtes(this.labelName);
  }
  addNewEntry(event){
    console.log(event);
    if(event){
      this.getLabelNOtes(this.labelName);
    }
  }
  change(event){
    this.getLabelNOtes(this.labelName);           // event for catching the changes
}


  // eventDone(event){
  //  this.getLabelNOtes(this.labelName)
  // }
}





