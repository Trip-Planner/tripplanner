import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class DataService {

  result: any;
  constructor(private http: Http) { }


  getUsers() {
    return this.http.get("/api/users")
      .map(result => this.result = result.json().data)
  }

  getSession() {
    return this.http.get("/api/session")
      .map(result => this.result = result.json().data)
  }

  login(username: string, password: string) {
    let myParams = new URLSearchParams();
    myParams.append('user', username)
    myParams.append('pass', password);
    let options = new RequestOptions({ params: myParams });
    return this.http.get("/api/login",options)
      .map(result => this.result = result.json().data)
  }

  register(username: string, password: string,email:string) {
    let myParams = new URLSearchParams();
    myParams.append('user', username)
    myParams.append('pass', password)
    myParams.append('email', email);
    let options = new RequestOptions({ params: myParams });
    return this.http.get("/api/register",options)
      .map(result => this.result = result.json().data)
  }

  createplan(planname:string,startdate:string,enddate:string){
    let myParams = new URLSearchParams();
    myParams.append('planname', planname)
    myParams.append('startdate',startdate)
    myParams.append('enddate', enddate);
    let options = new RequestOptions({ params: myParams });
    return this.http.get("/api/createplan",options)
      .map(result => this.result = result.json().data)

  }

  putplandetail(planid:string,starttime:string,date:string,type:string,detail:string,activityname:string)
  {
    let myParams = new URLSearchParams();
    myParams.append('planid', planid)
    myParams.append('starttime',starttime)
    myParams.append('date', date)
    myParams.append('type', type)
    myParams.append('detail',detail)
    myParams.append('activityname', activityname)
    let options = new RequestOptions({ params: myParams });
    return this.http.get("/api/putplandetail",options)
      .map(result => this.result = result.json().data)
  }
  
  logout(){
    return this.http.get("/api/logout")
    .map(result => this.result = result.json().data)
  }
}
