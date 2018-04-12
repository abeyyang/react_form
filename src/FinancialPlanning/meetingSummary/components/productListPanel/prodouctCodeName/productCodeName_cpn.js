import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';

const ProductCodeName = (props) => {
        const {data}= props;
        return (
            <div>
                <div className={styles.productCodeName}>        
                     <div className={styles.product}>                      
                         <p className={styles.productName}> {data.productName}</p>
                     </div>
                </div>
            </div>
        );
    }

export default ProductCodeName;
