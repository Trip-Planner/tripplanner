import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router'
/* import {Http} from '@angular/http'; */


@Component({
  selector: 'app-createplan',
  templateUrl: './createplan.component.html',
  styleUrls: ['./createplan.component.css']
})
export class CreateplanComponent implements OnInit {

  tripName: string;
  departDate: string;
  returnDate: string;
  resultDate: number;
  isSubmit: boolean;
  isAlert: boolean;
  isHide: boolean;
  isActCreate: boolean[];
  dayShow: boolean[];
  act_temp: string;
  now: string;
  days: dayPlanning[];
  status1: string;
  status2: string;

  total: number;

  a:string;

  activities: any;
  act_pic:string;


  constructor(private router: Router, private _dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {



    this._dataService.getactivity()
    .subscribe(res => {
      // console.log(res);
      this.activities = res;

  
    });


    var date = new Date();
    this.now = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    this.tripName = '';
    this.departDate = '';
    this.returnDate = '';
    this.resultDate = +'';
    this.isSubmit = false;
    this.isAlert = false;
    this.isHide = false;
    this.isActCreate = [false];
    this.dayShow = [true];
    this.status1 = "";
    this.act_temp = "";

    this.a = ""

    this.days = [];





  }

  dayShowing(num: number, end: number) {
    for (var i = 0; i < end; i++) {
      this.dayShow[i] = false;
    }
    this.dayShow[num] = true;

  }

  addActs(act: string, time: string, detail: string, j: number) {


    if (time != "" && detail != "" && detail != undefined) {
      this.isActCreate[j] = false;
      this.status2 = "";
    }
    else {
      return this.status2 = "Please Fill All Information"
    }
    this.days[j].acts.push(act);
    this.days[j].times.push(time);
    this.days[j].details.push(detail);


    for (var i = 0; i < this.days[j].acts.length - 1; i++) {
      for (var k = 0; k < this.days[j].acts.length - 1 - i; k++) {
        if (this.days[j].times[k] >= this.days[j].times[k + 1]) {
          var temp = this.days[j].times[k];
          this.days[j].times[k] = this.days[j].times[k + 1];
          this.days[j].times[k + 1] = temp;

          temp = this.days[j].acts[k];
          this.days[j].acts[k] = this.days[j].acts[k + 1];
          this.days[j].acts[k + 1] = temp;


          temp = this.days[j].details[k];
          this.days[j].details[k] = this.days[j].details[k + 1];
          this.days[j].details[k + 1] = temp;
          
        }
      }
    }

    return false;

  }
  /* still not perfect** */
  removeActs(i: number, j: number) {

    this.days[j].acts.splice(i, 1);
    this.days[j].times.splice(i, 1);
    this.days[j].details.splice(i, 1);

    return false;
  }

  //หาจำนวนวัน พร้อมเรียกใช้ฟังก์ชันcreateDay
  calculateDate() {
    //departDate
    //console.log("1st check")
    if (this.departDate != "" && this.tripName != "" && this.returnDate != "") {
      this.isSubmit = true;
    }
    else {
      this.status1 = "Please Fill All Information"
    }
    //console.log("2nd check")


    var year = this.departDate.slice(0, 4),
      month = this.departDate.slice(5, 7),
      day = this.departDate.slice(8, 10);

    //temporary (only use for test)
    var total = (Number(year) * 365) + (this.calculateMonth(Number(month))) + (Number(day));
    this.total = total
    //returnDate
    var year2 = this.returnDate.slice(0, 4),
      month2 = this.returnDate.slice(5, 7),
      day2 = this.returnDate.slice(8, 10);
    //---------------------------------------------


    //-----------------------------------------------

    //temporary (only use for test)
    var total2 = (Number(year2) * 365) + (this.calculateMonth(Number(month2))) + (Number(day2));

    this.resultDate = total2 - total + 1;

    //console.log("3th check")
    //console.log(total+" "+total2+" "+this.resultDate);

    for (var x = 1; x < this.resultDate; x++) {
      this.dayShow[x] = false;
    }

    if (this.resultDate < 0) {
      this.isAlert = true;
    }
    else
      this.days = this.createDay(this.resultDate, Number(year), Number(month), Number(day));

    //console.log("4th check")
    return (total + " " + total2 + " " + this.resultDate);

  }
  calculateMonth(m: number) {
    {
      switch (m) {
        case 2:
          return Number(31);
        case 3:
          return Number(31 + 28);
        case 4:
          return Number(31 + 28 + 31);
        case 5:
          return Number(31 + 28 + 31 + 30);
        case 6:
          return Number(31 + 28 + 31 + 30 + 31);
        case 7:
          return Number(31 + 28 + 31 + 30 + 31 + 30);
        case 8:
          return Number(31 + 28 + 31 + 30 + 31 + 30 + 31);
        case 9:
          return Number(31 + 28 + 31 + 30 + 31 + 30 + 31 + 31);
        case 10:
          return Number(31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30);
        case 11:
          return Number(31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31);
        case 12:
          return Number(31 + 28 + 31 + 30 + 31 + 30 + 31 + 31 + 30 + 31 + 30);
        /*  case 12:
           return Number(31+28+31+30+31+30+31+31+30+31+30+31); */
        default:
          return 0;
      }
    }

  }

  //สร้างarray object day[] ตามจำนวนวัน 
  createDay(n: number, year: number, month: number, d: number) {
    var day = new Array(n)
    for (var i = 0; i < n; ++i) {
      day[i] = new dayPlanning();
      this.isActCreate[i] = false;

      //check day > max
      if ((month == 1 || month == 3 || month == 5 || month == 6 || month == 8 || month == 10 || month == 12)) {
        if (d > 31) {
          month = (month + 1);
          d = 1;
        }
      }
      else if (month == 2) {
        if (year % 4 == 0) {
          if (d > 29) {
            month = (month + 1);
            d = 1;
          }
        }
        else {
          if (d > 28) {
            (month = month + 1);
            d = 1;
          }
        }
      }
      else {
        if (d > 30) {
          month = month + 1;
          d = 1;
        }

      }
      //check month > max
      if (month > 12) {
        month = 1
        year = year + 1
      }

      day[i].thatDate = year + "-" + month + "-" + d
      d++

      //console.log("check"+day[i].thatDate)

    }
    return day;
  }

  //function ยืนยัน generate
  confirm() {
    this._dataService.createplan(this.tripName, this.departDate, this.returnDate)
      .subscribe(res => {
        //console.log(res);     
        for (var i = 0; i < this.resultDate; i++) {
          for (var j = 0; j < this.days[i].acts.length; j++) {

            this._dataService.putplandetail(res, this.days[i].times[j], String(this.days[i].thatDate), "type", this.days[i].details[j], this.days[i].acts[j]).subscribe(res => {

            });
          }
        }

        this.router.navigate(['/editplan']);

      });
  }

  navigateToHome() {

    this.router.navigate([' /editplan'])
  }

   getActivity(act:string){
     console.log(this.activities + this.activities.length)
     console.log("act = "+act)
    for(var i =0;i <=this.activities.length;i++)
    {
      if(act == this.activities[i].type )
      {
     /*  this.act_pic = "../../"+this.activities[i].icon */
    /*  return "../../"+this.activities[i].icon  */
    return "../../"+this.activities[i].icon
    } 
   else console.log("NO  NO NO NO")
    }






  }
}



//คลาสของ planning
class dayPlanning {

  act_temp: string;
  acts: string[];
  times: string[];
  details: string[];
  thatDate: string;


  constructor() {
    this.act_temp = "";
    this.acts = [];
    this.times = [];
    this.details = [];
    this.thatDate = "";
  }
}


