import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import {ActivatedRoute,RouterLink,Router} from '@angular/router'
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
  isAlert:boolean;
  isHide:boolean;
  isActCreate:boolean[];
  dayShow:boolean[];
  act_temp:string;
  now:string;
  days:dayPlanning[];
  status1:string;
  status2:string;
  constructor(private router: Router,private _dataService:DataService,private route: ActivatedRoute) { }

  ngOnInit() {
    var date = new Date();
  this.now =  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  this.tripName='';
  this.departDate='';
  this.returnDate='';
  this.resultDate=+'';
  this.isSubmit= false;
  this.isAlert=false;
  this.isHide=false;
  this.isActCreate=[false];
  this.dayShow=[true];
  this.status1="";

  this.act_temp="";

  
  this.days=[];
  }

  dayShowing(num:number,end:number)
  {
    for ( var i = 0;i < end ;i++)
    {
      this.dayShow[i]=false;
    }
    this.dayShow[num]=true;

  }

 /*  onSearch() {
    var name = this.tripName;
    var depdate = this.departDate;
    var retdate = this.returnDate;
    this.router.navigate(['/generateplan',name,depdate,retdate]); 
  } */

  addActs(act:string,time:string,detail:string,j:number){
    
    
    if(time!=""&&detail!=""&&detail!=undefined)
    {
      this.isActCreate[j]=false;
      this.status2="";
    }
    else
    {
      return this.status2="Please Fill All Information"
    }
    this.days[j].acts.push(act);
    this.days[j].times.push(time);
    this.days[j].details.push(detail);


    for (var i = 0 ;i< this.days[j].acts.length-1;i++)
    { 
      for (var k = 0; k < this.days[j].acts.length-1-i ;k++)   
      {
        if(this.days[j].times[k]>=this.days[j].times[k+1])
        {
        var temp = this.days[j].times[k];
        this.days[j].times[k] = this.days[j].times[k+1];
        this.days[j].times[k+1] = temp;
         }
      }
    }

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
  calculateDate(){
    //departDate
    if(this.departDate!=""&&this.tripName!=""&&this.returnDate!="")
    {
      this.isSubmit =true;
    }
    else
    {
      this.status1="Please Fill All Information"
    }
    var year  = this.departDate.slice(0,4),
        month = this.departDate.slice(5,7),
        day   = this.departDate.slice(8,10);

    //temporary (only use for test)
    var  total = ( Number(year)*365)+(this.calculateMonth(Number(month)))+(Number(day));

      //returnDate
      var year2  = this.returnDate.slice(0,4),
      month2 = this.returnDate.slice(5,7),
      day2   = this.returnDate.slice(8,10);
      
       //temporary (only use for test)
       var  total2 = ( Number(year2)*365)+( this.calculateMonth(Number(month2)))+(Number(day2));

      this.resultDate = total2-total+1; 

      for(var x =1;x< this.resultDate;x++)
      {
        this.dayShow[x]=false;
      }

    if (this.resultDate < 0)
    {
      this.isAlert=true;
    }
    else
    this.days =this.createDay(this.resultDate);

     return(console.log(total+" "+total2+" "+this.resultDate));

  }
    calculateMonth (m:number){
    {
    switch (m){
        case 1:
          return Number(31);  
        case 2:
          return Number(31+28);
        case 3:
          return Number(31+28+31);
        case 4:
          return Number(31+28+31+30);     
        case 5:
          return Number(31+28+31+30+31);
        case 6:
          return Number(31+28+31+30+31+30);
        case 7:
          return Number(31+28+31+30+31+30+31);
        case 8:
          return Number(31+28+31+30+31+30+31+31);
        case 9:
          return Number(31+28+31+30+31+30+31+31+30);   
        case 10:
         return  Number(31+28+31+30+31+30+31+31+30+31);
        case 11:
          return Number(31+28+31+30+31+30+31+31+30+31+30);   
        case 12:
          return Number(31+28+31+30+31+30+31+31+30+31+30+31);
      }
    }
    
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

  //function ยืนยัน generate
  confirm(){  
    this._dataService.createplan(this.tripName,this.departDate,this.returnDate)
    .subscribe(res => {
       console.log(res);     
      for(var i = 0; i < this.resultDate;i++)
      {
        for(var j =0; j < this.days[i].acts.length; j++)  
        {

          this._dataService.putplandetail(res,this.days[i].times[j],this.departDate,"type",this.days[i].details[j],this.days[i].acts[j]).subscribe(res =>{
            
       });    
      }
    }

    });
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


