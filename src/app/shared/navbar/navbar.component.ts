import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
 addProduct(){
   let id=localStorage.getItem('uid');
   if(id=="2257"){
     this.router.navigate(['/addproduct']);
   }
   else{
     this.router.navigate(['/login']);
     console.log("kidar?");
   }
 }
 logout(){
   localStorage.removeItem('uid');
   this.router.navigate(['/makeorder']);
 }
}
