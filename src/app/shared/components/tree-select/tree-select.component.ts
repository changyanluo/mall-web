import { Component, OnInit, ViewChild } from '@angular/core';
import { NzTreeNodeOptions } from 'ng-zorro-antd/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';

//树形数据多选组件
@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.less']
})
export class TreeSelectComponent implements OnInit {

  @ViewChild('menuTreeComponent') menuTreeComponent: NzTreeComponent;
  /*输入参数 */
  initList: any[]; //后台原始数据
  titleAttr: string; //文本字段属性名
  initSelectedKeys: string[]; //初始选中的节点key值集合

  nodes: NzTreeNodeOptions[]; //转换后的控件数据
  private controlSelIds: string[]; //控件产生的选中值
  private SelectedIds: number[]; //最终选中的key值集合

  constructor() { }

  ngOnInit(): void {
    this.nodes = this.convertNode(this.initList);
  }

  getSelectedIds(): number[] {
    this.controlSelIds = [];
    this.SelectedIds = [];
    const selectedNodes = this.menuTreeComponent.getCheckedNodeList();
    for (let node of selectedNodes) this.controlSelIds.push(node.key);
    this.getSelMenuId(this.nodes);
    return this.SelectedIds;
  }

  //将后台菜单数据转化为控件数据
  convertNode(initData: any[]) {
    let nodes = [];
    for (let item of initData) {
      let node: NzTreeNodeOptions = {
        key: item.id.toString(),
        title: item[this.titleAttr]
      };
      if (item.children.length > 0) {
        node.children = this.convertNode(item.children);
        if (this.initSelectedKeys.indexOf(node.key) > -1) node.expanded = true;
      }
      else {
        node.isLeaf = true;
        if (this.initSelectedKeys.indexOf(node.key) > -1) node.checked = true;
      }
      nodes.push(node);
    }
    return nodes;
  }

  //计算选中的节点ID集合
  getSelMenuId(nodes: NzTreeNodeOptions[]) {
    for (let node of nodes) {
      if (node.isLeaf) {
        if (this.controlSelIds.indexOf(node.key) > -1) {
          this.SelectedIds.push(Number.parseInt(node.key));
        }
      }
      else {
        if (this.controlSelIds.indexOf(node.key) > -1) {
          this.selectAllProgeny(node);
        }
        else {
          if (this.hasChildSelected(node)) {
            this.SelectedIds.push(Number.parseInt(node.key));
            this.getSelMenuId(node.children);
          }
        }
      }
    }
  }

  //判断某个结点是否有子节点被选中
  hasChildSelected(node: NzTreeNodeOptions): boolean {
    for (let childNode of node.children) {
      if (this.controlSelIds.indexOf(childNode.key) > -1) {
        return true;
      }
      else {
        if (!childNode.isLeaf && this.hasChildSelected(childNode))
          return true;
      }
    }
    return false;
  }

  //选中当前节点及其所有子孙
  selectAllProgeny(node: NzTreeNodeOptions) {
    this.SelectedIds.push(Number.parseInt(node.key));
    for (let item of node.children) {
      if (item.isLeaf) this.SelectedIds.push(Number.parseInt(item.key));
      else this.selectAllProgeny(item);
    }
  }
}
