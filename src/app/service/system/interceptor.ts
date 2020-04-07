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

//http请求拦截器
@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private message: NzMessageService) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<ServerResult<any>>> {
        return next.handle(req).pipe(
            tap((event: HttpEvent<ServerResult<any>>) => {  //根据返回的code提示消息
                if (event instanceof HttpResponse && event.status === 200) {
                    if (event.body.code === 3) {//会话过期
                        this.message.warning("已超时，请重新登录!");
                    }
                    else if (event.body.code !== 1) {
                        this.message.error(event.body.message);
                    }
                }
            }),
            catchError((err: HttpErrorResponse) => {
                this.message.error(JSON.stringify(err));
                return throwError("error");
            })
        )
    }
}