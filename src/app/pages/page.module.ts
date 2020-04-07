import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PageRoutingModule } from './page-routing.module';
import { LoginComponent } from './home/login/login.component';
import { LeftMenuComponent } from './home/left-menu/left-menu.component';
import { TopMenuComponent } from './home/top-menu/top-menu.component';
import { HeaderComponent } from './home/header/header.component';
import { UserSettingComponent } from './home/header/components/user-setting/user-setting.component';
import { NotificationComponent } from './home/header/components/notification/notification.component';

@NgModule({
    declarations: [
        LoginComponent,
        LeftMenuComponent,
        TopMenuComponent,
        HeaderComponent,
        UserSettingComponent,
        NotificationComponent],
    imports: [
        PageRoutingModule,
        SharedModule
    ]
})
export class PageModule { }
