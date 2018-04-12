import React,{Component} from 'react';

import styles from './style.scss';

const ProductType = (props) => {
        const {data}= props;
        return (
           <div className={styles.productType}>
               <span>{data.productTypeCode}</span>
            </div>   
        );
    }

export default ProductType;
