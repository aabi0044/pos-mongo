import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import{Router}from '@angular/router';
@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  len;
  response;
  bills;
  resp;
  startDate = new Date();
endDate = new Date();
daily;
dateq;
val;
  constructor(private api:ApiService,private router:Router)  { }

  ngOnInit() {
    this.viewOrder();
  this.daysInMonth(12, 2018)


  }

  daysInMonth (month, year) {
    this.startDate = new Date(""+year+'-'+month+'-'+1+"");
    let daysInMonth = new Date(year.toString(), month.toString(), 0).getDate();
    this.endDate = new Date(""+year+'-'+month+'-'+daysInMonth+"");

    console.log(this.startDate, this.endDate);
}
  viewOrder(){

    
    this.api.getBills().subscribe(res=>{
      console.log(res);
      this.bills=res;
    let f = this.bills.filter(elem => {

      const str = elem.date.toString(),
      parts = str.split('-'),
      year = parseInt(parts[0], 10),
      month = parseInt(parts[1], 10) - 1, // NB: month is zero-based!
      day = parseInt(parts[2], 10),
      date = new Date(year, month, day);
      console.log(date);

      return date > this.startDate && date < this.endDate
    });
      console.log(f);
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
  onClickBill(item){
    console.log(item._id);
    let id=item._id;
    this.router.navigate(['vieworder/' + id])
  }
  today(){
   
      this.dateq = new Date();
     console.log(this.dateq);
     this.api.getBills().subscribe(res=>{
this.daily=res;
let d= this.daily.filter((elem => {

  const str = elem.date.toString(),
  parts = str.split('-'),
  year = parseInt(parts[0], 10),
  month = parseInt(parts[1], 10) - 1, // NB: month is zero-based!
  day = parseInt(parts[2], 10),
  date = new Date(year, month, day);
  console.log(date);

  return date <= this.dateq && date >= this.dateq;
}));
console.log(d);
  })}

  // selectChangeHandler(event:any){
  //   this.val=event.target.value;
  
  //   if (this.val == 'jan') {
  //   this.location.type='commercial';
  //   this.user.commercial='commercial';
  // }
  // else if (this.val == 'residential') {
  //   this.location.type= 'residential';
  //   this.user.residential='residential';
  // }
  // this.assign();
  //  }
  }
