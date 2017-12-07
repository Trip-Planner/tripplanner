import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(private router: Router, private _dataService: DataService) { }
  
    canlink(temp: string) {
      this.router.navigate([temp]);
    } 
    
    ngOnInit() {
      this._dataService.getUsers().subscribe(res => {
        this.user = res;
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
