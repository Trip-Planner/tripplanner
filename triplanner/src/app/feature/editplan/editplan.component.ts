import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router'

@Component({
  selector: 'app-editplan',
  templateUrl: './editplan.component.html',
  styleUrls: ['./editplan.component.css']
})
export class EditplanComponent implements OnInit {
  coplan=[];
  plan: any
  days_data: any
  plan_id: string

  tripName: string;
  departDate: string;
  returnDate: string;
  resultDate: number;
  total: number;
  index_temp: string;
  isHide: boolean;
  isEdit: boolean;
  isDelete: boolean;
  isSubmit: boolean;
  isCoplanning: boolean;
  showPlan: boolean;
  removeDay:boolean;
  plan_index: number;

  delete_temp: string;

  co_username: string;


  isActCreate: boolean[];
  dayShow: boolean[];
  act_temp: string;
  days: dayPlanning[];
  status1: string;
  status2: string;

  year: string;
  month: string;
  day: string

  activities:any

  constructor(private router: Router, private _dataService: DataService, private route: ActivatedRoute) { }

  ngOnInit() {

    this._dataService.getactivity()
    .subscribe(res => {
      // console.log(res);
      this.activities = res;

  
    });
    this.tripName = '';
    this.departDate = '';
    this.returnDate = '';
    this.resultDate = +'';
    this.isSubmit = false;
    this.isEdit = false;
    this.isDelete = false;
    this.isCoplanning = false;
    this.showPlan = false;
    this.removeDay = true;
    /*  this.isAlert=false; */
    this.isHide = false;
    this.isActCreate = [false];
    this.dayShow = [true];
    this.status2 = "";
    this.status1 = "";
    this.plan_index = 0;
    this.act_temp = "";
    this.total = +'';
    this.co_username = "";
    this.coplan=[];
    this.days = [];



    //get data
    this._dataService.getuserplan().subscribe(res => {
      this.plan = res;

    })
    this._dataService.getcoplan().subscribe(res=>{
      if (res[0] != null)
      res.forEach(temp => {
          this._dataService.getplan(temp.plan_id).subscribe(res => {
            this.coplan.push(res[0]);
          })
      })
      //
    })
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


  calculateDate() {
    //departDate
    if (this.departDate != "" && this.tripName != "" && this.returnDate != "") {
      this.isSubmit = true;
    }
    else {
      this.status1 = "Please Fill All Information"
    }
    this.year = this.departDate.slice(0, 4),
      this.month = this.departDate.slice(5, 7),
      this.day = this.departDate.slice(8, 10);

    //temporary (only use for test)
    this.total = (Number(this.year) * 365) + (this.calculateMonth(Number(this.month))) + (Number(this.day));

    //returnDate
    var year2 = this.returnDate.slice(0, 4),
      month2 = this.returnDate.slice(5, 7),
      day2 = this.returnDate.slice(8, 10);

    //temporary (only use for test)
    var total2 = (Number(year2) * 365) + (this.calculateMonth(Number(month2))) + (Number(day2));

    this.resultDate = total2 - this.total + 1;



    for (var x = 1; x < this.resultDate; x++) {
      this.dayShow[x] = false;
    }

    /* if (this.resultDate < 0)
    {
      this.isAlert=true;
    }
    else */
    //date show

    return (this.total + " " + total2 + " " + this.resultDate);

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

  /* createDay(n) {
    var day = new Array(n)
    for (var i = 0; i < n; ++i) {
      day[i] = new dayPlanning();
      this.isActCreate[i]=false;
  
    }
    return day;
  } */


  Co_Confirm() {
    //console.log("CO DONE")
    this._dataService.getuserid(this.co_username).subscribe(result=>{
        if(result[0] != null )
        this._dataService.setcoplan(result[0].user_id,this.plan_id).subscribe(res=>{
          if(res == 'done')
            console.log("done")
          else if(res == 'have already')
            console.log("already co with this id")
        })
        else
        console.log("no this user")
      })
   
    this.ngOnInit()


  }


  confirm() {

    this._dataService.deleteplan(this.days_data[0].plan_id).subscribe(res => {
      // console.log(res);
      for (var i = 0; i < this.days_data.length; i++) {
        //console.log(this.days_data.length);
        this._dataService.deleteplandetail(this.days_data[i].acti_id).subscribe(res => {
        });
      }
      //console.log("test");
    })

    this._dataService.createplan(this.tripName, this.departDate, this.returnDate)
      .subscribe(res => {
        // console.log(res);
        for (var i = 0; i < this.resultDate; i++) {
          if (this.days[i] == null) {

          }
          else {
            for (var j = 0; j < this.days[i].acts.length; j++) {

              // console.log("HERE" + this.days[i].thatDate + "type" + this.days[i].details[j] + this.days[i].acts[j])
              this._dataService.putplandetail(res, this.days[i].times[j], String(this.days[i].thatDate), "type", this.days[i].details[j], this.days[i].acts[j]).subscribe(res => {

              });
            }
          }
        }

        this.ngOnInit()
      });

  }

  moveToPlandetail(plan_id: string, index: string) {
    this.plan_id = plan_id;
    console.log(plan_id);
    this.index_temp = index;
    var plan: any;
    this._dataService.getplan(plan_id).subscribe(res => {
      this.tripName = res[0].plan_name;
      this.departDate = res[0].startdate;
      this.returnDate = res[0].enddate;
    })
    this._dataService.getplandetail(plan_id).subscribe(res => {
      this.days_data = res;
      //this.plan_index = 0;
      //nsole.log(res)
      if (res[0] == null)
        return 0;
      for (var i = 0; i <= this.plan.length; i++) {
       // if (res[0].plan_id == this.plan[i].plan_id) {
          //console.log(this.plan_index)
         // break;
       // }
      //  this.plan_index++;
      }



      //console.log(this.plan)
      //console.log(this.tripName)
      //console.log(this.departDate)
      //console.log(this.returnDate)


      var temp_date = this.calculateDate()




      var temp = 0;
      var day_index = 0;
      this.days[day_index] = new dayPlanning();
      this.isActCreate[day_index] = false;

      this.days[day_index].acts.push(res[temp].activityname)
      this.days[day_index].times.push(res[temp].starttime);
      this.days[day_index].details.push(res[temp].detail);


      this.days[day_index].thatDate = res[temp].date;

      //console.log("days = " + this.days[day_index].acts);
      //console.log("days = " + this.days[day_index].times);
      //console.log("days = " + this.days[day_index].details);
      //console.log("days = " + this.days[day_index].thatDate);


      for (var x = 0; x < res.length - 1; x++) {
        if (res[x].date == res[x + 1].date) {

          ;
        }
        else {
          day_index++;
          this.days[day_index] = new dayPlanning();
          this.isActCreate[day_index] = false;
          /*  this.getDate(day_index); */


        }

        temp++;
        this.days[day_index].thatDate = (res[temp].date);
        this.days[day_index].acts.push(res[temp].activityname)
        this.days[day_index].times.push(res[temp].starttime);
        this.days[day_index].details.push(res[temp].detail);


        this.showPlan=true;
        this.removeDay=false;

        //console.log("days = " + this.days[day_index].acts);
        // console.log("days = " + this.days[day_index].times);
        // console.log("days = " + this.days[day_index].details);
        // console.log("days = " + this.days[day_index].thatDate);

      }

    })
  }

  deletePlan(delete_temp: string) {
    this._dataService.deleteplan(delete_temp).subscribe(res => {
      //console.log(res);
      for (var i = 0; i < this.days_data.length; i++) {
        // console.log(this.days_data.length);
        this._dataService.deleteplandetail(this.days_data[i].acti_id).subscribe(res => {
        });
      }
      //console.log(delete_temp);
      this.ngOnInit()
    })

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