import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-makeorder',
  templateUrl: './makeorder.component.html',
  styleUrls: ['./makeorder.component.css']
})
export class MakeorderComponent implements OnInit {
  totalActual: number;
  totalSale: number;
  totalSave: number;
  quantity: number;
  // date = new Date;
  name;
  products;
  id;
  price;
  sale = 0;
  total = 0;
  tsave = 0;
  tactual = 0;
  actualTotal: number;
  saleTotal: number;
  saveTotal: number;
  //======================Final BIll==============
  // totalBill = 0;
  // actualBill = 0;
  // saveBill = 0;
  //=========================================
  bill = {
    orderArray: [],
    //investment total
    totalActual:0,
    //sale total
    totalSale: 0,
    //investment - sale 
    totalSave: 0,
    quantity: 0,
    date: Date.now()

  }
  searchText = '';


  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.fetchProducts();

    this.totalOfBill();
  }
  fetchProducts() {
    this.api.getProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products);
    })
  }
  addProductToCart() {
    //simple save item to cart 
    // sale out price
    this.saleTotal = this.sale * this.quantity;
    //investment Price
    this.actualTotal = this.price * this.quantity;
    //save from investment
    this.saveTotal = this.saleTotal - this.actualTotal;
    let product = {
      name: this.name,
      quantity: this.quantity,
      saleprice: this.sale,
      saleTotal: this.saleTotal,
      actualTotal: this.actualTotal,
      saveTotal: this.saveTotal
    }
    this.api.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    console.log(this.api.getSavedCart());
    this.totalPrice();
    // console.log(this.total);
    // console.log(this.tactual);
  this.totalOfBill(); 
   // console.log(this.tsave);
  }
  onClick(item) {
    console.log(item);
    this.id = item._id;
    this.name = item.name;
    this.price = item.price;
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
      this.total = this.total * this.quantity;
    }
    let m = this.price;
    this.tactual = (m + this.tactual);
    this.tactual = this.tactual * this.quantity;
  }
  checkout() {
    console.log(this.api.cart);
    console.log(this.bill.date );
    this.bill.orderArray = this.api.cart;
    console.log(this.bill);
    this.api.postBill(this.bill).subscribe(res => {
      console.log(res);
      this.clearCart();
    })

  }

  clear() {
    this.name = '',
      this.price = null,
      this.quantity = null,
      this.sale = null

  }

  viewOrder() {
    this.router.navigate(['/vieworder'])
  }
  totalOfBill() {
    let x = JSON.parse(localStorage.getItem('cart'));
    console.log(x);
    var len = x.length;
    let totalBill=0
    let totalSale=0
    let saveBill=0
    // console.log(len);
    for (let i = 0; i < len; i++) {

      // console.log(x[i].saleprice);
      let l = parseInt(x[i].saleTotal);

      totalBill = (l + totalBill);
     
    }

    for (let j = 0; j < len; j++) {
      // console.log(x[j].saleTotal);
      // console.log(x[j].saleprice);
      let m = parseInt(x[j].actualTotal);

    totalSale = (m + totalSale);
      
    }
    saveBill =totalBill- totalSale;
    this.bill.totalActual=totalSale;
    this.bill.totalSale=totalBill;
    this.bill.totalSave=saveBill;
    console.log(this.bill.totalActual);
    console.log(this.bill.totalSale);
    console.log(this.bill.totalSave);
  }
  cart() {
    this.router.navigate(['/cart'])
  }
  filterCondition(product) {

    return product.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
}
