import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';

const ProductCodeName = (props) => {
        const {data}= props;
        return (
            <div>
                <div className={styles.productCodeName}>
                    {/*<h5><strong>U62494</strong></h5>*/}
                    <div className={styles.deleteIcon}>
                         <span onClick={props.remove.bind(this,data.rowIndex)}>
                             <FontIcon icon="delete" className={styles.icon} />
                         </span>
                     </div>
                     <div className={styles.product}>
                         <p className={styles.productCode}>{data.productAlternativeNumber}</p>
                         <p className={styles.productName}> {data.productName}</p>
                     </div>
                </div>
            </div>
        );
    }

export default ProductCodeName;
