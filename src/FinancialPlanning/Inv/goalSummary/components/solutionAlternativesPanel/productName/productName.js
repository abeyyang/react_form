import React,{Component} from 'react';

import styles from './style.scss';

class ProductName extends Component{
    constructor(props){
        super(props);
        this.productNameObj={
            alternativeProductAttributeValue:"",
            alternativeProductAttributeCode:"",
            rowIndex:""
        }
    }
    handleChange(data,event){
        console.log("handleChangeproduct",data,event.target.value);
        // data.alternativeProductAttributeValue = event.target.value;
        // let productNameObj = Object.assign({},data);
        this.productNameObj.alternativeProductAttributeValue = event.target.value;
        this.productNameObj.alternativeProductAttributeCode = data.alternativeProductAttributeCode;
        this.productNameObj.rowIndex = data.rowIndex;
        this.props.change(this.productNameObj);
    }
    render(){
        const {data}= this.props;
            return (
                <div>
                    {data.alternativeProductAttributeValue == "add productName"?<div className={styles.productNameInput}>
                                                <input type="text" name="ProductName" onChange = {this.handleChange.bind(this,data)}  placeholder="Wealth as..." />
                                            </div>:<div><span>{data.alternativeProductAttributeValue}</span></div>}
                </div>
            );
         }
    }

export default ProductName;
