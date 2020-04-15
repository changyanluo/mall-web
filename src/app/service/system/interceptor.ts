import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse,
    HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { NzMessageService } from 'ng-zorro-antd';
import { ServerResult } from '../../dto/system/server-result';
import { CommonService } from './common.service';
import { Router } from '@angular/router';

//http请求拦截器
@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private message: NzMessageService,
        public commonService: CommonService,
        private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<ServerResult<any>>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<ServerResult<any>>) => {  //根据返回的code提示消息
                if (event instanceof HttpResponse && event.status === 200) {
                    if (event.body.code !== 1) {
                        this.message.error(event.body.message);
                        this.commonService.isLoading = false;
                    }
                }
            }),
            catchError((err: HttpErrorResponse) => {
                this.message.error(err.error.text);
                this.commonService.isLoading = false;
                if (err.error.text === '会话过期!') {
                    this.router.navigateByUrl('/passport');
                    sessionStorage.removeItem('token');
                }
                return throwError("error");
            })
        )
    }
}