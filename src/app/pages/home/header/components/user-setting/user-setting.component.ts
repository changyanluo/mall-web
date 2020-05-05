import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../../service/system/user.service';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.less']
})
export class UserSettingComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  //用户登出
  logout() {
    this.userService.logout().subscribe(res=>{
      this.messageService.success('登出成功');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userName');
      this.router.navigateByUrl('/passport');
    });
  }
}
