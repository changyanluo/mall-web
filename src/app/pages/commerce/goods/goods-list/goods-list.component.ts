import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../../service/commerce/sale.service';
import { Goods } from '../../../../dto/commerce/goods';
import { FlashSale } from '../../../../dto/commerce/flash-sale';
import { PageList } from '../../../../dto/system/server-result';
import { GoodsEntryComponent } from '../goods-entry/goods-entry.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService } from '../../../../service/system/common.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.less']
})
export class GoodsListComponent implements OnInit {

  dataList = new PageList();
  goodsName: string;
  isVisible = false;
  flashSale: FlashSale;
  basePictureUrl = environment.pictureUrl;
  
  constructor(private saleService: SaleService,
    private messageService: NzMessageService,
    public commonService: CommonService,
    private modalService: NzModalService) { }

  ngOnInit(): void {
    this.search();
  }

  search() {
    this.saleService.getGoodsList(this.dataList.pageIndex, this.dataList.pageSize, this.goodsName)
      .subscribe(res => {
        this.dataList.list = res.data.list;
        this.dataList.total = res.data.total;
      });
  }

  addGoods() {
    const goods: Goods = {
      id: null,
      goodsName: '',
      title: '',
      image: '',
      description: '',
      price: 0,
      stock: 0,
      state: 0
    }
    const modal = this.modalService.create({
      nzTitle: '添加商品',
      nzContent: GoodsEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { goods: goods },
      nzFooter: [{
        label: '保存',
        type: 'primary',
        onClick: (instance: any) => instance.save()
      }]
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }

  editGoods(selectedGoods: Goods) {
    const modal = this.modalService.create({
      nzTitle: '修改商品信息',
      nzContent: GoodsEntryComponent,
      nzMaskClosable: false,
      nzComponentParams: { goods: selectedGoods },
      nzFooter: [{
        label: '保存',
        type: 'primary',
        onClick: (instance: any) => instance.save()
      }]
    });
    modal.afterClose.subscribe(ret => {
      if (ret) this.search();
    });
  }

  //添加商品到秒杀活动
  FlashGoods(goodsId: number) {
    this.flashSale = {
      id: null,
      goodsId: goodsId,
      flashPrice: 0,
      stockCount: 0,
      startDate: null,
      endDate: null
    };
    this.isVisible = true;
  }

  //保存秒杀商品
  save() {
    this.saleService.addFlashGoods(this.flashSale).subscribe(res => {
      this.commonService.isLoading = false;
      this.messageService.success('添加成功!');
      this.isVisible = false;
    });
  }
}
