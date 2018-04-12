import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';

const ProductTypeSelect = (props) => {
        const { data } = props;
        return (
             <div className={styles.producTypeSelect}>
                <span onClick={props.remove.bind(this,data.rowIndex)}><FontIcon icon="delete"  className={styles.icon}/></span><select className={styles.selectright}>
                    <option value="Bonds">Bonds</option>
                    <option value="Unit trust">Unit trust</option>
                </select>
            </div>
        );
    }

export default ProductTypeSelect;