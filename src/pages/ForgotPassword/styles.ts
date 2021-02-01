import styled,{keyframes} from "styled-components"
import signInBackgroundImage from "../../assets/sign-in-background.png"
import { shade } from "polished"

export const Container = styled.div`
    height:100vh;
    display:flex;
    align-items:stretch;

`;
const AppearFromLeft = keyframes`
    from {
        opacity:0;
        transform:translateX(-50px)
    }
    to {
        opacity:1;
        transform:translateX(0)
    }

`;
export const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    width:100%;
    max-width:700px;
    
`

export const AnimationContainer = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    animation:${AppearFromLeft} 1s;
    form{
        margin:80px 0;
        width:340px;
        text-align:center;

        h1{
            margin-bottom:24px;
        }
       
        a{
            color:#F4EDE8;
            display:block;
            margin-top:24px;
            text-decoration:none;
            transition:background-color 0.2;
            &:hover{
                color:${shade(0.2,"#F4EDE8")}
            }
        }
    }
    > a{
        color:#FF9000;
        display:block;
        margin-top:20px;
        text-decoration:none;
        transition:background-color 0.2;
        &:hover{
            color:${shade(0.2,"#FF9000")}
        }
        display:flex;
        align-items:center;

        svg{
            margin-right:20px;
        }
    }

`;
export const Background = styled.div`
    flex:1;
    background: url(${signInBackgroundImage}) no-repeat center;
    background-size:cover;

`;
