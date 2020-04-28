import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerhomeComponent } from './customerhome/customerhome.component';


@NgModule({
    declarations: [
    CustomerhomeComponent],
    imports: [
        CustomerRoutingModule,
        SharedModule
    ],
    entryComponents: []
})
export class CustomerModule { }
