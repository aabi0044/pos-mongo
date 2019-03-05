import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { NgbDateStruct, NgbDatepickerI18n, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
const now = new Date();
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
    totalActual: 0,
    //sale total
    totalSale: 0,
    //investment - sale 
    totalSave: 0,
    quantity: 0,

    date: Date.now()
  }
  searchText = '';
  resp;
  date: Date;
  warrenty: string;
buttons:boolean=false;
divs:boolean=false;
  disabledModel: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
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
      saveTotal: this.saveTotal,
      warrenty: this.warrenty,
      id:this.id
    }
    this.api.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.api.cart));
    console.log(this.api.getSavedCart());
    this.totalPrice();
    this.totalOfBill();
    this.name='';
    this.quantity=0;
    this.sale=0;
    this.price=0;
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
    console.log(this.bill.date);
    this.bill.orderArray = this.api.cart;
    console.log(this.bill);
    this.api.postBill(this.bill).subscribe(res => {
      this.resp = res;
      this.date = this.resp.date;
      console.log(new Date(this.date));
      let y = new Date(this.date);
      let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
      console.log(u);
      console.log(this.date);
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
    let totalBill = 0
    let totalSale = 0
    let saveBill = 0
    for (let i = 0; i < len; i++) {
      let l = parseInt(x[i].saleTotal);
      totalBill = (l + totalBill);
    }
    for (let j = 0; j < len; j++) {
      let m = parseInt(x[j].actualTotal);
      totalSale = (m + totalSale);
    }
    saveBill = totalBill - totalSale;
    this.bill.totalActual = totalSale;
    this.bill.totalSale = totalBill;
    this.bill.totalSave = saveBill;
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
  selectChangeHandler(event: any) {
    let val;
    val = event.target.value;
    if (val == '6') { this.warrenty = 'Six Months '; }
    else if (val == '1') { this.warrenty = 'One Year '; }
    else if (val == '2') { this.warrenty = 'Two Year '; }
    else if (val == '3') { this.warrenty = 'Three Year '; }
  }
  Buttons(){

  }
  // convertDate() {
  //   const str = this.date.toString(),
  //     parts = str.split('-'),
  //     year = parseInt(parts[0], 10),
  //     month = parseInt(parts[1], 10) - 1, // NB: month is zero-based!
  //     day = parseInt(parts[2], 10),
  //     date = new Date(year, month, day);
  //   console.log(date);
  //   let x = date.getTimezoneOffset();
  //   console.log(x);
  //   date.setMinutes(date.getMinutes() + 500);
  //   console.log(date);
  // }
}
