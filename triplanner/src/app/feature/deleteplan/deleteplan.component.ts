import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deleteplan',
  templateUrl: './deleteplan.component.html',
  styleUrls: ['./deleteplan.component.css']
})
export class DeleteplanComponent implements OnInit {
  
  planName:string[];
  cb_plan:boolean[];
  constructor() { }

  ngOnInit() {

    this.planName=["plan1","plan2"];
    this.cb_plan= [false,false];
4

    
  }


  removePlan(){
    for (var index in this.cb_plan) {
      if (this.cb_plan[index] == true) {

        this.planName.splice(Number(index),1);
        this.cb_plan.splice(Number(index),1);
        
      }
    }
    
   
        return false;
      }
  

}
