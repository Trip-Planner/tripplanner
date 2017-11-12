import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Http } from '@angular/http';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  status: string
  username: string
  password: string
  password2: string
  email: string
  constructor(private router: Router, private _dataService: DataService) {
  }

  ngOnInit() {
    this.status = 'initial';
    this.username = "";
    this.password = "";
    this.password2 = "";
    this.email = "";
  }

  submit() {
    if (this.username != "" && this.password != "" && this.password2 != "" && this.email != "") {
      if (this.password == this.password2) {
        this._dataService.register(this.username, this.password, this.email)
          .subscribe(res => {
            if (res != null)
              this.router.navigate(['/login']);
            else
              this.status = "";
            this.username = "";
            this.password = "";
            this.password2 = "";
            this.email ="";
          });
      }
      else {
        this.status = "Password not Match";
        this.password = "";
        this.password2 = "";
      }
    }
    else {
      this.status = "Please Fill All Section";
    }
  }
}