import React,{useCallback,useRef}  from "react"
import {FormHandles} from "@unform/core"
import logo from "../../assets/logo.svg"
import {Container,Content,AnimationContainer,Background} from "./styles"
import { FiLogIn,FiMail,FiLock } from "react-icons/fi"
import {Form} from "@unform/web"
import * as Yup from "yup"
import getValidationError from "../../utils/getValidationErros"
import Input from "../../components/input/index"
import Button from "../../components/button/index"
import { useAuth} from "../../hooks/AuthContext"
import { useToast} from "../../hooks/ToatContext"
import {Link,useHistory,Redirect} from "react-router-dom"

interface SighnInFormData{
    email:string
    password:string
}

export const SignIn : React.FC = () =>{
    const formRef = useRef<FormHandles>(null)
    const { signIn } = useAuth()
    const {addToast} = useToast()
    const History = useHistory()
    const handleSubmit = useCallback(async (data:SighnInFormData)=>{
        
        try{
            
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email:Yup.string().required("email is required").email("type a valid e-mail"),
                password:Yup.string().required("password is required")
            })

            await schema.validate(data,{
                abortEarly:false
            })

            await signIn({
               email:data.email,
               password:data.password
            })
            // eslint-disable-next-line no-restricted-globals
            
            History.push("/dashboard")

        }catch(err){
            if(err instanceof Yup.ValidationError){
                formRef.current?.setErrors(getValidationError(err))
                return
            }
            addToast({
                type:"error",
                description:"ocorreu um erro no login",
                title:"erro no login"
            })
        }
    },[signIn,addToast,History])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="goBarber"/>
                    <Form ref={formRef} onSubmit={handleSubmit} >
                        <h1>faça seu login</h1>
                        <Input name="email" icon={FiMail} placeholder="E-mail" type="text" ></Input>
                        <Input name="password" icon={FiLock} placeholder="password" type="password" ></Input>
                        <Button type="submit">Entrar</Button>
                        <Link to="/forgot-password">
                            <FiLock></FiLock>  Esqueci minha senha
                        </Link>
                    </Form>
        
                    <Link to="/signup">
                        <FiLogIn></FiLogIn>
                        Criar Conta
                    </Link>
                </AnimationContainer>
            </Content>
            <Background/>
        </Container>
    )
}

    