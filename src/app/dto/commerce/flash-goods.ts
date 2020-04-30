//用户秒杀商品列表
export interface FlashGoods{
    flashId:number;
    goodsId:number;
    goodsName:string;
    title:string;
    image:string;
    flashPrice:number;
    startDate:Date;
    endDate:Date;
}