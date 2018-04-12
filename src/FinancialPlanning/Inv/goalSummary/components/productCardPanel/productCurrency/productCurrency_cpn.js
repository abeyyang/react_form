import React,{Component} from 'react';

import styles from './style.scss';

const ProductCurrency = (props) => {
        const {data}= props;
        return (
           <div>
               <span>{data.currencyProductCode}</span>
            </div>   
        );
    }

export default ProductCurrency;