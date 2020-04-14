import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '../../../../service/system/authority.service';
import { Authority } from '../../../../dto/system/authority';
import { CommonService } from '../../../../service/system/common.service';
import { NzMessageService , NzModalRef} from 'ng-zorro-antd';

@Component({
  selector: 'app-authority-entry',
  templateUrl: './authority-entry.component.html',
  styleUrls: ['./authority-entry.component.less']
})
export class AuthorityEntryComponent implements OnInit {

  authority:Authority;

  constructor(private authorityService: AuthorityService,
    public commonService: CommonService,
    private modal: NzModalRef,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  save() {
    if (this.commonService.stringEmpty(this.authority.name)) {
      this.messageService.error('请输入权限名！');
      return false;
    }
    this.commonService.isLoading = true;
    if (!this.authority.id) {
      this.authorityService.addAuthority(this.authority).subscribe(() => {
        this.commonService.isLoading = false;
        this.messageService.success('新增成功!');
        this.modal.destroy(true);
      });
    }
    else {
      this.authorityService.updateAuthority(this.authority).subscribe(() => {
        this.commonService.isLoading = false;
        this.messageService.success('修改成功!');
        this.modal.destroy(true);
      });
    }
    return true;
  }
}
