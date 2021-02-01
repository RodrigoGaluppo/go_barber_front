import React,{ createContext,useCallback, useState,useContext } from "react"
import api from "../services/api"

interface User{
    id:string,
    avatar_url:string,
    name:string
    email:string
}

interface AuthState {
    token:string
    user:User
}


interface signInCredentials{
    email:string
    password:string
}

interface AuthContextInterface{
    user:User
    signIn(credentials:signInCredentials):Promise<void>
    signOut():void
    updateUser(user:User):void
}
const AuthContext = createContext<AuthContextInterface>({} as AuthContextInterface);

export const AuthProvider:React.FC = ({children})=>{
    const [data,setData] = useState<AuthState>(()=>{
        const token = localStorage.getItem("@GoBarber:token")
        let user = localStorage.getItem("@GoBarber:user")
        
        if (token && user){
            api.defaults.headers.authorization = `Bearer ${token}`
            return {token,user: JSON.parse(user)}
        }

        return {} as AuthState
    })
    const signIn = useCallback(async ({ email,password })=>{
        const response = await api.post("sessions",{
            email,
            password
        })
        const {token,user} = response.data

        localStorage.setItem("@GoBarber:token",token)
        localStorage.setItem("@GoBarber:user",JSON.stringify(user))

        api.defaults.headers.authorization = `Bearer ${token}`

        setData({token,user})
    },[])
    const signOut = useCallback(()=>{
        localStorage.removeItem("@GoBarber:token")
        localStorage.removeItem("@GoBarber:user")

        setData({} as AuthState)
    },[])

    const updateUser = useCallback((user:User)=>{
        localStorage.setItem("@GoBarber:user",JSON.stringify(user))
        setData({
            token:data.token,
            user
        })
    },[setData,data.token])

    return(
        <AuthContext.Provider value={{user:data.user,signIn,signOut,updateUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth():AuthContextInterface{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("use Auth must be used within AuthProvider")
    }
    return context
}