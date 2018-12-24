import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Observable}from 'rxjs/Observable';
import {RequestOptions, Request, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
readonly baseUrl= 'http://localhost:3000/product';
readonly baseUrl2= 'http://localhost:3000/cart';
bill = {
  cart: [],
  billno:Number,
  totalActual: Number,
    totalSale: Number,
    totalSave: Number,
    quantity:Number,
    date:Date.now()
  
}
cart: any[] = [];
data = [];
index = 0;
amount:number;
  total: number;

  constructor(private http:HttpClient) { }

  postProducts(data){
    
    return this.http.post(this.baseUrl, data);
  }
getProducts(){
  return this.http.get(this.baseUrl);
}
updateProduct(id,data){
  return this.http.put(this.baseUrl+`/${id}`,data);
}
deleteProduct(id){
  return this.http.delete(this.baseUrl +`/${id}`);
}


saveToCart(cart) {
  let data = JSON.stringify(cart);
  localStorage.setItem('cart', data);
}

getSavedCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

clearSavedCart() {
  localStorage.removeItem('cart');
}



addItemToCart(item) {
  return this.cart.push(item);
}
removeItemFromCart(index) {
  this.cart.splice(index, 1);
}

//--------------------------------------------------------------------------------------------------------//
/** Get Data from Cart  */
// getCartData(id) {
//   console.log(id)
//   return this.afs.doc('cart/' + id).valueChanges();
// }
getCartdata(id){
  return this.http.get(this.baseUrl2+`/${id}`);
}
/* ---------------ORDER--------------------------------------------------------------------------- */
postBill(){
    console.log(this.cart)
  return this.http.post(this.baseUrl2, this.bill);
}
getBillss(){
return this.http.get(this.baseUrl2);
}
updateBill(id,data){
return this.http.put(this.baseUrl2+`/${id}`,data);
}
deleteBill(id){
return this.http.delete(this.baseUrl2 +`/${id}`);
}

}

