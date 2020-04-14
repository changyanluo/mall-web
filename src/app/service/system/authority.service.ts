import { Injectable } from '@angular/core';
import { ServerResult } from '../../dto/system/server-result';
import { HttpService } from './http.service';
import { UserAuthority, Authority } from '../../dto/system/authority';

@Injectable({
    providedIn: 'root'
})
export class AuthorityService {

    authorityUrl = `/authority`;

    constructor(private http: HttpService) { }

    getAuthorityList(authorityName?: string) {
        return this.http.postForm<ServerResult<UserAuthority[]>>(`${this.authorityUrl}/getAuthorityList`,
            { authorityName: authorityName });
    }

    addAuthority(authority: Authority) {
        return this.http.post<ServerResult<number>>(`${this.authorityUrl}/addAuthority`, authority);
    }

    updateAuthority(authority: Authority) {
        return this.http.post<ServerResult<number>>(`${this.authorityUrl}/updateAuthority`, authority);
    }
}
