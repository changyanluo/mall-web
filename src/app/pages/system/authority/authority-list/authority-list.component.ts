import { Component, OnInit } from '@angular/core';
import { AuthorityService } from '../../../../service/system/authority.service';
import { Authority, UserAuthority } from '../../../../dto/system/authority';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AuthorityEntryComponent } from '../authority-entry/authority-entry.component';

//权限列表界面
@Component({
  selector: 'app-authority-list',
  templateUrl: './authority-list.component.html',
  styleUrls: ['./authority-list.component.less']
})
export class AuthorityListComponent implements OnInit {

  name = '';
  authorityList: UserAuthority[];
  openStatus: Map<number, boolean> = new Map<number, boolean>(); //保存菜单的展开状态<序号，是否展开>

  constructor(private authorityService: AuthorityService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.authorityService.getAuthorityList(this.name)
      .subscribe(res => {
        if (res.code == 1) {
          this.authorityList = res.data;
          this.setExpandStatus(this.authorityList);
        }
      });
  }

  collapse(authority: UserAuthority, event: boolean): void {
    authority.expand = event;
    this.openStatus.set(authority.id, event);
  }

  setExpandStatus(authorities: UserAuthority[]) {
    for (let authority of authorities) {
      if (this.openStatus.has(authority.id)) {
        authority.expand = this.openStatus.get(authority.id);
      }
      if (authority.children.length > 0) {
        this.setExpandStatus(authority.children);
      }
    }
  }

  addAuthority(parentId?: number, level?: number) {
    const authority: Authority = {
      id: null,
      name: '',
      parentId: parentId,
      value: '',
      createTime: null,
      level: level ? level + 1 : 1,
      description: '',
      status: 1
    }
    const modal = this.modalService.create({
      nzTitle: '新增权限',
      nzContent: AuthorityEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { authority: authority },
      nzFooter: null
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }

  editAuthority(selectedAuthority: Authority) {
    const modal = this.modalService.create({
      nzTitle: '修改权限',
      nzContent: AuthorityEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { authority: JSON.parse(JSON.stringify(selectedAuthority)) },
      nzFooter: null
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }
}
