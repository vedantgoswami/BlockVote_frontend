import React from 'react'
import styled from 'styled-components'

const Btn = styled.button`
    display: inline-block;
    background-color: black;
    color: white;
    outline: none;
    border: none;
    font-size: 20px;
    padding: 0.7rem 2.3rem;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;

    
    
    &::after{
      content: ' ';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%) scale(0);
      border: 2px solid black;
      width: 100%;
      height: 100%;
      border-radius: 50px;
      transition: all 0.2s ease;
    }
    &:hover::after{
      transform: translate(-50%,-50%) scale(1);
      padding: 0.2rem;
    }
    
`

const Button = ({id,text,mgleft,link,onClick}) => {
  return (
    <Btn id={id} onClick={onClick}>
        <a style={{'color':'white','text-decoration': 'none',marginBottom: mgleft }} href={link} aria-label={text} target="_blank" rel="noreferre">
           {text} 
        </a>
    </Btn>
  )
}

export default Button;