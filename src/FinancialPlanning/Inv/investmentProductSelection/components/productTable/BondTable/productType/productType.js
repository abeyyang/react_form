import React, { Component } from 'react';
import styles from './style.scss';

const productTypeBond = (props)=>{
    const { data,row,column} = props;
    return (
        <div>
            {/*<a href="javascript:void(0)" onClick={props.expand.bind(this,row)}> 
                
            </a>*/}
            <p>{data.attribute.prodTypCde}</p>
        </div>
    );
};



export default productTypeBond;
