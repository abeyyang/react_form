import React, { Component } from 'react';
import styles from './style.scss';

const ProductCurrency = (props) => {
    const { data } = props;
    return (
        <div>
            <p>{data.attribute.ccyProdCde}</p>
        </div>
    );
}

export default ProductCurrency;
