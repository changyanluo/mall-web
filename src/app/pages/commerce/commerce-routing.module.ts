import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsListComponent } from './goods/goods-list/goods-list.component';
import { OrderListComponent } from './order/order-list/order-list.component';

const routes: Routes = [
  { path: 'goods', component: GoodsListComponent },
  { path: 'order', component: OrderListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommerceRoutingModule { }
