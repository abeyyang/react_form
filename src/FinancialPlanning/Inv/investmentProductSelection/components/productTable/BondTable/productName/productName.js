import React, { Component } from 'react';
import styles from './style.scss';

const productNameBond = (props)=>{
    const { data,row,column} = props;
    return (
        <div>
            <p>{data.attribute.prodName}</p>
        </div>
    );
};



export default productNameBond;
