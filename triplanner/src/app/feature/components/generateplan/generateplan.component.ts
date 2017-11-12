import { Component, OnInit,OnDestroy } from '@angular/core';
import { DataService } from '../../../data.service';
import {ActivatedRoute,RouterLink,Router} from '@angular/router'

@Component({
  selector: 'app-generateplan',
  templateUrl: './generateplan.component.html',
  styleUrls: ['./generateplan.component.css']
})
export class GenerateplanComponent implements OnInit {

  tripName: string;
  departDate:string;
  returnDate:string;

  resultDate:number;

  private sub: any;


  constructor(private router: Router,private _dataService:DataService,private route: ActivatedRoute) { 

  }

  ngOnInit() {

 /*    this.sub = this.route.params.subscribe(params => {
      this.tripName = params['name']; 
      this.departDate = params['depdate'];
      this.returnDate = params['retdate'];
    
      
   });
 */


  }

 /*  ngOnDestroy() {
    this.sub.unsubscribe();
  } */

}
