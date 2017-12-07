import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { ActivatedRoute, RouterLink, Router } from '@angular/router'

@Component({
  selector: 'app-findtrip',
  templateUrl: './findtrip.component.html',
  styleUrls: ['./findtrip.component.css']
})
export class FindtripComponent implements OnInit {
  plan = [];
  review_plan = [];
  havealready = false;
  show_planname = "";
  show_planid = "";
  show_userid = "";
  show_startdate = "";
  show_enddate = "";
  show_favorite = "";
  review_point = "";
  isShow = false;
  user: any;
  act: any;
  fav: any;
  show_user: any;
  constructor(private router: Router, private _dataService: DataService, private route: ActivatedRoute) { }
  finding: string;
  ngOnInit() {
    this.plan = [];
    this.review_plan = [];
    this.isShow =false;
    this._dataService.getUsers().subscribe(res => {
      this.user = res;
    })
  }
  findplan() {
    this.isShow = false;
    this.plan = [];
    this.review_plan = [];
    this.findbyplanname();
    this.findbyactiname();
    this.findbyusername();
  }
  findbyplanname() {
    this._dataService.searchplanname(this.finding).subscribe(res => {
      if (res[0] != null) {
        this.addplan(res[0]);
      }
    })
  }

  findbyactiname() {
    this._dataService.getreviewplan().subscribe(res => {
      this.review_plan = res;
    })
    this._dataService.searchactiname(this.finding).subscribe(res => {
      if (res[0] != null) {
        this.review_plan.forEach(temp => {
          res.forEach(element => {
            if (temp.plan_id == element.plan_id)
              if (temp.plan_status == 'done')
                this.addplan(temp);
          });
        });
      }
    })
  }

  findbyusername() {
    this._dataService.searchname(this.finding).subscribe(res => {
      
      if (res[0] != null) {
        this._dataService.getreviewplanformuserid(res[0].user_id).subscribe(res1 => {
          if (res1[0] != null) {
            res1.forEach(element => {
              this.addplan(element);
            });
          }
        })
      }
    })
  }
  showdetail(i: number) {
    this.isShow = true;
    this.show_planname = this.plan[i].plan_name;
    this.show_planid = this.plan[i].plan_id;
    this.show_userid = this.plan[i].user_id;
    this.show_startdate = this.plan[i].startdate;
    this.show_enddate = this.plan[i].enddate;
    this.show_favorite = this.plan[i].favorite;
    this.review_point = this.plan[i].review_point;
    this._dataService.getplandetail(this.plan[i].plan_id).subscribe(res => {
      this.act = res;
    })
    this._dataService.getuserdetail(this.plan[i].user_id).subscribe(res => {
      this.show_user = res;
    })
  }
  favorite() {
    var date = new Date();
    var now = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);;
    this._dataService.getfavoritedetail(this.show_planid).subscribe(res => {
      this.fav = res;
      if (this.fav[0] == null)
        this._dataService.favorite(this.show_planid, now).subscribe(res => {
        })
      else if (this.fav[0].status == 'false')
        this._dataService.addfavorite(this.show_planid, now).subscribe(res => {
        })
      else if (this.fav[0].status == 'true')
        this._dataService.delfavorite(this.show_planid).subscribe(res => {
        })
      this._dataService.getreviewplan().subscribe(res => {
        this.plan = res;
      })
      this._dataService.getplan(this.show_planid).subscribe(res => {
        this.show_planname = res[0].plan_name;
        this.show_planid = res[0].plan_id;
        this.show_userid = res[0].user_id;
        this.show_startdate = res[0].startdate;
        this.show_enddate = res[0].enddate;
        this.show_favorite = res[0].favorite;
        this.review_point = res[0].review_point;
      })

    })
  }

  addplan(plan: any) {
    this.havealready = false
    this.plan.forEach(element => {
      if (plan.plan_id == element.plan_id)
        this.havealready = true;
    });
    if (this.havealready == false)
      this.plan.push(plan);
  }
}
