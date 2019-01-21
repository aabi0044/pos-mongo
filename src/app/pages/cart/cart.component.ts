import { Component, OnInit } from '@angular/core';
import{ApiService}from '../../services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  bill = {
    orderArray: [],
    //investment total
    totalActual: 0,
    //sale total
    totalSale: 0,
    //investment - sale 
    totalSave: 0,
    totalQuantity:0,
    quantity: 0,
    date: Date.now()
  }
  //======================Final BIll==============
totalBill=0;
actualBill=0;
saveBill=0;
final=0;
z=0;
net=0;
resp;
amad;
billid;
  date: Date;
//=========================================
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
  
    if(this.api.cart.length!=0){
     this.total();
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
  let len=this.api.cart.length;
  for(let i=0;i<len;i++){
    let res=this.api.cart[i];
    console.log(res);
let id=res.id;
let quantity=res.quantity;
this.api.getProduct(id).subscribe(respo=>{
  this.amad=respo;
  console.log(this.amad.quantity);
  let acutualquantity=this.amad.quantity;
  let leftquantity=acutualquantity-quantity;
  let name=this.amad.name;
  let price=this.amad.price;

  console.log(leftquantity);
  let data={
    quantity:leftquantity,
    name:name,
    price:price
  }
this.api.updateProduct(id,data).subscribe(respon=>{
  console.log("product Quantity Updated");
})
})
  //  let data={
     
  
  //  }
   
  //   this.api.updateProduct(id,data).subscribe(resp=>{
  //     console.log(resp);
  //   })
    // console.log(res);
  }
}
checkout1() {
  this.totalOfBill();
  this.checkout();
  console.log(this.api.cart);
  console.log(this.bill.date);
  this.bill.orderArray = this.api.cart;
  console.log(this.bill);
  this.api.postBill(this.bill).subscribe(res => {
    console.log(res);
    this.resp = res;
    this.billid=this.resp._id;
    this.date = this.resp.date;
    console.log(new Date(this.date));
    let y = new Date(this.date);
    let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
    console.log(u);
    console.log(this.date);
    this.clearCart();
    this.net=0;
    this.router.navigate(['vieworder/' + this.billid])
  })
 
}
totalOfBill() {
  let x = JSON.parse(localStorage.getItem('cart'));
  console.log(x);
  var len = x.length;
  let totalBill = 0
  let totalSale = 0
  let saveBill = 0
  let totalQuantity=0;
  for (let i = 0; i < len; i++) {
    let l = parseInt(x[i].saleTotal);
    totalBill = (l + totalBill);
  }
  for (let j = 0; j < len; j++) {
    let m = parseInt(x[j].actualTotal);
    totalSale = (m + totalSale);
  }
  for (let j = 0; j < len; j++) {
    let m = parseInt(x[j].quantity);
    totalQuantity= (m + totalQuantity);
  }
  
  saveBill = totalBill - totalSale;
  this.bill.totalActual = totalSale;
  this.bill.totalSale = totalBill;
  this.bill.totalSave = saveBill;
  this.bill.totalQuantity=totalQuantity;
  console.log(this.bill.totalActual);
  console.log(this.bill.totalSale);
  console.log(this.bill.totalSave);
}
// totalOfBill(){
//   let x = JSON.parse(localStorage.getItem('cart'));
//   console.log(x);
//   var len = x.length;
//   // console.log(len);
//   for(let i=0;i<len;i++){
  
//     // console.log(x[i].saleprice);
//     let l = parseInt(x[i].saleprice);

//     this.totalBill= (l + this.totalBill);
//     console.log(this.totalBill);

//   }
//   for(let j=0;j<len;j++){
//     // console.log(x[j].saleTotal);
//     // console.log(x[j].saleprice);
//     let m = parseInt(x[j].saleTotal);

//     this.actualBill= (m + this.actualBill);
//     console.log(this.actualBill);
//   }
//   this.saveBill=this.actualBill-this.totalBill;
//   console.log(this.saveBill);
//   this.bill.totalSale=this.totalBill;
//   this.bill.totalActual=this.actualBill;
//   this.bill.totalSave=this.bill.totalSale-this.bill.totalActual;
// this.final=this.bill.totalActual;

// }

total(){
  let x = JSON.parse(localStorage.getItem('cart'));
  console.log(x);
  var len = x.length;
// this.len=this.resp.length;
// this.net= this.resp.orderArray[0].saleTotal;


for (var i = 0; i < len; i++) {
  let n=x[i].saleTotal;
  console.log(n);
     this.z=n+this.z;
  }
  this.net=this.z;
  console.log(this.net);
}


}
