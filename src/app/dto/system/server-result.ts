//服务端统一返回数据格式    
export interface ServerResult<T>{
    code:number;
    message:string;
    data:T;
}

//列表分页数据模型
export class PageList<T>{
    pageIndex = 1; //当前页号
    pageSize = 10; //每页的数据量
    total: number;  //数据总条数
    list: T[]; 
}