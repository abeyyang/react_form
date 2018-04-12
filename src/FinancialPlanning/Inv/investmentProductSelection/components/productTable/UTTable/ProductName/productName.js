import React, { Component } from 'react';
import styles from './style.scss';

const ProductName = (props) => {
    const { data,row,column} = props;
    return (
        <div>
            <a href="javascript:void(0)" onClick={props.expand.bind(this,row)}> 
                <p>{data.attribute.prodAltPrimNum}</p>
                <p>{data.attribute.prodName}</p>
            </a>
        </div>
    );
}
//
export default ProductName;
