import React,{Component} from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import {alternativeProductType} from 'config/investmentConfig'



class ProductTypeSelect extends Component {
        constructor(props){
            super(props);
        }
        handleProductType(data,event){
            console.log("handleProductType111",data.rowIndex,event.target.value);
            // data.alternativeProductAttributeValue = event.target.value;
            let productTypeObj = Object.assign({},data);
            productTypeObj.alternativeProductAttributeValue = event.target.value;
            this.props.change(productTypeObj);
        };
        render(){
            console.log("this.props",this.props);
             const { data } = this.props;
            return (
                <div className={styles.producTypeSelect}>
                    <span onClick={this.props.remove.bind(this,data.rowIndex)}><FontIcon icon="delete"  className={styles.icon}/></span>
                    <select className={styles.selectright} onChange={this.handleProductType.bind(this,data)}>
                        {
                            alternativeProductType.GOAL_SUMMARY_DISCUSSED_PRODUCT_TYPE.map((productType,key)=>{
                                return (<option key={key} value={productType.key}>{productType.value}</option>);
                            })
                        }
                    </select>
                </div>
            );
        }
    }

export default ProductTypeSelect;