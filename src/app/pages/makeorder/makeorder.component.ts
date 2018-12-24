import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';

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
  sale:number;
  total:number;
  tsave:number;
actualTotal:number;
saleTotal:number;
saveTotal:number;

  constructor(private api:ApiService) { }

  ngOnInit() {
    this.fetchProducts();
    this.clear();
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
    // console.log(this.totalActualPrice);
  this.clear();
  }
  onClick(item){
    console.log(item);
    this.id=item._id;
    this.name=item.name;
    this.price=item.price;
    }
    clearCart() {
      this.api.cart = [];
      localStorage.setItem('cart', JSON.stringify(this.api.cart));
     
    }
    totalPrice() {


      let x = JSON.parse(localStorage.getItem('cart'));
      console.log(x);
      var len = x.length;
  
  
      for (var i = 0; i < len; i++) {
        let l = parseInt(x[i].saleprice);
  
        this.total = (l + this.total);
      }
    
    }
    checkout(){
      //move the cart to an order... 
      // this.api.bill.customerId = localStorage.getItem('uid');
      // this.api.order.email = localStorage.getItem('email');
      // this.api.order.address = '';
    
      console.log(this.api.cart);
      this.api.bill.cart = this.api.cart;
      console.log(this.api.bill);
      this.api.postBill().subscribe(res=>{
        console.log(res);
      })
      this.clearCart();
    
  }
  
    clear(){
      this.name='',
      this.price=null,
      this.quantity=null,
      this.sale=null

    }
}
