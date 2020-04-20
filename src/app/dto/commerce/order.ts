export interface Order{
    id:number;
    userId:number;
    userName:string;
    goodsId:number; 
    deliveryAddrId:number;
    goodsName:string;
    goodsImage:string;
    goodsCount:string;
    goodsPrice:string;
    status:number;
    createDate:Date;
    payDate:Date;
}