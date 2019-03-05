import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

const now = new Date();

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
  val2;
  searchText = '';
  month;
  year;
  z = 0;
  net = 0;
  set = 0;
  set1 = 0;
  set2 = 0;
 
  dp;
  d;
  model: NgbDateStruct;
  disabledModel: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    // this.daysInMonth(12, 2018);

    this.viewOrder();

    // this.selectToday();
  }
 
datePicker(){
 this.set=0;
 this.set1=0;
 this.set2=0;
 let e=0;
 let f=0;
 let g=0;
   this.d= Date.parse(this.dp);
 
   let l = new Date(this.d);
   let m = { year: l.getFullYear(), month: l.getMonth() + 1, day: l.getDate() };
   console.log(m);
   this.api.getBills().subscribe(res => {
    this.daily = res;
 
    let d = this.daily.filter((elem => {
      console.log(new Date(elem.date));
      let y = new Date(elem.date);
     
      let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
      console.log(u);
      return u.year == m.year && u.month == m.month && u.day == m.day;
    }));
    if (d[0] == undefined) {
      console.log("okay");
      this.bills = null;

    }
    else {
      this.bills = d;
      console.log(this.bills);
      let l = this.bills.length;
      for (let i = 0; i < l; i++) {
        let x = this.bills[i].totalActual;
        console.log(x);
      e = x + e;
      }
      for (let i = 0; i < l; i++) {
        let x = this.bills[i].totalSale;
        console.log(x);
        f = x + f;
      }
      for (let i = 0; i < l; i++) {
        let x = this.bills[i].totalSave;
        console.log(x);
        g = x + g;
      }
      this.set = e;
      this.set1 = g;
      this.set2 = f;
      console.log(this.set);
    }
  })
  
  // let u = { year: this.dp.getFullYear(), month: this.dp.getMonth() + 1, day: this.dp.getDate() };
  // console.log(u);

}



  // daysInMonth(month, year) {
  //   this.startDate = new Date("" + year + '-' + month + '-' + 1 + "");
  //   let daysInMonth = new Date(year.toString(), month.toString(), 0).getDate();
  //   this.endDate = new Date("" + year + '-' + month + '-' + daysInMonth + "");

  //   console.log(this.startDate, this.endDate);
  // }
  viewOrder() {


    this.api.getBills().subscribe(res => {
      console.log(res);
      this.bills = res;
      this.resp = res;
   
      let f = this.bills.filter(elem => {

        // const str = elem.date.toString(),
        //   parts = str.split('-'),
        //   year = parseInt(parts[0], 10),
        //   month = parseInt(parts[1], 10) - 1, // NB: month is zero-based!
        //   day = parseInt(parts[2], 10),
        //   date = new Date(year, month, day);
        // console.log(date);
        console.log(new Date(elem.date));
        let y = new Date(elem.date);
        let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
        console.log(u);

        // return date > this.startDate && date < this.endDate
      }) ;
    })
  }
 
  total() {
    this.api.getBills().subscribe(res => {
      this.resp = res;
      this.len = this.resp.length;
      for (let i = 0; i < this.len; i++) {
      }
    })
  }
  onClickBill(item) {
    console.log(item._id);
    let id = item._id;
    this.router.navigate(['vieworder/' + id])
  }
  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
    console.log(this.model);
    this.today();
  }
  today() {
    this.set=0;
    this.set1=0;
    this.set2=0;
    let e=0;
 let f=0;
 let g=0;
    this.api.getBills().subscribe(res => {
      this.daily = res;
      console.log(this.model);
      let d = this.daily.filter((elem => {
        console.log(new Date(elem.date));
        let y = new Date(elem.date);
       
        let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
        console.log(u);

        return u.year == this.model.year && u.month == this.model.month && u.day == this.model.day;
      }));
      if (d[0] == undefined) {
        console.log("okay");
        this.bills = null;
        
        console.log(this.bills);
      }
      else {
        this.bills = d;
        console.log(this.bills);
        let l = this.bills.length;
        for (let i = 0; i < l; i++) {
          let x = this.bills[i].totalActual;
          console.log(x);
          e = x + e;
        }
        for (let i = 0; i < l; i++) {
          let x = this.bills[i].totalSale;
          console.log(x);
          f= x + f;
        }
        for (let i = 0; i < l; i++) {
          let x = this.bills[i].totalSave;
          console.log(x);
          g = x + g;
        }
      
        this.set = e;
        this.set1 = g;
        this.set2 = f;
        console.log(this.set);
      }
      // console.log(d);
      // this.bills = d;
    })
  }

  searchBills() {
    this.set=0;
    this.set1=0;
    this.set2=0;
    let e=0;
 let f=0;
 let g=0;
    this.api.getBills().subscribe(res => {
      this.daily = res;
      console.log(this.model);
      let d = this.daily.filter((elem => {
        console.log(new Date(elem.date));
        let y = new Date(elem.date);
       
        let u = { year: y.getFullYear(), month: y.getMonth() + 1, day: y.getDate() };
        console.log(u);

        return u.year == this.year && u.month == this.month ;
      }));
      if (d[0] == undefined) {
        console.log("okay");
        this.bills = res;
        console.log(this.bills);
      }
      else {
        this.bills = d;
        console.log(this.bills);
        let l = this.bills.length;
        for (let i = 0; i < l; i++) {
          let x = this.bills[i].totalActual;
          console.log(x);
          e = x + e;
        }
        for (let i = 0; i < l; i++) {
          let x = this.bills[i].totalSale;
          console.log(x);
          f = x + f;
        }
        for (let i = 0; i < l; i++) {
          let x = this.bills[i].totalSave;
          console.log(x);
          g = x + g;
        }
        this.set = e;
        this.set1 = g;
        this.set2 = f;
        console.log(this.set);
      }
      
    })
    // this.daysInMonth(this.month, this.year);

    // this.viewOrder();
  }
  filterCondition(product) {
    return product._id.toLowerCase().indexOf(this.searchText.toLowerCase()) != -1;
  }
  selectChangeHandler(event: any) {
    this.val = event.target.value;
    console.log(this.val);
    if (this.val == 'jan') {
      this.month = 1;
    }
    else if (this.val == 'feb') {
      this.month = 2;
    }
    else if (this.val == 'mar') {
      this.month = 3;
    }
    else if (this.val == 'apr') {
      this.month = 4;
    }
    else if (this.val == 'may') {
      this.month = 5;
    }
    else if (this.val == 'jun') {
      this.month = 6;
    }
    else if (this.val == 'jul') {
      this.month = 7;
    }
    else if (this.val == 'aug') {
      this.month = 8;
    }
    else if (this.val == 'sep') {
      this.month = 9;
    }
    else if (this.val == 'oct') {
      this.month = 10;
    }
    else if (this.val == 'nov') {
      this.month = 11;
    }
    else if (this.val == 'dec') {
      this.month = 12;
    }
    console.log(this.month);
  }
  selectChangeHandler1(event: any) {
    this.val2 = event.target.value;
    console.log(this.val2);
    if (this.val2 == '2019') {
      this.year = 2019;
    }
    
    else if (this.val2 == '2018') {
      this.year = 2018;
    }
    else if (this.val2 == '2020') {
      this.year = 2020;
    }
    else if (this.val2 == '2020') {
      this.year = 2020;
    }
    else if (this.val2 == '2021') {
      this.year = 2021;
    }
    else if (this.val2 == '2022') {
      this.year = 2022;
    }
    else if (this.val2 == '2023') {
      this.year = 2023;
    }
    else if (this.val2 == '2024') {
      this.year = 2024;
    }
    else if (this.val2 == '2025') {
      this.year = 2025;
    }
    else if (this.val2 == '2026') {
      this.year = 2026;
    }
    else if (this.val2 == '2027') {
      this.year = 2027;
    }
    else if (this.val2 == '2028') {
      this.year = 2028;
    }
    else if (this.val2 == '2029') {
      this.year = 2029;
    }
    else if (this.val2 == '2030') {
      this.year = 2030;
    }
    else if (this.val2 == '2031') {
      this.year = 2031;
    }
    else if (this.val2 == '2032') {
      this.year = 2032;
    }
    else if (this.val2 == '2033') {
      this.year = 2033;
    }
    else if (this.val2 == '2034') {
      this.year = 2034;
    }
    else if (this.val2 == '2035') {
      this.year = 2035;
    }
    else if (this.val2 == '2036') {
      this.year = 2036;
    }
    else if (this.val2 == '2037') {
      this.year = 2037;
    }
    else if (this.val2 == '2038') {
      this.year = 2038;
    }
    else if (this.val2 == '2039') {
      this.year = 2039;
    }
    else if (this.val2 == '2040') {
      this.year = 2040;
    }
    console.log(this.year);
  }
}
