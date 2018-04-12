import React, { Component } from 'react';
import styles from './style.scss';

const productCodeBond = (props)=>{
    const { data,row,column} = props;
    return (
        <div>
            <p>{data.attribute.prodSubtpCde}</p>
        </div>
    );
};



export default productCodeBond;
