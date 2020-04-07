import { Injectable } from '@angular/core';

//应用通用服务
@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
  ) { }
  
  //日期格式化
  formatDate(format:string,date:Date){
    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format)) format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return format;
  }

  //判断字符串是否为空
  stringEmpty(str:string){
    if(str === undefined || str === null || str.trim() === ''){
      return true;
    }
    return false;
  }
}