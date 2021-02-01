import React, { useCallback,useEffect } from "react"
import { Container } from "./styles"
import { FiAlertCircle,FiCheckCircle,FiInfo,FiXCircle } from "react-icons/fi"

import {ToastMessage,useToast} from "../../../hooks/ToatContext"

const icons = {
    info:<FiInfo size={24} ></FiInfo>,
    success:<FiCheckCircle size={24} ></FiCheckCircle>,
    error:<FiAlertCircle></FiAlertCircle>
}

interface ToastContainerProps {
    message:ToastMessage
    style:object
}

const Toast:React.FC<ToastContainerProps> = ({message,style})=>{
    const {removeToast} = useToast()
    const handleRemoveToast = useCallback((id)=>{
        removeToast(id)
    },[])
    useEffect(()=>{
        const timer = setTimeout(()=>{
            removeToast(message.id)
        },3000)
        return ()=>{
            clearTimeout(timer)
        }
    },[message.id,removeToast])
    return(
        <Container type={message.type} hasdescription={Number(!!message.description)} style={style} >
        {icons[message.type || "info"]}
        <div>
            <strong> {message.title} </strong>
             {message.description && <p>{message.description}</p>} 
        </div>
        <button onClick={()=>handleRemoveToast(message.id)} type="button" >
            <FiXCircle size={18}></FiXCircle>
        </button>
    </Container> 
    )
}
export default Toast
