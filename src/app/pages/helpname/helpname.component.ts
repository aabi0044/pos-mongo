import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-helpname',
  templateUrl: './helpname.component.html',
  styleUrls: ['./helpname.component.css']
})
export class HelpnameComponent implements OnInit {
name;
  constructor(private router:Router) { }

  ngOnInit() {
  }
verify(){
if(this.name=='realman'){
this.router.navigate(['/makeorder']);
}
else{
  console.log("object");
}
}
}
