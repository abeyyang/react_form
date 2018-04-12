import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import ProductTypeSelect from "./productTypeSelect"

const ProductType = (props) => {
     const { data } = props;
     console.log("data.value",data.alternativeProductAttributeValue,data);
        return (
            <div className={styles.productType}>
                {data.alternativeProductAttributeValue =="add productType"?<ProductTypeSelect data={data} change = {props.change.bind(this)} remove={props.remove.bind(this)}/>:
                <div ><span onClick={props.remove.bind(this,data.rowIndex)}><FontIcon icon="delete"  className={styles.icon}/> </span><span>{data.alternativeProductAttributeValue}</span></div>}
            </div>
        );
    }

export default ProductType;
