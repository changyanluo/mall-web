import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SystemRoutingModule } from './system-routing.module';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserEntryComponent } from './user/user-entry/user-entry.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleEntryComponent } from './role/role-entry/role-entry.component';
import { MenuListComponent } from './menu/menu-list/menu-list.component';
import { MenuEntryComponent } from './menu/menu-entry/menu-entry.component';

@NgModule({
    declarations: [
        UserListComponent,
        UserEntryComponent,
        RoleListComponent,
        RoleEntryComponent,
        MenuListComponent,
        MenuEntryComponent],
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
