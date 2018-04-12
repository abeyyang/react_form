import React,{Component} from 'react';

import styles from './style.scss';

const ProductName = (props) => {
        const {data}= props;
        return (
            <div>
                {data.alternativeProductAttributeValue == "add productName"?<div className={styles.productNameInput}>
                                            <input type="text" name="ProductName"  placeholder="Wealth as..." />
                                        </div>:<div><span>{data.alternativeProductAttributeValue}</span></div>}
                
            </div>
        );
    }

export default ProductName;
