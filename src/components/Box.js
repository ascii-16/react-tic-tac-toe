import React from 'react';
import '../styles/Box.scss';

const Box = (props) => {
  return <span 
    className={`box ${ props.value ? props.value : "" }`} 
    onClick={props.onClick}>
    {props.value}
  </span>
}

export default Box;