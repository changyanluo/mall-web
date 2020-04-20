import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CommerceRoutingModule } from './commerce-routing.module';
import { GoodsListComponent } from './goods/goods-list/goods-list.component';
import { GoodsEntryComponent } from './goods/goods-entry/goods-entry.component';
import { OrderListComponent } from './order/order-list/order-list.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';

@NgModule({
    declarations: [
        GoodsListComponent,
        GoodsEntryComponent,
        OrderListComponent,
        OrderDetailComponent],
    imports: [
        CommerceRoutingModule,
        SharedModule
    ],
    entryComponents: []
})
export class CommerceModule { }
