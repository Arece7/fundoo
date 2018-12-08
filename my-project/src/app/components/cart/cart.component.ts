import { Component, OnInit,OnDestroy } from '@angular/core';
import { ClientService } from '../../core/services/userService/client.service';
import { LoggerService } from '@service/logger.service';
import { CartServiceComponent } from '../cart-service/cart-service.component';
import { MatDialog } from '@angular/material';
import { NoteService } from '../../core/services/noteService/note.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  destroy$: Subject<boolean> = new Subject<boolean>();
  private service=[];
  private serviceOne:any;
  constructor(private userService : ClientService, private dialog: MatDialog, private cartService : NoteService) { }

  ngOnInit() {
    this.getServices();
  }
getServices(){
  this.service=[];
  this.userService.getData().subscribe(data => {
    for (var i = 0; i < data["data"].data.length; i++) {
      data["data"].data[i].select = false;
      this.service.push(data["data"].data[i]);
    }
    LoggerService.log('Success'+this.service);
  })
}
selectCards(card) {
  this.serviceOne = card.name;
  card.select = true;
  for (var i = 0; i < this.service.length; i++) {
    if (card.name == this.service[i].name) {
      continue;
    }
    this.service[i].select = false;
  }
}
addToCart(index){
  this.cartService.addTocart({
    "productId" : index.id
  }).pipe(takeUntil(this.destroy$))
  .subscribe(data => {
      LoggerService.log('Success'+data)
      localStorage.setItem("cartId",data['data']['details'].id)
  const dialogRef = this.dialog.open(CartServiceComponent, {
    width: '700px',
    height: '410px',
    data: index
  });
  // dialogRef.afterClosed().subscribe(() => {
  //   this.getServices();
  // });
})
}
ngOnDestroy() {
  this.destroy$.next(true);
  this.destroy$.unsubscribe();
}

}










