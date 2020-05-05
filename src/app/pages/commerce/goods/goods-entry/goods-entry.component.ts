import { Component, OnInit } from '@angular/core';
import { Goods } from '../../../../dto/commerce/goods';
import { SaleService } from '../../../../service/commerce/sale.service';
import { NzMessageService, NzModalRef } from 'ng-zorro-antd';
import { CommonService } from '../../../../service/system/common.service';

//商品录入界面
@Component({
  selector: 'app-goods-entry',
  templateUrl: './goods-entry.component.html',
  styleUrls: ['./goods-entry.component.less']
})
export class GoodsEntryComponent implements OnInit {

  goods: Goods;

  constructor(public commonService: CommonService,
    private saleService: SaleService,
    private modal: NzModalRef,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  save() {
    if (this.commonService.stringEmpty(this.goods.goodsName)) {
      this.messageService.error('请输入商品名！');
      return;
    }
    if (this.commonService.stringEmpty(this.goods.title)) {
      this.messageService.error('请输入商品标题！');
      return;
    }
    if (this.goods.price <= 0) {
      this.messageService.error('请输入商品价格！');
      return;
    }
    if (this.goods.stock <= 0) {
      this.messageService.error('请输入商品库存！');
      return;
    }
    this.commonService.isLoading = true;
    if (!this.goods.id) {
      this.saleService.addGoods(this.goods).subscribe(res => {
        if (res.code == 1) {
          this.commonService.isLoading = false;
          this.messageService.success('新增成功!');
          this.modal.destroy(true);
        }
      });
    }
    else {
      this.saleService.updateGoods(this.goods).subscribe(res => {
        if (res.code == 1) {
          this.commonService.isLoading = false;
          this.messageService.success('修改成功!');
          this.modal.destroy(true);
        }
      });
    }
  }
}
