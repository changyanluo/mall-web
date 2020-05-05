import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../../service/commerce/sale.service';
import { Order } from '../../../../dto/commerce/order';
import { PageList } from '../../../../dto/system/server-result';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService } from '../../../../service/system/common.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.less']
})
export class OrderListComponent implements OnInit {

  dataList = new PageList<Order>();
  goodsName: string;

  constructor(private saleService: SaleService,
    private messageService: NzMessageService,
    public commonService: CommonService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.commonService.isLoading = true;
    this.saleService.getOrderList(this.dataList.pageIndex, this.dataList.pageSize, this.goodsName)
      .subscribe(res => {
        if (res.code == 1) {
          this.commonService.isLoading = false;
          this.dataList.list = res.data.list;
          this.dataList.total = res.data.total;
        }
      });
  }

  //查看订单详情ß
  viewDeatil(selectedOrder: Order) {

  }
}
