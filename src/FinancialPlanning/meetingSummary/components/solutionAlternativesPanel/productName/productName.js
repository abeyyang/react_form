import React,{Component} from 'react';

import styles from './style.scss';

class ProductName extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const {data}= this.props;
            return (
                <div className={styles.productName}>
                  <span>{data.alternativeProductAttributeValue}</span>
                </div>
            );
         }
    }

export default ProductName;
