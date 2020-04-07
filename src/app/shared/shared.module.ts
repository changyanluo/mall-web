import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsProviderModule } from '../icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//组件

//管道
import { DatePipe } from './pipes/date.pipe';
//指令

const Pipes = [DatePipe];

@NgModule({
  declarations: [
    ...Pipes
  ],
  imports: [
    CommonModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    IconsProviderModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    ...Pipes
  ]
})

export class SharedModule { }
