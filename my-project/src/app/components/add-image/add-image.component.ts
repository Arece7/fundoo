import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.scss']
})
export class AddImageComponent implements OnInit {

  constructor() { }
@Input()Delete: any;
  ngOnInit() {
  }

}
