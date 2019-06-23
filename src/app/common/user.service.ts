import { Injectable, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class UserService implements OnInit {

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {
  }
  addCar(name: string, password: string) {
    console.log("nmapass", name, password)
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    //headers.append("Access-Control-Allow-Origin", "*")

    return this._http.post(environment.baseUrl + 'cars/addCar',
      {
        name: name,
        password: password,

      }, { headers: headers })

  }
  signup(val){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*")

    return this._http.post(environment.baseUrl + 'User/Register',
      val, { headers: headers })
  }
  createCV(val){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*")

    return this._http.post(environment.baseUrl + 'User/createCV',
      val, { headers: headers })
  }
  login(email: string, password: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*")

    return this._http.post(environment.baseUrl + 'User/login',
      {
        email: email,
        password: password,

      }, { headers: headers })

  }


  CVlist() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //    headers.append("Access-Control-Allow-Origin", "*")

    return this._http.get(environment.baseUrl + 'User/cvList',
      { headers: headers })

  }
  mostviewCV(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //    headers.append("Access-Control-Allow-Origin", "*")

    return this._http.get(environment.baseUrl + 'User/mostviewCV',
      { headers: headers })
  }
  detail(id){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    //    headers.append("Access-Control-Allow-Origin", "*")

    return this._http.get(environment.baseUrl + 'User/detailCV?user_id='+id,
      { headers: headers })
  }
  updateCV(update){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append("Access-Control-Allow-Origin", "*")

    return this._http.put(environment.baseUrl + 'User/updateCV',
      update, { headers: headers })
  }
}
