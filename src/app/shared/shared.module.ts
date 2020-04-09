import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsProviderModule } from '../icons-provider.module';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//组件
import { TreeSelectComponent } from './components/tree-select/tree-select.component';
//管道
import { DatePipe } from './pipes/date.pipe';

//指令


const Components = [TreeSelectComponent];
const Pipes = [DatePipe];

@NgModule({
  declarations: [
    ...Pipes,
    ...Components
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
    ...Pipes,
    ...Components
  ],
  entryComponents:[
    ...Components
  ]
})

export class SharedModule { }
