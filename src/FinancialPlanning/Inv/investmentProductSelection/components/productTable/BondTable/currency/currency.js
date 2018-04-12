import React, { Component } from 'react';
import styles from './style.scss';

const currencyBond = (props)=>{
    const { data,row,column} = props;
    return (
        <div>
            <p>{data.attribute.ccyProdCde}</p>
        </div>
    );
};



export default currencyBond;