import React,{ createContext, useContext,useCallback,useState } from "react"
import ToastComponent from "../components/toastContainer"
import { uuid } from "uuidv4"

interface toastContextData{
    addToast(message:Omit<ToastMessage,"id">):void
    removeToast(id:string):void
}
export interface ToastMessage {
    id:string
    type?:"success"|"error"|"info"
    title:string
    description:string
}

const toastContext = createContext<toastContextData>({} as toastContextData)

const ToastProvider:React.FC = ({children})=>{
    const [messages,setMessages]  = useState<ToastMessage[]>([])
    const addToast = useCallback(({type,title,description}: Omit<ToastMessage,"id">)=>{
        const id = uuid()
        const toast = {
            id,
            type,
            title,
            description
        }
        setMessages((state)=>[...state,toast])
    },[])
    const removeToast = useCallback((id:string)=>{
        setMessages(state=> state.filter(message=>message.id !== id))
    },[])
    return (
        <toastContext.Provider value={{addToast,removeToast}}>
            {children}
            <ToastComponent messages={messages}></ToastComponent>
        </toastContext.Provider>
    )
}

function useToast():toastContextData{
    const context = useContext(toastContext)

    if(!context){
        throw new Error("use context must be used within a ToastProvider")
    }
    return context
}

export {ToastProvider,useToast}