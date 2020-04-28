import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerhomeComponent } from './customerhome/customerhome.component';

const routes: Routes = [
    { path: 'home', component: CustomerhomeComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CustomerRoutingModule { }
