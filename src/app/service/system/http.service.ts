import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
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

  post<T>(address:string,body:any){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.httpClient.post<T>(this.server + address,body,{
      headers:headers
    });
  }

  //form提交
  postForm<T>(address:string,body:any){
    let data = new FormData();
    for(let key in body){
        data.append(key,body[key]);
    }
    return this.httpClient.post<T>(this.server + address,data);
  }
}
