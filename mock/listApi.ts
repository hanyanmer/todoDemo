 enum Status{
  DONE='done',
  PROCESSING='processing'
}

const list = [
  {
    content:'complete online javascript course',
    status:Status.DONE
  },
  {
    content:'Jog around the park 3x',
    status:Status.PROCESSING
  },
  {
    content:'10 minutes meditation',
    status:Status.PROCESSING
  },
  {
    content:'Read for 1 hour',
    status:Status.PROCESSING
  },
  {
    content:'Pick up groceries',
    status:Status.PROCESSING
  }
]
export default {
  'GET /api/v1/queryList': (req: any, res: any) => {
    res.json({
      success: true,
      data: { list: list },
      errorCode: 0,
    });
  },

  'POST /api/v1/addItem/': (req: any, res: any,data:any) => {
    const _body = req?.body
    const _list = list
    _list.push({content:_body?.content,status:_body?.status})
    res.json({
      success: true,
      data:_list,
      errorCode: 0,
    });
  },

  'POST /api/v1/delItem/': (req: any, res: any,data:any) => {
    console.log(req?.body,'request')
    const _body = req?.body
    const _list = list
    _list.splice(_body?.position,1)
    res.json({
      success: true,
      data:_list,
      errorCode: 0,
    });
  },

  'GET /api/v1/updateActiveStatus': (req: any, res: any) => {
    list.map((item,index)=>{
      if(item.status === Status.DONE){
        list.splice(index,1,{
          content:item.content,
          status:Status.PROCESSING
        })
      }
    })
    res.json({
      success: true,
      data: { list: list },
      errorCode: 0,
    });
  },

  'GET /api/v1/updateClearCompletedStatus': (req: any, res: any) => {
    list.map((item,index)=>{
      if(item.status === Status.DONE){
        list.splice(index,1)
      }
    })
    res.json({
      success: true,
      data: { list: list },
      errorCode: 0,
    });
  },

};
