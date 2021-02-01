import styled from "styled-components"
import { shade } from "polished"


export const Container = styled.div`
    overflow-y:hidden;
    header{
        height:100px;
        background:#28262e;
        display:flex;
        width:100%;
        align-items:center;
        div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;
            svg {
                color: #999591;
                width: 24px;
                height: 24px;
            }
        }
    }


`

export const Content = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    margin:0 auto;
    width:100%;
    form{
        margin:80px 0;
        width:340px;
        text-align:center;

        display:flex;
        flex-direction:column;

        h1{
            margin-bottom:24px;
            font-size:20px;
            text-align:left;
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
`

export const AvatarInput = styled.div`
    margin-bottom:32px;
    width:186px;
    align-self:center;
    position:relative;
    
    img{
        width:186px;
        height:186px;
        border-radius:50%;
        
    }

    label{
        position:absolute;
        width:48px;
        height:48px;
        background:#ff9000;
        border-radius:50%;
        right:0;
        bottom:0;
        transition:background-color 0.2s;
        display:flex;
        align-items:center;
        justify-content:center;
        color:black;
        cursor: pointer;
        input{
            display:none;
        }

        &:hover{
                background:${shade(0.2,`#ff9000`)}
        }
        border:0;
        svg{
            width:20px;
            height:20px;
            
        }
    }

    

`

