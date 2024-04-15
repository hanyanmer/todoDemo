import { Form, Input, Modal, message } from "antd";
import Api from '@/services/demo/index'

interface IProps{
    open:boolean
    onOpenChange:any
    setTodoList:any
    todoListEndRef:HTMLDivElement
}
export default function AddItemModel(props:IProps){
    const {open , onOpenChange , setTodoList , todoListEndRef} = props
    const [form] = Form.useForm()

    const onFinish = async (val)=>{
        console.log(form?.getFieldsValue())
        try {
            const res = await Api.listController.addItem({content:form?.getFieldValue('content'),status:'processing'})
            if(res?.success){
                setTodoList(res?.data)
                onOpenChange(false)
                form.setFieldsValue({content: ''})
                if(todoListEndRef?.current){
                    todoListEndRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            }else{
                message.error('error')
            }
        } catch (error) {
            message.error(JSON.stringify(error))      
        }
    }
    return (
        <Modal title="Add TODO items" open={open} onOk={onFinish}  onCancel={()=>onOpenChange(false)} destroyOnClose>
          <div className="p-5">
            <Form form={form}>
              <Form.Item label="content" name="content" rules={[{ required: true }]}><Input /></Form.Item>
            </Form>
          </div>
        </Modal>
    )
}

