import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-deleteplan',
  templateUrl: './deleteplan.component.html',
  styleUrls: ['./deleteplan.component.css']
})
export class DeleteplanComponent implements OnInit {
  status: string;
  constructor(private router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this.status = 'waiting';
  }
  remove() {
    this._dataService.deleteplan("7").subscribe(res => {
      this.status = res;
    })
  }
}
