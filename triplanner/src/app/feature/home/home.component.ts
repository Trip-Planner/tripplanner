import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  status: string;
  plan: any;
  user: any;
  act: any;
  fav: any;
  show_user: any;
  show_planname = "";
  show_planid = "";
  show_userid = "";
  show_startdate = "";
  show_enddate = "";
  show_favorite = "";
  review_point = "";
  isShow = false;
  constructor(private router: Router, private _dataService: DataService) { }

  canlink(temp: string) {
    this.router.navigate([temp]);
  } 
  ngOnInit() {
    this._dataService.getreviewplan().subscribe(res => {
      this.plan = res;
    })
    this._dataService.getUsers().subscribe(res => {
      this.user = res;
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
  logout() {
    this._dataService.logout()
      .subscribe(res => {
        if (res == 'done')
          this.router.navigate(['/login']);
      });
  }
}
