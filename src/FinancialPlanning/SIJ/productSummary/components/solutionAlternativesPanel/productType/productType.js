import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import ProductTypeSelect from "./productTypeSelect"

const ProductType = (props) => {
     const { data } = props;
        return (
            <div className={styles.productType}>
                {data.alternativeProductAttributeValue =="add productType"?<ProductTypeSelect data={data} remove={props.remove.bind(this)}/>:
                <div ><span onClick={props.remove.bind(this,data.index)}><FontIcon icon="delete"  className={styles.icon}/> </span><span>{data.alternativeProductAttributeValue}</span></div>}
            </div>
        );
    }

export default ProductType;
