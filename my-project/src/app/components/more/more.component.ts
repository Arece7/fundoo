/** Purpose         : For more components
 *  @description
 *  @file           : more.component.ts
 *  @author         : Arghya Ray
 */

import { Component, OnInit, Input, EventEmitter, Output,OnDestroy } from "@angular/core";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { NoteService } from '../../core/services/noteService/note.service'
import { HttpService } from '../../core/services/httpService/http.service';
import { MatDialog } from "@angular/material";

@Component({
  selector: "app-more",
  templateUrl: "./more.component.html",
  styleUrls: ["./more.component.scss"]
})
export class MoreComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  public searchLabel;

  @Input()
  Delete: any;
  @Input() note;
  @Output()
  eventEmit = new EventEmitter();
  @Output()
  labelEvent = new EventEmitter(); //creating instance of event emitter
  constructor(
    private noteservice: NoteService,private service: HttpService,
    public snackbar: MatSnackBar,
    public dialog: MatDialog
  ) { }
  public noteLabels = [];

  ngOnInit() {
    // this.getLabels();
  }
  func(){
        this.getLabels();

  }
  /**@function:  deleteNotes() for deleting the notes*/
  deleteNotes(val) {


    var idList = [];
    idList.push(this.note.id);
    var body = {
      isDeleted: val,
      noteIdList: idList
    }; //api call for deleting the notes
    this.noteservice.deleteNote(body)
    .pipe(takeUntil(this.destroy$)).subscribe(
      data => {
        this.eventEmit.emit({});
      },
      error => { }
    );
  }
  /**@function:  deleteNotes() for deleting the notes forever*/
  deleteForever() {


    var idList = [];
    idList.push(this.note.id);
    var body = {
      isDeleted: false,
      noteIdList: idList
    }; //api call for deleting the notes
    this.noteservice.deleteForever( body)
    .pipe(takeUntil(this.destroy$)).subscribe(
        data => {
          this.eventEmit.emit({});
        },
        error => { }
      );
  }
  public labelList;


  /**
   * @function:getLabels()  for getting the note labels
   */
  getLabels() {
    this.service
      .httpGetData("noteLabels/getNoteLabelList")
      .pipe(takeUntil(this.destroy$)).subscribe(response => {
        this.labelList = response["data"].details;
        if (this.noteLabels.length > 0) {
          for (var i = 0; i < this.labelList.length; i++) {
            for (var j = 0; j < this.noteLabels.length; j++) {
              if (this.labelList[i].id == this.noteLabels[j].id) {
                this.labelList[i].isChecked = true;
              }
            }
          }
        }
      });
  }

  /**
   * @function:addDeleteLabel() for adding & deleteing the note labels
   */
  addDeleteLabel(labelObj) {
    this.labelEvent.emit(labelObj);
    if (this.note != null && labelObj.isChecked == true) {
      this.noteservice
        .addLabelToNote( this.note["id"] , labelObj.id )
        .pipe(takeUntil(this.destroy$)).subscribe(
          Response => {
            this.eventEmit.emit({});
          },
          error => { }
        );
    }
    if (this.note != null && labelObj.isChecked == false) {
      this.noteservice
        .removeLabelToNote(
          this.note["id"] ,
          labelObj.id
        )
        .pipe(takeUntil(this.destroy$)).subscribe(
          Response => {
            this.eventEmit.emit({});
          },
          error => { }
        );
    }
  }
  ngOnDestroy() {
    console.log(' destroyed');
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
    }
}
