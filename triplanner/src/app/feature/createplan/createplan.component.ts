import { Component, OnInit } from '@angular/core';
/* import {Http} from '@angular/http'; */


@Component({
  selector: 'app-createplan',
  templateUrl: './createplan.component.html',
  styleUrls: ['./createplan.component.css']
})
export class CreateplanComponent implements OnInit {

  tripName:string;
  departDate:string;
  returnDate:string;
  resultDate:number;
  isSubmit:boolean;
  isActCreate:boolean[];
  isAlert:boolean;
  
  act_temp:string;
  acts:string[];
  times:string[];
  details:string[];

  days:dayPlanning[];
  
  constructor() { }

  ngOnInit() {

  this.tripName='';
  this.departDate='';
  this.returnDate='';
  this.resultDate=+'';
  this.isSubmit= false;
  this.isActCreate=[false];
  this.isAlert=false;

  this.act_temp="";
  this.acts=[];
  this.times=[];
  this.details=[];

  this.days=[];
  }

  


  addActs(act:string,time:string,detail:string,j:number){
    this.days[j].acts.push(act);
    this.days[j].times.push(time);
    this.days[j].details.push(detail);
    return false;


  }
  /* still not perfect** */
  removeActs(i:number,j:number){

    this.days[j].acts.splice(i,1);
    this.days[j].times.splice(i,1);
    this.days[j].details.splice(i,1);
    return false;
  }

  //หาจำนวนวัน พร้อมเรียกใช้ฟังก์ชันcreateDay
  calculateDate(departDate:string,returnDate:string){
    //departDate
    var year  = departDate.slice(0,4),
        month = departDate.slice(5,7),
        day   = departDate.slice(8,10);

    //temporary (only use for test)
    var  total = ( Number(year)*365)+( Number(month)*31)+(Number(day));

  /*   //not perfect yet
    if(month =='4' || month == '6'|| month == '9'||month == '11'){

        var  total =   ( Number(year)*365)+( Number(month)*30)+(Number(day));
      }
      else if(month =='2'){
        var  total =   ( Number(year)*365)+( Number(month)*28)+(Number(day));
      }
      else{
        var  total =   ( Number(year)*365)+( Number(month)*31)+(Number(day));
      }
 */

      //returnDate
      var year2  = returnDate.slice(0,4),
      month2 = returnDate.slice(5,7),
      day2   = returnDate.slice(8,10);
      
       //temporary (only use for test)
       var  total2 = ( Number(year2)*365)+( Number(month2)*31)+(Number(day2));

/*       //not perfect yet
    if(month2 =='4' || month2 == '6'|| month2 == '9'||month2 == '11'){

        var  total2 =   ( Number(year2)*365)+( Number(month2)*30)+(Number(day2));
      }
      else if(month =='2'){
        var  total2 =   ( Number(year2)*365)+( Number(month2)*28)+(Number(day2));
      }
      else{
        var  total2 =   ( Number(year2)*365)+( Number(month2)*31)+(Number(day2));
      }
      */


      this.resultDate = total2-total+1; 

    if (this.resultDate < 0)
    {
      this.isAlert=true;

    }
    else
    this.days =this.createDay(this.resultDate);

     return(console.log(total+" "+total2+" "+this.resultDate));

  }
    //สร้างarray object day[] ตามจำนวนวัน 
    createDay(n) {
    var day = new Array(n)
    for (var i = 0; i < n; ++i) {
      day[i] = new dayPlanning();
      this.isActCreate[i]=false;
  
    }
    return day;
  }
}

//คลาสของ planning
class dayPlanning {

  act_temp:string;
  acts:string[];
  times:string[];
  details:string[];

  constructor() {
    this.act_temp="";
    this.acts=[];
    this.times=[];
    this.details=[];

  }
}


