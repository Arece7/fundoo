import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavbarComponent } from '../navbar/navbar.component';
import {NoteService} from '../../core/services/noteService/note.service'
import { environment } from '../../../environments/environment';
import { DataService } from "../../core/services/data.service";
// import { SearchServiceService } from '../../core/service/searchService/search-service.service'
@Component({
  selector: 'app-crop-image',
  templateUrl: './crop-image.component.html',
  styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit {

  public croppedImage: any = '';
  imageChangedEvent: any = '';
  constructor(
    public dialogRef: MatDialogRef<NavbarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _service: NoteService,
    private data1: DataService
  ) { }

  ngOnInit() {
    this.onUpload();
  }
  imageCropped(event: any) {
    this.croppedImage =event.file;
  }
  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiurl + this.image2;
  onUpload() {


    const uploadData = new FormData();
    uploadData.append('file', this.croppedImage);
    this._service.updateProfile( uploadData).subscribe(res => {
      // this.img = environment.apiurl + res['status'].imageUrl;
      localStorage.setItem("imageUrl", res['status'].imageUrl);
      this.dialogRef.close()
      this.data1.changeView1(true);
    }, error => {


    })

  }

}
