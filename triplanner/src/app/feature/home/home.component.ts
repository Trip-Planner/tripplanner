import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import {Http} from '@angular/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,private _dataService:DataService) { }

  ngOnInit() {
  }

  logout(){
  this._dataService.logout()
  .subscribe(res => {
    if(res == 'done')
    this.router.navigate(['/login']);
  });
  }
}
