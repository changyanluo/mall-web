import { Injectable } from '@angular/core';
import { ServerResult } from '../../dto/system/server-result';
import { HttpService } from '../system/http.service';
import { Goods } from '../../dto/commerce/goods';
import { Order } from '../../dto/commerce/order';
import { FlashSale } from '../../dto/commerce/flash-sale';
import { PageList } from '../../dto/system/server-result';

@Injectable({
    providedIn: 'root'
})
export class SaleService {

    saleUrl = `/sale`;

    constructor(private http: HttpService) { }

    getGoodsList(pageIndex: number, pageSize: number, goodsName?: string) {
        return this.http.postForm<ServerResult<PageList<Goods>>>(`${this.saleUrl}/getGoodsList`,
            { goodsName: goodsName || '', pageIndex: pageIndex, pageSize: pageSize });
    }

    getOrderList(pageIndex: number, pageSize: number, goodsName?: string) {
        return this.http.postForm<ServerResult<PageList<Order>>>(`${this.saleUrl}/getOrderList`,
            { goodsName: goodsName || '', pageIndex: pageIndex, pageSize: pageSize });
    }

    addGoods(goods: Goods) {
        return this.http.post<ServerResult<number>>(`${this.saleUrl}/addGoods`, goods);
    }

    updateGoods(goods: Goods) {
        return this.http.post<ServerResult<number>>(`${this.saleUrl}/updateGoods`, goods);
    }

    addFlashGoods(flashSale: FlashSale) {
        return this.http.post<ServerResult<number>>(`${this.saleUrl}/addFlashGoods`, flashSale);
    }
}
