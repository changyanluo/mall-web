import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../service/system/user.service';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService } from '../../../service/system/common.service';

//登录界面
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;
  isSpinning = false; //loading框

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    public commonService: CommonService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.controls['userName'].valid && this.validateForm.controls['password'].valid) {
      this.commonService.isLoading = true;
      this.userService.login(this.validateForm.controls['userName'].value,
        this.validateForm.controls['password'].value)
        .subscribe(res => {
          this.commonService.isLoading = false;
          this.messageService.success('登录成功！');
          sessionStorage.setItem('token', res.message);
          sessionStorage.setItem('userName', this.validateForm.controls['userName'].value);
          this.router.navigateByUrl('/admin/sys');
        })
    }
  }
}
