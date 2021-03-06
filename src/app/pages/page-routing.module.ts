import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { LeftMenuComponent } from './home/left-menu/left-menu.component';
import { TopMenuComponent } from './home/top-menu/top-menu.component';

const routes: Routes = [
    { path: 'passport', component: LoginComponent },
    {//后台管理界面
        path: 'admin', component: LeftMenuComponent,
        children: [
            { path: 'sys', loadChildren: () => import('./system/system.module').then(m => m.SystemModule) },
            { path: 'mall', loadChildren: () => import('./commerce/commerce.module').then(m => m.CommerceModule) }
        ]
    },
    {//客户界面
        path: 'customer', component: TopMenuComponent,
        children: [
            { path: 'dashboard', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }
