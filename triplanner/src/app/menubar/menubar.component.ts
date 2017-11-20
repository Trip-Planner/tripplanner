import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  status: string;
  constructor(private router: Router, private _dataService: DataService) { }

  ngOnInit() {
    this.status = null
  }

  canlink(temp: string) {
    this.router.navigate([temp]);

    /*    this._dataService.getSession()
       .subscribe(res => {
         this.status = res
         if(this.status != null)
         this.router.navigate([temp]);
         else
         this.router.navigate(['']);
       }); */

  }
}
