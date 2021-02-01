import React,{useCallback,useRef}  from "react"
import {FormHandles} from "@unform/core"
import logo from "../../assets/logo.svg"
import {Container,Content,AnimationContainer,Background} from "./styles"
import { FiLock } from "react-icons/fi"
import {Form} from "@unform/web"
import * as Yup from "yup"
import getValidationError from "../../utils/getValidationErros"
import Input from "../../components/input/index"
import Button from "../../components/button/index"
import { useToast} from "../../hooks/ToatContext"
import {useHistory,useLocation} from "react-router-dom"
import api from "../../services/api"

interface RsetPasswordFormData{
    password:string
    password_confirmation:string
}

export const ResetPassword : React.FC = () =>{
    const formRef = useRef<FormHandles>(null)
    const {addToast} = useToast()
    const location = useLocation()
    const History = useHistory()
    const handleSubmit = useCallback(async (data:RsetPasswordFormData)=>{
        
        try{
            
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                password:Yup.string().required("password is required"),
                password_confirmation:Yup.string()
                .oneOf(
                [Yup.ref("password"),undefined],
                "passwords must match"
                )
            })

            await schema.validate(data,{
                abortEarly:false
            })
     
            const token = location.search.replace("?token=","")

            if(!token){
                addToast({
                    type:"error",
                    description:"you dont have token",
                    title:"erro no login"
                })
                return
            }
            
            await api.post("/password/reset",{
                Newpassword:data.password,
                password_confirmation:data.password_confirmation,
                token  
            })

            addToast({
                type:"success",
                description:"senha resetada com sucesso",
                title:"senha resetada"
            })

            History.push("/")

        }catch(err){
            if(err instanceof Yup.ValidationError){
                formRef.current?.setErrors(getValidationError(err))
                return
            }
            addToast({
                type:"error",
                description:"ocorreu um erro ao resetar a senha",
                title:"erro no login"
            })
        }
    },[addToast,History,location.search])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="goBarber"/>
                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Resetar senha</h1>
                        <Input name="password" icon={FiLock} placeholder="new password" type="password" ></Input>
                        <Input name="password_confirmation" icon={FiLock} placeholder="confirm your new password" type="password" ></Input>
                        <Button type="submit">Alterar senha</Button>
                    </Form>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    )
}

    