import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../../service/commerce/sale.service';
import { NzMessageService } from 'ng-zorro-antd';

//用户商城主页
@Component({
  selector: 'app-customerhome',
  templateUrl: './customerhome.component.html',
  styleUrls: ['./customerhome.component.less']
})
export class CustomerhomeComponent implements OnInit {

  constructor(private saleService: SaleService,
    private messageService: NzMessageService) { }

  ngOnInit(): void {
    
  }

}
