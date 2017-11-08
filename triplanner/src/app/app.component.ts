import { Component } from '@angular/core';
import { DataService } from './data.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  user = new user();
  users:Array<any>
  constructor(private _dataService:DataService){
  //   this._dataService.getUsers()
    this._dataService.login()
      .subscribe(res => {
      console.log(res)
      return this.users =res});
  
    this._dataService.getSession("111")
         .subscribe(res => {
           console.log(res)
           return this.users =res});
  //     .subscribe(res => {
  //       console.log(res)
  //       return this.users =res});
  }
  submit(){
    for (var item of this.users) {
      if(item.username == this.user.id)
        if(item.password == this.user.pw)
        return console.log("login sucess");
    }
    console.log("wrong password")
  }


}
export class user{

  
  public id:string
  public pw:string
  constructor(){
    this.id='';
    this.pw='';
  }
  
}
