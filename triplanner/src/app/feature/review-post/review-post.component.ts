import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-review-post',
  templateUrl: './review-post.component.html',
  styleUrls: ['./review-post.component.css']
})
export class ReviewPostComponent implements OnInit {
  plan: any;
  showed_plan_name = "";
  showed_startdate = "";
  showed_enddate = "";
  showed_plan_id = "";
  showed: boolean;
  review_point: number;
  act: any;
  status = " ";
  constructor(private router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getnotreviewplan().subscribe(res => {
      this.plan = res;
      this.showed = true;
    });
  }
  chooseplan(i: number) {
    this.showed_plan_name = this.plan[i].plan_name;
    this.showed_startdate = this.plan[i].startdate;
    this.showed_enddate = this.plan[i].enddate;
    this.showed_plan_id = this.plan[i].plan_id;
    this.showed = false;
    this._dataService.getplandetail(this.showed_plan_id).subscribe(res => {

      this.act = res;
    });
  }
  review() {
    // console.log(this.review_point)
    if (this.review_point <= 5 && this.review_point >= 0)
      this._dataService.setreviewplan(this.showed_plan_id, this.review_point.toString()).subscribe(res => {
        this.ngOnInit();
      })
    else
      this.status = "review 0-5"
  }
}