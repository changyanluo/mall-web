import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from '../../service/system/common.service';

//日期转换管道
@Pipe({ name: 'cvtdate' })
export class DatePipe implements PipeTransform {

    constructor(private commonService: CommonService) { }

    transform(date: string) {
        return this.commonService.formatDate("yyyy-MM-dd", new Date(date));
    }
}