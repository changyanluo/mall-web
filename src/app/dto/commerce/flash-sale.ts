//秒杀商品
export interface FlashSale{
    id:number;
    goodsId:number;
    flashPrice:number;
    stockCount:number;
    startDate:Date;
    endDate:Date;
}