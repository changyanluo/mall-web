
export interface Menu {
    id:number;
    parentId:number;
    menuName: string;
    icon: string;
    url: string;
    level:number;
    createTime: Date;
    description: string;
    status: number;
}

export interface UserMenu {
    id:number;
    parentId:number;
    menuName: string;
    icon: string;
    url: string;
    level:number;
    createTime: Date;
    description: string;
    status: number;
    expand:boolean;
    children: UserMenu[];
}