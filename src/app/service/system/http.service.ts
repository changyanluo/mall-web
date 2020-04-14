import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

//http请求服务
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  server = environment.apiUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  post<T>(address: string, body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': sessionStorage.getItem('token')
    });
    return this.httpClient.post<T>(this.server + address, body, {
      headers: headers
    });
  }

  //form提交
  postForm<T>(address: string, body: any) {
    let headers: HttpHeaders = null;
    if (!address.endsWith('login')) {
      headers = new HttpHeaders({
        'Authorization': sessionStorage.getItem('token')
      });
    }
    let data = new FormData();
    for (let key in body) {
      data.append(key, body[key]);
    }
    return this.httpClient.post<T>(this.server + address, data, {
      headers: headers
    });
  }
}
