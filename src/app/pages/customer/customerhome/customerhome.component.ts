import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../service/commerce/sale.service';
import { NzMessageService } from 'ng-zorro-antd';
import { FlashGoods } from '../../../dto/commerce/flash-goods';
import { environment } from '../../../../environments/environment';

//用户商城主页
@Component({
  selector: 'app-customerhome',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.less']
})
export class CustomerhomeComponent implements OnInit {

  flashGoods: FlashGoods[];
  basePictureUrl = environment.pictureUrl;//图片服务器地址

  constructor(private saleService: SaleService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    this.saleService.getCustomerFlashGoods().subscribe(res => {
      this.flashGoods = res.data;
    });
  }

  //秒杀
  flash(item: FlashGoods) {
    this.saleService.flash(item.flashId, item.goodsId).subscribe();
  }
}
