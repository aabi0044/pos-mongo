import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import{Router}from '@angular/router';

@Component({
  selector: 'app-makeorder',
  templateUrl: './makeorder.component.html',
  styleUrls: ['./makeorder.component.css']
})
export class MakeorderComponent implements OnInit {
  totalActual:number;
  totalSale: number;
  totalSave: number;
  quantity:number;
  date=Date.now();
  name;
  products;
  id;
  price;
  sale=0;
  total=0;
  tsave=0;
  tactual=0;
actualTotal:number;
saleTotal:number;
saveTotal:number;
//======================Final BIll==============
totalBill=0;
actualBill=0;
saveBill=0;
//=========================================
bill = {
  orderArray: [],
  billno:Number,
  totalActual: Number,
    totalSale: Number,
    totalSave: Number,
    quantity:Number,
    date:Date.now()
  
}


  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.fetchProducts();
  
    this.totalOfBill();
  }
  fetchProducts(){
    this.api.getProducts().subscribe((res)=>{
  this.products=res;
  console.log(this.products);
    })
  }
  addProductToCart() {
    //simple save item to cart 
   this.saleTotal=this.sale*this.quantity;
   this.actualTotal=this.price*this.quantity;
   this.saveTotal=this.saleTotal-this.actualTotal;
   
    let tsave=this.tsave;
    let product = {
      name: this.name,
      // price: this.price,
      quantity:this.quantity,
      saleprice:this.sale,
      // total:this.total,
      saleTotal:this.saleTotal,
      // actualTotal:this.actualTotal,
      // saveTotal:this.saveTotal
    }
    this.api.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    // console.log(this.api.cart);
    console.log(this.api.getSavedCart());
    this.totalPrice();
    console.log(this.total);
    console.log(this.tactual);
    console.log(this.tsave);
    // console.log(this.totalActualPrice);

  }
  onClick(item){
    console.log(item);
    this.id=item._id;
    this.name=item.name;
    this.price=item.price;
    }
    clearCart() {
      this.api.cart = [];
      localStorage.setItem('cart', JSON.stringify(this.cart));
     
    }
    totalPrice() {


      let x = JSON.parse(localStorage.getItem('cart'));
      console.log(x);
      var len = x.length;
  
  
      for (var i = 0; i < len; i++) {
        let l = parseInt(x[i].saleprice);
  
        this.total = (l + this.total);
this.total=this.total*this.quantity;
      }
     
        let m = this.price;
  
        this.tactual = (m + this.tactual);
this.tactual=this.tactual*this.quantity;
      
    
    }
    checkout(){
      console.log(this.api.cart);
      this.bill.orderArray = this.api.cart;
      console.log(this.bill);
      this.api.postBill(this.bill).subscribe(res=>{
        console.log(res);
      })

  }
  
    clear(){
      this.name='',
      this.price=null,
      this.quantity=null,
      this.sale=null

    }
   
    viewOrder(){
      this.router.navigate(['/vieworder'])
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
    }
    cart(){
      this.router.navigate(['/cart'])
    }
}
