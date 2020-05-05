import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEntryComponent } from './user/user-entry/user-entry.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleEntryComponent } from './role/role-entry/role-entry.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuEntryComponent } from './menu/menu-entry/menu-entry.component';
import { AuthorityListComponent } from './authority/authority-list/authority-list.component';
import { AuthorityEntryComponent } from './authority/authority-entry/authority-entry.component';
import { CustomerhomeComponent } from '../customer/customerhome/customerhome.component';
import { LogComponent } from './log/log.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserEntryComponent,
        RoleListComponent,
        RoleEntryComponent,
        MenuListComponent,
        MenuEntryComponent,
        AuthorityListComponent,
        AuthorityEntryComponent,
        CustomerhomeComponent,
        LogComponent],
    imports: [
        SystemRoutingModule,
        SharedModule
    ],
    entryComponents: [
        UserEntryComponent,
        RoleEntryComponent,
        MenuEntryComponent
    ]
})
export class SystemModule { }
