
export interface Authority {
    id:number;
    parentId:number;
    name: string;
    value: string;
    level:number;
    createTime: Date;
    description: string;
    status: number;
}

export interface UserAuthority {
    id:number;
    parentId:number;
    name: string;
    value: string;
    createTime: Date;
    level:number;
    description: string;
    expand:boolean;
    status: number;
    children: UserAuthority[];
}