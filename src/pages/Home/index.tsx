import React, { useEffect, useRef, useState } from "react";
import { TTODO } from "./type";
import cn from 'classnames';
import Api from '@/services/demo/index'
import { message } from "antd";
import AddItemModel from "./addItem";


enum Status{
  DONE='done',
  PROCESSING='processing'
}

const HomePage: React.FC = () => {
  const [todoList,setTodoList] = useState<TTODO>([])
  const [isCreate,setIsCreate] = useState(false)
  const todoListEndRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const getList = async ()=>{
      try {
        const res = await Api.listController.queryList({})
        if(res?.success){
          setTodoList(res?.data?.list)
        }else{
          message.error('error')
        }
      } catch (error) {
        console.log(new Error(JSON.stringify(error)))
      }
    }
    
    getList()
  },[])

  // 单击 修改状态
  const onclick = (index:number) => {
    const _list:TTODO = [].concat(todoList as any)
    _list.splice(index,1,{
      content:_list[index].content,
      status:_list[index].status === Status?.DONE ?Status.PROCESSING:Status.DONE
    })
    setTodoList(_list)
  }

  // 双击删除
  const onDoubleClick =async (index:number) => {
    try {
      const res = await Api.listController.delItem({position:index})
      if(res?.success){
        message.success('删除成功')
        setTodoList(res?.data)
      }else{
        message.error('删除失败')
      }
    } catch (error) {
      message.error(JSON.stringify(error))
    }
  }

  // 都改为活跃状态
  const handleAllActive = async () => {
    try {
      const res = await Api.listController.updateActiveStatus({})
      if(res?.success){
        message.success('改为活跃状态成功')
        setTodoList(res?.data?.list)
      }
    } catch (error) {
      message.error(JSON.stringify(error))
    }
  }

  // 清除完成态数据
  const handleClearCompleted =async () => {
    try {
      const res = await Api.listController.updateClearCompletedStatus({})
      if(res?.success){
        message.success('清除完成态事项成功')
        setTodoList(res?.data?.list)

      }
    } catch (error) {
      message.error(JSON.stringify(error))
    }
  }
  
  return (
    <div className="w-[100%] h-[100vh]">
      <div className="bg-[url('@/assets/home/bg.jpg')] bg-no-repeat bg-[length:100%_80%] aspect-[1] md:aspect-[4] w-[100%]">
        <div className="max-w-[80%] min-w-[75%] md:max-w-[40%] md:min-w-[35%] absolute left-1/2 -translate-x-1/2 font-serif my-20">
          <div className="font-bold mb-10 text-[white] md:text-2xl tracking-wider">TODO</div>
          <div className="py-[20px] rounded-lg bg-[white] mb-5 px-5 flex items-center" onClick={()=>{setIsCreate(val=>!val)}}>
            {
              isCreate
              ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <circle cx="12" cy="12" r="10" fill="#6634b2" stroke="black" stroke-width="0"/>
                  <path d="M7 13l3 3 7-7" fill="#6634b2" stroke="white" stroke-width="2"/>
                </svg>
              : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                  <circle cx="12" cy="12" r="10" fill="white" stroke="grey" stroke-width="1"/>
                </svg>
            }
           
          
            <span className="align-middle ml-4">create a new todo...</span>
          </div>

          <div className="bg-[white] rounded-lg shadow-lg">
            <div className="h-[40vh] overflow-y-scroll">
            {
              todoList.length === 0 && (
                 <div className="text-center mt-10">暂无数据，快去创建吧~</div>
              )
            }
            {
              todoList.map((item,index)=>{
                return (
                  <div key={item.content}>
                   <div className="py-[18px] px-5 flex items-center" 
                     onClick={()=>onclick(index)}
                     onDoubleClick={()=>onDoubleClick(index)}
                     >

                   {
                      item.status === Status.DONE
                      ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <circle cx="12" cy="12" r="10" fill="#6634b2" stroke="black" stroke-width="0"/>
                          <path d="M7 13l3 3 7-7" fill="#6634b2" stroke="white" stroke-width="2"/>
                        </svg>
                      : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                          <circle cx="12" cy="12" r="10" fill="white" stroke="grey" stroke-width="1"/>
                        </svg>
                    }
                    <span className={cn(item?.status === Status.DONE ? 'line-through':'','ml-4')}>{ item.content }</span>
                   </div>
                   <hr />
                  </div>
                )
              })
            }
            <div ref={todoListEndRef}/>
            </div>
            
            <div className="py-[20px] flex justify-between px-5">
              <div>{todoList.length} items left</div>
              <div className="cursor-pointer hover:text-[#3451b2]" onClick={handleAllActive}><span className="font-bold">All</span> Active Completed</div>
              <div className="cursor-pointer hover:text-[#3451b2]" onClick={handleClearCompleted}>Clear Completed</div>
            </div>
          </div>
          
          <div className="mt-20">
            <div className="text-center">
              <p>Challenge by <a href="/home" target="_blank" className="text-[purple] underline cursor-pointer">Fronted Mentor</a></p> 
              <p>coded by <a href="/home" target="_blank" className="text-[purple] underline cursor-pointer">CY</a></p>
            </div>
          </div>
          <AddItemModel open={isCreate} onOpenChange={setIsCreate} setTodoList={setTodoList} todoListEndRef={todoListEndRef} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
