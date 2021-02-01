import styled, { css } from "styled-components"
import Tooltip from "../tooltip/index"

interface ContainerProps {
    isFocused:boolean
    isField:boolean
    isErrored:boolean
}


export const Container = styled.div<ContainerProps>`
    color:#F4EDE8;
    background:#232129;
    border-radius:10px;
    border:2px solid #232129;
    padding:16px;
    width:100%;
    display:flex;
    align-items:color-interpolation-filters;
    & + div{
                margin-top:8px;
    }

    
    input{  
        flex:1;
        border:0;
        background-color:transparent; 
        color:white;
        }
        ${
            props=>props.isErrored && css`
                border-color:#c53030;
                color:#c53030;
            `
        }
        ${
            props=>props.isFocused && css`
                border-color:#ff9000;
                color:#ff9000;
            `
        }
        
        svg{
            margin-right:16px;
            color:#666360;
            ${
                props=>props.isErrored && css`
                    color:#c53030;
                `
            }
            ${
            props=>props.isFocused && css`
                    color:#ff9000;
                `
            }
            
            ${
            props=>props.isField && css`
                    color:#ff9000;
                `
            }
            
        }    
`

export const Error = styled(Tooltip)`
    margin-left:16px;
    height:20px;
    svg{
        margin:0;
    }
    span{
        background:#c53030;
        color:#fff;
        &::before{
            border-color:#c53030 transparent
        }
    }

`