import {ToastProvider }from "./ToatContext"
import { AuthProvider } from "./AuthContext"
import React from "react"

const AppProvider:React.FC = ({children})=>{
   return(
    <>
        <AuthProvider>
            <ToastProvider>
                {children}
            </ToastProvider>
        </AuthProvider>
    </>
   )
}
export default AppProvider