

type StatusEnum = 'done' | 'processing';
export interface ITODOITEM{
    // 内容
    content:string,
    // 记录的状态
    status:StatusEnum, 
    // 日期
    data?:number|string
}
export type TTODO = Array<ITODOITEM>