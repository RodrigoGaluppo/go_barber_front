import React,{ChangeEvent, useCallback,useRef} from "react"
import {Container,Content,AvatarInput} from "./styles"
import {FormHandles} from "@unform/core"
import {FiUser,FiMail,FiLock, FiCamera, FiArrowLeft} from "react-icons/fi"
import * as Yup from "yup"
import { Form } from "@unform/web"
import api from "../../services/api"
import {Link, useHistory} from "react-router-dom"
import Input from "../../components/input/index"
import Button from "../../components/button/index"
import getValidationError from "../../utils/getValidationErros"
import {useToast} from "../../hooks/ToatContext"
import { useAuth } from "../../hooks/AuthContext"

interface ProfleFormData{
    name:string
    email:string
    old_password:string
    password:string
    password_confirmation:string
}

export const Profile : React.FC = () =>{
    const {addToast} = useToast()
    const History = useHistory()
    const formRef = useRef<FormHandles>(null)

    const {user,updateUser} = useAuth()

    const handleAvatarChange = useCallback((e:ChangeEvent<HTMLInputElement>)=>{

        const data = new FormData()
        if(e.target.files){
            data.append("avatar",e.target.files[0])

            api.patch("/users/avatar",data)
            .then((res)=>{
                addToast({
                    type:"success",
                    title:"avatar atualizado",
                    description:""
                })
                updateUser(res.data)
            })
            .catch((e)=>{
                addToast({
                    type:"error",
                    title:"erro com o avatar atualizado",
                    description:e
                })
            })
        }
    },[addToast,updateUser])

    const handleSubmit = useCallback(async (data:ProfleFormData)=>{
        try{
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name:Yup.string().required("name is required"),
                email:Yup.string().required("email is required").email("type a valid e-mail"),
                old_password:Yup.string(),
                password:Yup.string().when("old_password",{
                    is:val => !!val.length,
                    then:Yup.string().required(),
                    otherwise:Yup.string()
                }),
                password_confirmation:Yup.string().when("old_password",{
                    is:val => !!val.length,
                    then:Yup.string().required(),
                    otherwise:Yup.string()
                }).oneOf(
                    [Yup.ref("password"),undefined],
                    "confirmacao invalida"
                )
            })
            await schema.validate(data,{
                abortEarly:false
            })
            console.log(data);
            
            const formData = Object.assign({
                name:data.name,
                email:data.email
            },data.old_password ? {
                old_password:data.old_password,
                password:data.password,
                password_confirmation:data.password_confirmation
            }:{})

            const newUser = await api.put("/profile",formData)

            updateUser(newUser.data)

            addToast({type:"success",title:"perfil atualizado",description:"voce ja pode fazer o login"})
            History.push("/")
        }catch(err){
            console.log(err);
            
            if(err instanceof Yup.ValidationError){
                formRef.current?.setErrors(getValidationError(err))
                return
            }
            addToast({
                type:"error",
                description:"erro",
                title:"erro no login"
            })
        }
    },[addToast,History])

    return(
        <Container>
        <Content>
                <header>
                    <div>
                        <Link to="/" >
                            <FiArrowLeft>

                            </FiArrowLeft>
                        </Link>
                    </div> 
                </header>
                <Form ref={formRef} initialData={{
                    name:user.name,
                    email:user.email,
                }} onSubmit={handleSubmit} >
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name}/>
                        <label htmlFor="avatar" >
                            <FiCamera></FiCamera>
                            <input type="file" name="avatar" id="avatar" onChange={handleAvatarChange} />
                        </label>

                        
                    </AvatarInput>
                    <h1>Meu Perfil</h1>
                    <Input name="name" icon={FiUser} placeholder="Nome" type="text" ></Input>
                    <Input name="email" icon={FiMail} placeholder="E-mail" type="text" ></Input>
                    <Input containerStyle={{marginTop:30}} name="old_password" icon={FiLock} placeholder="senha atual" type="password" ></Input>
                    <Input name="password" icon={FiLock} placeholder="new password" type="password" ></Input>

                    <Input name="password_confirmation" icon={FiLock} placeholder="confirmar senha" type="password" ></Input>
                    <Button type="submit" >Confirmar mudanças</Button>
                </Form>
        </Content>
    </Container>
    )
}