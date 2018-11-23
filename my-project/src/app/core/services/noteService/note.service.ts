import { Injectable } from '@angular/core';
import { HttpService } from '../httpService/http.service';
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor( private service: HttpService) { }


  addLabelToNote(noteid, labelid) {
    var url = 'notes/' + noteid + '/addLabelToNotes/' + labelid + '/add'
    return this.service.httpPostData(url, null)
  }
  removeLabelToNote(noteid, labelid) {
    var url = 'notes/' + noteid + '/addLabelToNotes/' + labelid + '/remove'
    return this.service.httpPostData(url, null)
  }

  getTrash() {
    var url = 'notes/getNotesList'
    return this.service.httpGetData(url);
  }


  pinUnpin(body) {
    var url = 'notes/pinUnpinNotes';
    return this.service.httpPostData(url, body);
  }
  getListByName(name) {
    var url = 'notes/getNotesListByLabel/' + name;
    return this.service.httpPostData(url, null)
  }

  deletecheck(checklistid, noteid) {
    var url = 'notes/' + noteid + '/checklist/' + checklistid + '/remove'
    return this.service.httpPostData(url, null)
  }

  updatecheck(checklistid, noteid, body) {
    var url = 'notes/' + noteid + '/checklist/' + checklistid + '/update'
    return this.service.httpPostData(url, body)
  }
  addchecktopopup(noteid, body) {
    var url = 'notes/' + noteid + '/checklist/add';
    return this.service.httpPostData(url, body)
  }

  updateCheckBox(checkboxId,noteId,body){
  var url='notes/'+noteId+'/checklist/'+checkboxId+'/update';
  return this.service.httpPostData(url,body)
  }

  createLabel(body){
    var url='noteLabels';
    return this.service.httpPostData(url,body);
  }
  getLabel(){
    var url='noteLabels/getNoteLabelList';
    return this.service.httpGetData(url);
  }
  deleteLabel(id){
    var url='noteLabels/'+id+'/deleteNoteLabel';
    return this.service.httpDeleteData(url);
  }
  updateLabel(id,body){
    var url="noteLabels/" + id + "/updateNoteLabel";
    return this.service.httpPostData(url,body);
  }
  addnote(body){
    var url='notes/addNotes'
    return this.service.httpPostEncoded(url,this.encode(body))
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

   getnotes(){
     var url='notes/getNotesList';
     return this.service.httpGetData(url);
   }

   deleteNote(body){
     var url='notes/trashNotes';
     return this.service.httpPostData(url,body)
   }

   changecolor(body){
     var url='notes/changesColorNotes';
     return this.service.httpPostData(url,body);
   }

   addArchive(body){
     var url='notes/archiveNotes';
     return this.service.httpPostData(url,body);
   }

   getarchive(){
     var url='notes/getArchiveNotesList';
     return this.service.httpGetData(url);
   }

   updatecard(body){
     var url='notes/updateNotes';
     return this.service.httpPostData(url,body)
   }

   updateProfile(body){
     var url='user/uploadProfileImage'
     return this.service.httpPostWithoutcontent(url,body)
   }

   deleteForever(body){
     var url='notes/deleteForeverNotes'
     return this.service.httpPostData(url,body)
   }
   addReminder(body){
    var url='notes/addUpdateReminderNotes'
    return this.service.httpPostData(url,body)
   }
   deleteReminder(body){
     var url='notes/removeReminderNotes';
     return this.service.httpPostData(url,body)
   }
   getRemindersList(){
     var url='notes/getReminderNotesList';
     return this.service.httpGetData(url);
   }
   addCollab(note,body){
    var url="notes/" + note.id + "/AddcollaboratorsNotes";
    return this.service.httpPostData(url,body);
  }

}
