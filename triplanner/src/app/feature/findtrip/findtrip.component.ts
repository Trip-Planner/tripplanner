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
  constructor(private router: Router, private _dataService: DataService, private route: ActivatedRoute) { }
  finding: string;
  ngOnInit() {
    this.plan = [];
  }
  findplan() {
    this.findbyplanname();
    this.findbyactiname();
    this.findbyusername();
    console.log(this.plan);
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
