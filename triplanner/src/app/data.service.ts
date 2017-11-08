import { Injectable } from '@angular/core';
import { Http,Headers, RequestOptions,URLSearchParams  } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {
 
  result:any;
  constructor(private http:Http) { }

 
  getUsers(){ 
    return this.http.get("/api/users")
      .map(result => this.result = result.json().data)
  }

  getSession(amount:string){
    let myParams  = new URLSearchParams();
    myParams.append('name',"name")
    myParams.append('catidsad', '123');
    let options = new RequestOptions({ params: myParams });
    return this.http.get("/api/session", options)
    .map(result => this.result = result.json().data)
  }

  login(){
    return this.http.get("/api/login")
    .map(result => this.result = result.json().data)
  }
}
