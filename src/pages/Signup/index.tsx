import React,{useCallback,useRef} from "react"
import logo from "../../assets/logo.svg"
import {Container,Content,Background,AnimationContainer} from "./styles"
import {FormHandles} from "@unform/core"
import { FiArrowLeft,FiUser,FiMail,FiLock} from "react-icons/fi"
import * as Yup from "yup"
import { Form } from "@unform/web"
import api from "../../services/api"
import {Link,useHistory} from "react-router-dom"
import Input from "../../components/input/index"
import Button from "../../components/button/index"
import getValidationError from "../../utils/getValidationErros"
import {useToast} from "../../hooks/ToatContext"

interface USER{
    name:string
    email:string
    password:string
}

export const Signup : React.FC = () =>{
    const {addToast} = useToast()
    const History = useHistory()
    const formRef = useRef<FormHandles>(null)

    const handleSubmit = useCallback(async (data:USER)=>{
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name:Yup.string().required("name is required"),
                email:Yup.string().required("email is required").email("type a valid e-mail"),
                password:Yup.string().min(6,"your password must have at least 6 characteres")
            })
            await schema.validate(data,{
                abortEarly:false
            })

            await api.post("/users",(data))

            addToast({type:"success",title:"cadastro relizado",description:"voce ja pode fazer o login"})
            History.push("/")
        }catch(err){
            if(err instanceof Yup.ValidationError){
                formRef.current?.setErrors(getValidationError(err))
                return
            }
            addToast({
                type:"error",
                description:"ocorreu um erro no cadastro",
                title:"erro no login"
            })
        }
    },[addToast,History])

    return(
        <Container>
        <Background/>
        <Content>
            <AnimationContainer>
                <img src={logo} alt="goBarber"/>
                <Form ref={formRef}  onSubmit={handleSubmit} >
                    <h1>faça seu Cadastro</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" type="text" ></Input>
                    <Input name="email" icon={FiMail} placeholder="E-mail" type="text" ></Input>
                    <Input name="password" icon={FiLock} placeholder="password" type="password" ></Input>
                    <Button type="submit" >Cadastrar</Button>
                </Form>

                <Link to="/">
                    <FiArrowLeft></FiArrowLeft>
                    Voltar ao Login
                </Link>
            </AnimationContainer>
        </Content>
    </Container>
    )
}