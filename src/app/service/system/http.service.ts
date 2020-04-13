import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonService } from './common.service';

//http请求服务
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  server = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    public commonService: CommonService,
  ) { }

  post<T>(address: string, body: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.commonService.token || ''
    });
    return this.httpClient.post<T>(this.server + address, body, {
      headers: headers
    });
  }

  //form提交
  postForm<T>(address: string, body: any) {
    const headers = new HttpHeaders({
      'Authorization': this.commonService.token || ''
    });
    let data = new FormData();
    for (let key in body) {
      data.append(key, body[key]);
    }
    return this.httpClient.post<T>(this.server + address, data, {
      headers: headers
    });
  }
}
