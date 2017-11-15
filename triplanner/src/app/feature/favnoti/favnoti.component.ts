import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-favnoti',
  templateUrl: './favnoti.component.html',
  styleUrls: ['./favnoti.component.css']
})
export class FavnotiComponent implements OnInit {
  plan: any;
  fav=[];
  constructor(private router: Router, private _dataService: DataService) { }
//{{getusername(fav.user_id)}} like {{getplanname(fav.plan_id)}} at {{fav.time}}
  ngOnInit() {
    this._dataService.getuserplan().subscribe(res => {
      this.plan = res
      this.plan.forEach(element => {
        
        this._dataService.getfavorite(element.plan_id).subscribe(res => {
          if(res[0]!=null)
          res.forEach(temp => {
            if(temp.status!="false")
            {
              this._dataService.getplan(temp.plan_id).subscribe(res =>{
                temp.plan_id= res[0].plan_name;
              })
              this._dataService.getuserdetail(temp.user_id).subscribe(res =>{
                temp.user_id= res[0].username;
              })
              this.fav.push(temp);
            }
          })
        })
      });
    })
  }
 
}
