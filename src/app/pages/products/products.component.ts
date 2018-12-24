import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  name: string;
  price: number;
  warrenty:string;
  products;
  id;
  searchText;
  constructor(private api:ApiService) { }

  ngOnInit() {
    this.fetchProducts();
  }
addProducts(){
  let p={
    name: this.name,
    price: this.price,
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
    price:this.price
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
}
filterCondition(product){
  return product.name.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
}
}
