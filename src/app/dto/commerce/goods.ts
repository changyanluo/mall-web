export interface Goods{
    id:number;
    goodsName:string;
    title:string;
    image:string;
    description:string;
    price:number;
    stock:number;
    state:number; //0:z正常状态,1:促销中
    producer:string;
}