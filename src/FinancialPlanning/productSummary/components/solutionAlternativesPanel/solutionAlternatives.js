import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import ProductTable,{ Column }  from 'common/components/table/ProductsTable';
import StickyHeader from './stickyHeader/StickyHeader';
import RiskingRating from './riskingRating';
import ProductType from './productType/productType';
import ProductName from './productName/productName';
import DeleteMessage from '../deleteMessagePanel'

export default class SolutionAlternatives extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modal:null,
                // data:[
                //     [{alternativeProductAttributeValue:"U62459",productName:"AB-American Income Portfolio…",productId:"0"},{alternativeProductAttributeValue:"HSBC CIT - HSBC asia pacific ex japan eq volatility"},{alternativeProductAttributeValue:"3"}],
                //     [{alternativeProductAttributeValue:"U62459",productName:"AB-American Income Portfolio…",productId:"1"},{alternativeProductAttributeValue:"Certificates of Deposit"},{alternativeProductAttributeValue:"4"}],
                //     [{alternativeProductAttributeValue:"U62459",productName:"AB-American Income Portfolio…",productId:"2"},{alternativeProductAttributeValue:"HSBC CIT - HSBC asia pacific ex japan eq volatility"},{alternativeProductAttributeValue:"1"}],
                //     [{alternativeProductAttributeValue:"U62459",productName:"AB-American Income Portfolio…",productId:"3"},{alternativeProductAttributeValue:"Certificates of Deposit"},{alternativeProductAttributeValue:"2"}]]
        };
        this.handleAddMore = this.handleAddMore.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
    }
    //handle add more product 
   handleAddMore(){
       this.props.addMoreProduct(this.props.alternativeProductList);
   }
   handleCancel(){
       this.setState({modal:null})
   }
    handleConfirm(indexid){
        this.setState({modal:null});
        this.props.removeConfirmProduct(indexid);
   }
    //handle remove data row
    removeProduct(indexid){
        const params={
                cancel:this.handleCancel,
                confirm:this.handleConfirm,
                indexid
            }
        const modal = (<DeleteMessage {...params}/>);
        this.setState({modal});
    }
    render () {
      
        return (
            <div className={styles.solutionMain}>
                <ProductTable 
                    theme={styles} data={this.props.alternativeProductList}
                    rowHeight={100}
                    headerHeight={100}
                    remove={this.removeProduct.bind(this)}
                    headerComponent={<StickyHeader/>}>
                    <ProductType/>
                    <ProductName/>
                    <RiskingRating />
                </ProductTable>  
                <div className={styles.solutionMain}>
                    <div className={styles.noteAdd}><span>Note:</span>You have selected the following product(s) for this goal.</div>
                    <div className={styles.Add} >
                        <span onClick={this.handleAddMore}>
                            <FontIcon icon="add" className={styles.iconAdd} />&nbsp;&nbsp;Add more products
                        </span>
                    </div>
            
                </div> 
                {this.state.modal}     
             </div>
        );
    }
}
