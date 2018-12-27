import { Component, OnInit } from '@angular/core';
import{ApiService}from '../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vieworder',
  templateUrl: './vieworder.component.html',
  styleUrls: ['./vieworder.component.css']
})
export class VieworderComponent implements OnInit {
len;
response;
bills;
resp;
uid;


  constructor(private api:ApiService,private route: ActivatedRoute) { 
    this.uid = this.route.snapshot.params['id'];
    console.log(this.uid);
  }

  ngOnInit() {

    this.viewOrder();
  }

  
viewOrder(){
  this.api.getBills().subscribe(res=>{
    console.log(res);
    this.bills=res;
    console.log(this.bills);
  })
}
total(){
  this.api.getBills().subscribe(res=>{
this.resp=res;
this.len=this.resp.length;
for(let i=0;i<this.len;i++){
  
}
  })
}
}
