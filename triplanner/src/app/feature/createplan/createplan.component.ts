import { Component, OnInit } from '@angular/core';
/* import {Http} from '@angular/http'; */

@Component({
  selector: 'app-createplan',
  templateUrl: './createplan.component.html',
  styleUrls: ['./createplan.component.css']
})
export class CreateplanComponent implements OnInit {

  tripName:string;
  departDate:string;
  returnDate:string;
  isSubmit:boolean;
  isActCreate:boolean;
  
  act_temp:string;
  acts:string[];
  times:string[];
  details:string[];
  


  constructor() { }

  ngOnInit() {

  this.tripName='';
  this.departDate='';
  this.returnDate='';
  this.isSubmit= false;
  this.isActCreate=false;

  this.act_temp="";
  this.acts=[];
  this.times=[];
  this.details=[];



  }

fuction(name:string){

  console.log("test called fuction");
  return false;
}

addActs(act,time,detail){
  this.acts.push(act);
  this.times.push(time);
  this.details.push(detail);
  return false;


}
/* still not perfect** */
removeActs(i){

  this.acts.splice(i,1);
  this.times.splice(i,1);
  this.details.splice(i,1);
  return false;
 


}



}
