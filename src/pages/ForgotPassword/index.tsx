import React,{useCallback,useRef, useState}  from "react"
import {FormHandles} from "@unform/core"
import logo from "../../assets/logo.svg"
import {Container,Content,AnimationContainer,Background} from "./styles"
import { FiLogIn,FiMail } from "react-icons/fi"
import {Form} from "@unform/web"
import * as Yup from "yup"
import getValidationError from "../../utils/getValidationErros"
import Input from "../../components/input/index"
import Button from "../../components/button/index"
import { useToast} from "../../hooks/ToatContext"
import {Link} from "react-router-dom"
import api from "../../services/api"

interface ForgotPasswordFormData{
    email:string
}

export const ForgotPassword : React.FC = () =>{
    const [loading,setLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const {addToast} = useToast()
    const handleSubmit = useCallback(async (data:ForgotPasswordFormData)=>{
        try{
            setLoading(true)
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email:Yup.string().required("email is required").email("type a valid e-mail"),
            })

            await schema.validate(data,{
                abortEarly:false
            })

            await api.post("/password/forgot",{
                email:data.email
            })
            addToast({
                type:"success",
                title:"E-mail de recuperacao de Senha enviado",
                description:"enviamos um email par verificar a recuperacao de senha"
            })
            // eslint-disable-next-line no-restricted-globals
            
            //History.push("/dashboard")

        }catch(err){
            if(err instanceof Yup.ValidationError){
                formRef.current?.setErrors(getValidationError(err))
                return
                
            }
            addToast({
                type:"error",
                description:"ocorreu um erro na recuperacao de senha",
                title:"erro no login"
            })
        }finally{
            setLoading(false)
        }
    },[addToast])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="goBarber"/>
                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>Recuperar a senha</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail" type="text" ></Input>
                        <Button loading={loading} type="submit">Recuperar</Button>
                    </Form>
        
                    <Link to="/">
                        <FiLogIn></FiLogIn>
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    )
}

    