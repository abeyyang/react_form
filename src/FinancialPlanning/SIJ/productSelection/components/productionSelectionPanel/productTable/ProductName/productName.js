import React, { Component } from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';

const ProductName = (props) => {
    const { data,row,column} = props;
    return (
        <div>
            <div className={styles.productName}>
                
                {data.value}

                <div className={styles.productCode}>#{data.productCode}</div>

            </div>
            
            
            <div className={styles.productNameMoreInfo} onClick={props.expand.bind(this,row)}><FontIcon icon="more-vertical" className={styles.moreVertical}/></div>
        </div>
    );
}

export default ProductName;
