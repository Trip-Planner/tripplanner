import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status: string
  username: string
  password: string
  temp: string
  constructor(private router: Router, private _dataService: DataService) { }
  ngOnInit() {
    this.status = "initial";
    this.username = "";
    this.password = "";
  }
  submit() {
    this._dataService.login(this.username, this.password)
      .subscribe(res => {
        this.temp = res
        if (this.temp != null)
          this.router.navigate(['/home']);
        else
          this.status = "";
        this.username = "";
        this.password = "";
      });


  }

}
