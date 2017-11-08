import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import {Http} from '@angular/http';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  islogin:boolean;
  constructor(private router: Router) { }

  ngOnInit() {
    
  }
  submit(){
    this.islogin=true;
    this.router.navigate(['/register']);
  }

}
