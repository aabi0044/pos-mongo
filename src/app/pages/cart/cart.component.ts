import { Component, OnInit } from '@angular/core';
import{ApiService}from '../../services/api/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  bill = {
    orderArray: [],
    totalActual:0,
      totalSale:0,
      totalSave: 0,
      quantity:0,
      date:Date.now()
    
  }
  //======================Final BIll==============
totalBill=0;
actualBill=0;
saveBill=0;
final=0;

//=========================================
  constructor(private api:ApiService) { }

  ngOnInit() {
    
    if(this.api.cart!= null){
      this.totalOfBill();
    }
    
  }
  remove(id) {
    let index = this.api.cart.findIndex(element => element.id === id);
    this.api.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
  }
  clearCart() {
    this.api.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    // this.total = 0;
  }
  checkout(){
    console.log(this.api.cart);
    this.bill.orderArray = this.api.cart;
    console.log(this.bill);
    
    this.totalOfBill();
    this.api.postBill(this.bill).subscribe(res=>{
      console.log(res);
    })

}
totalOfBill(){
  let x = JSON.parse(localStorage.getItem('cart'));
  console.log(x);
  var len = x.length;
  // console.log(len);
  for(let i=0;i<len;i++){
  
    // console.log(x[i].saleprice);
    let l = parseInt(x[i].saleprice);

    this.totalBill= (l + this.totalBill);
    console.log(this.totalBill);

  }
  for(let j=0;j<len;j++){
    // console.log(x[j].saleTotal);
    // console.log(x[j].saleprice);
    let m = parseInt(x[j].saleTotal);

    this.actualBill= (m + this.actualBill);
    console.log(this.actualBill);
  }
  this.saveBill=this.actualBill-this.totalBill;
  console.log(this.saveBill);
  this.bill.totalSale=this.totalBill;
  this.bill.totalActual=this.actualBill;
  this.bill.totalSave=this.bill.totalSale-this.bill.totalActual;
this.final=this.bill.totalActual;

}


}
