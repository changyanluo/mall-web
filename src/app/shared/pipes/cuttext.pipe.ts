import { Pipe, PipeTransform } from '@angular/core';

//超长文本截断显示（100字符）
@Pipe({ name: 'cuttext' })
export class CuttextPipe implements PipeTransform {

    constructor() { }

    transform(text: string) {
        if (text && text.length > 100)
            return text.substring(0, 100);
        else
            return text;
    }
}