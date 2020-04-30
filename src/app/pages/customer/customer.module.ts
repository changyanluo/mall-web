import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CustomerRoutingModule } from './customer-routing.module';



@NgModule({
    declarations: [],
    imports: [
        CustomerRoutingModule,
        SharedModule
    ],
    entryComponents: []
})
export class CustomerModule { }
