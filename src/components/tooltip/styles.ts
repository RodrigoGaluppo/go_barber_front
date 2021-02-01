import styled from "styled-components"


export const Container = styled.div`

    position:relative;
    span{
        background:#FF9000;
        padding:8px;
        border-radius:4px;
        font-weight:500;
        opacity:0;
        transition: opacity 0.4s;
        visibility:hidden;
        position:absolute;
        bottom:calc(100% + 12px);
        width:160px;
        left:5%;
        transform:(translateX(-50%));
        color:#312e38;
        &::before{
            content:"";
            border-style:solid;
            border-color:#FF9000 transparent;
            border-width:6px 6px 0 6px;
            left:5%;
            top:100%;
            position:absolute;
            transform:(translateX(-50%));
            
        }
        
    }
    &:hover span{
            opacity:1;
            transition: opacity 0.4s;
            visibility:visible;
        }
`