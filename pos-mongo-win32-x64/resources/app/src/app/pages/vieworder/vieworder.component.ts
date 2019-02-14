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
net=0;
z=0;
  constructor(private api:ApiService,private route: ActivatedRoute) { 
    this.uid = this.route.snapshot.params['id'];
    console.log(this.uid);
  }

  ngOnInit() {
    this.viewOrder();
    this.total();

   
  }
  print(): void {
    let printContents, popupWin;
    printContents = document.getElementById('print-section').innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
          //........Customized style.......
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
}
viewOrder(){
  this.api.getSpecificBill(this.uid).subscribe(res=>{
    console.log(res);
    this.response=res;
    this.len=this.response.length;
    for(let i=0;i<this.len;i++){
      this.net=this.response[i].saleTotal
      console.log(this.net);
    }
   
  })
}
  

total(){
  this.api.getSpecificBill(this.uid).subscribe(res=>{
this.resp=res;
// this.len=this.resp.length;
// this.net= this.resp.orderArray[0].saleTotal;
var len = this.resp.orderArray.length;
let m=this.resp.orderArray;
console.log(m);
console.log(len);
for (var i = 0; i < len; i++) {
  let n=m[i].saleTotal;
  console.log(n);
     this.z=n+this.z;
  }
  this.net=this.z;
  console.log(this.net);
})
}
}
