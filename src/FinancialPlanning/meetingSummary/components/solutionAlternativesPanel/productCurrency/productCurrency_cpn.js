import React,{Component} from 'react';

import styles from './style.scss';

const ProductCurrency = (props) => {
        const {data}= props;
        return (
           <div className={styles.productCurrency}>
               <span>{data.alternativeProductAttributeValue}</span>
            </div>   
        );
    }

export default ProductCurrency;