import React,{InputHTMLAttributes,useEffect,useRef,useState,useCallback} from "react"
import {Container,Error} from "./styles"
import { IconBaseProps } from "react-icons"
import { useField } from "@unform/core"
import {FiAlertCircle } from "react-icons/fi"


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    name:string
    containerStyle?:object
    icon?:React.ComponentType<IconBaseProps>
}

const Input: React.FC<InputProps>= ({name,icon:Icon,containerStyle={},...rest}) =>{
    const inputRef = useRef<HTMLInputElement>(null)
    const { fieldName,defaultValue,error,registerField } = useField(name)
    const [isFocused, setFocus] = useState(false) 
    const [isField, setField] = useState(false) 

    useEffect(()=>{
        registerField({
            name:fieldName,
            ref:inputRef.current,
            path:"value"
        })
    },[fieldName,registerField])

    const handleInputBlur = useCallback(()=>{
        setFocus(false)

        if(inputRef.current?.value){
            setField(true)
        }else{
            setField(false)
        }
    },[])

    const handleInputFocus = ()=>{setFocus(true)}

    return (
        <Container style={containerStyle} isErrored={!!error} isField={isField} isFocused={isFocused} >
            {Icon && <Icon size={20} />}
            <input 
            name={name}
            defaultValue={defaultValue} 
            ref={inputRef} {... rest} 
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            />
            {error && <Error title={error} ><FiAlertCircle color="red" ></FiAlertCircle></Error>}
        </Container>
    )
}

export default Input