import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../core/services/noteService/note.service';
import { LoggerService } from '../../core/services/logger.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
 import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.scss']
})
export class CartDetailsComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
   constructor(private shoppingCartService : NoteService, private snackBar : MatSnackBar) { }

   private cartId=localStorage.getItem("cartId");
   private cartItem;
   private product:object={};
   private address='';
   private status='';
   private item=[];
   private shoppingCart=true;
   private review=false;
   private placed=false;
   private loader=true;
   ngOnInit() {
   this.getMyCart();
   }
   proceed(){
   this.shoppingCart=false;
   this.review=true;
   this.placed=false;
   }

   /**
   *
   * @description getting product details
   */

   /**
   *
   * @description getting cart list of user
   */
   getMyCart(){
   this.shoppingCartService.getmyCart()
   .pipe(takeUntil(this.destroy$))
   .subscribe((response) => {
   LoggerService.log("res"+response)
   if(response['data'].length!=0){
   this.cartItem=response['data'][0];
   this.product=this.cartItem['product'];
   }
   else{
   this.cartItem=[]
   }
   this.loader=false;

   },(error)=>{
   });
   }

   /**
   *
   * @description order place
   */
   place(){
   /**
   *
   * @description the user cant place order without address
   */
   if(this.address==''){
   this.snackBar.open("failed","please enter address", {
   duration: 2000,
   });
   return;
   }
   let body={
   "cartId":this.cartId,
   "address":this.address
   }
   this.shoppingCartService.placeOrder(body)
   .pipe(takeUntil(this.destroy$))
   .subscribe((response) => {
   this.shoppingCart=false;
   this.review=false;
   this.placed=true;
   },(error)=>{
   });
   }

   /**
   *
   * @description unsubscribing
   */
   ngOnDestroy() {
   this.destroy$.next(true);
   this.destroy$.unsubscribe();
   }


}

