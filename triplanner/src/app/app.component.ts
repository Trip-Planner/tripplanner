import { Component } from '@angular/core';
import { DataService } from './data.service';
import {Http} from '@angular/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  status:string;
  constructor(private _dataService:DataService,private router: Router){
    this._dataService.getSession()
    .subscribe(res => {
      this.status = res});
    if(this.status != null)
      this.router.navigate(['/createplan']);
    else
      this.router.navigate(['']);
  }
}

