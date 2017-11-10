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


  logout(){
    return this.http.get("/api/logout")
    .map(result => this.result = result.json().data)
  }
}
