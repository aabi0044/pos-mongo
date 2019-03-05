import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
pin:string;
constructor(private router:Router) { }
part2:boolean=false;
  ngOnInit() {
  }
  
  pincode(){
if(this.pin=="2257"){
  localStorage.setItem("uid",this.pin);
  this.router.navigate(['/addproduct']);
}
else{
  console.log("object");
}
  }
onThis(){
this.part2=true;

}
}
