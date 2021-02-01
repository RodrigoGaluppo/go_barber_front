import React from "react"
import { Switch } from "react-router-dom"
import {Signup} from "../pages/Signup/index"
import { SignIn } from '../pages/SignIn/index'
import { ForgotPassword } from '../pages/ForgotPassword'
import { ResetPassword } from '../pages/ResetPassword'

import Route from "./Route"
import DashBoard from "../pages/Dashboard/index"
import {Profile} from "../pages/Profile"

const Routes:React.FC = ()=>{
    return(
        <Switch>
            <Route path="/" exact component={SignIn} ></Route>
            <Route path="/signup"  component={Signup} ></Route>
            <Route path="/forgot-password"  component={ForgotPassword} ></Route>
            <Route path="/reset-password"  component={ResetPassword} ></Route>
            <Route path="/dashboard"  component={DashBoard} isPrivate ></Route>
            <Route path="/profile"  component={Profile} isPrivate ></Route>
        </Switch>
    )
}

export default Routes