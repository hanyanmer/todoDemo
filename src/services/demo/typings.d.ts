


declare namespace API {

  interface Result {
    success?: boolean;
    errorMessage?: string;
    data?: Record<string, any>;
  }

  interface Result_List {
    success?: boolean;
    errorMessage?: string;
    data?: List_info;
  }

  interface List_Info {
    current?: number;
    pageSize?: number;
    total?: number;
    list?: Array<UserInfo>;
  }
  type StatusEnum = 'done' | 'processing';

  interface List {
    content:string,
    status:StatusEnum, 
    data?:number|string
  }


  interface ListItemInfoVo {
    content?: string;
    /** nick */
    status?: StatusEnum;
  }

  interface ListDelInfoVo{
    position:number
  }
}