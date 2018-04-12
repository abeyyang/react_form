import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';

const ProductCodeName = (props) => {
        const {data}= props;
        return (
            <div>
                <div className={styles.productCodeName}>
                <span onClick={props.remove.bind(this,data.productId)}>
                    <FontIcon icon="delete" className={styles.icon} /></span>
                    <span className={styles.productName}>{data.productAlternativeNumber}{data.productName}

                    </span>
                </div>
            </div>
        );
    }

export default ProductCodeName;
