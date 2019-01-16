import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';
import {Router}from '@angular/router';
import { empty } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  name: string;
  price: number;
  quantity:number;
  warrenty:string;
  products;
  id;
  searchText = '';
  check;
  warrning:boolean=false;
  filter;
  constructor(private api:ApiService,private router:Router) { }

  ngOnInit() {
    this.fetchProducts();
    this.getLimitedProducts();
  }
addProducts(){
  let p={
    name: this.name,
    price: this.price,
    quantity:this.quantity,
    warrenty: this.warrenty,
    date: Date.now()
  }
  console.log(p);
  this.api.postProducts(p).subscribe(res=>{
    console.log(res);
    location.reload();
  });
  this.fetchProducts();
}
fetchProducts(){
  this.api.getProducts().subscribe((res)=>{
this.products=res;
console.log(this.products);
  })
}
updateProduct(){
  let product={
    name:this.name,
    price:this.price,
    quantity:this.quantity
  }
  console.log(product);
  console.log(this.id);
  this.api.updateProduct(this.id,product).subscribe((res)=>{
    console.log(res);
    location.reload()
  })
}
deleteProduct(id){
  console.log(id);
  let pid=id._id;
  console.log(pid);
  this.api.deleteProduct(pid).subscribe((res)=>{
    console.log(res);
    location.reload()
  })
  this.fetchProducts();
}
onClick(item){
console.log(item);
this.id=item._id;
this.name=item.name;
this.price=item.price;
this.quantity=item.quantity;
}
filterCondition(product){
  
  return product.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
}
useCart(){
  this.router.navigate(['/makeorder'])
}
getLimitedProducts(){
  this.api.getProducts().subscribe((res)=>{
this.check=res;
// let f = this.filterByDate.filter(elem => elem.date > this.startDate && elem.date < this.endDate);
let f= this.check.filter(elem=> elem.quantity<16);
console.log(f);
this.filter=f;
if(this.filter!=empty()){
  console.log("object");
  this.warrning=true;
}
  })
}
}
