import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import ProductTable,{ Column }  from 'common/components/table/ProductsTable';
import StickyHeader from './stickyHeader/StickyHeader';
import RiskingRating from './riskingRating';
import ProductType from './productType/productType';
import ProductName from './productName/productName';
import DeleteMessage from '../messagePanel';

export default class SolutionAlternatives extends Component {
    constructor (props) {
        super(props);
        this.state = {
            modal:null,
            data: [
                    [{value:"Unit trust",index:"0"},{value:"HSBC CIT - HSBC asia pacific ex japan eq volatility"},{value:"0"}],
                    [{value:"Bonds",index:"1"},{value:"Certificates of Deposit"},{value:"5"}],
                    [{value:"add productType",index:"2"},{value:"add productName"},{value:"add Level"}],
                    [{value:"add productType",index:"3"},{value:"add productName"},{value:"add Level"}]]
                };
            this.handleAddMore = this.handleAddMore.bind(this);
            this.handleCancel = this.handleCancel.bind(this);
            this.handleConfirm = this.handleConfirm.bind(this);
            this.handleDiscussedProduct = this.handleDiscussedProduct.bind(this);
    }
    //handle add more product 
   handleAddMore(){
       debugger;
       this.props.addMoreProduct(this.props.alternativeProductList);
   }
   handleCancel(){
       this.setState({modal:null})
   }
    handleConfirm(indexid){
        debugger;
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
    //handle change productType
    handleDiscussedProduct(productData){

        // if(productData.alternativeProductAttributeCode == 'PRD_NAME'){
        //     productData.alternativeProductAttributeValue == 
        // }
        if(this.Constant.moreProducts.length > 0){
            for(let i = 0;i<this.Constant.moreProducts.length;i++){
                console.log("this.Constant.moreProducts.length[i]",this.Constant.moreProducts[i]);
                if(productData.alternativeProductAttributeCode == this.Constant.moreProducts[i].alternativeProductAttributeCode &&
                productData.rowIndex == this.Constant.moreProducts[i].rowIndex){
                    this.Constant.moreProducts[i].alternativeProductAttributeValue = productData.alternativeProductAttributeValue;
                    
                    console.log("moreProducts",this.Constant.moreProducts);
                    // this.props.alternativeProductList
                    return;
                }
            }
        }
        console.log("handleDiscussedProduct",productData,this.refs);
        this.Constant.moreProducts.push(productData);
        console.log("moreProducts",this.Constant.moreProducts);
        // if(data.){

        // }
        this.props.handleSaveDiscussedProduct(this.Constant.moreProducts);
        
    }
    render () {
        return (
            <div className={styles.ProdCard}>
            <h3>
                <span className={styles.title}>Alternatives Discussed</span>
                <FontIcon icon="circle-fill-information" className={styles.icon} />
                <a href="javascript:;" className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
            </h3>
                <ProductTable 
                    theme={styles} data={this.props.alternativeProductList}
                    rowHeight={100}
                    headerHeight={100}
                    change = {this.handleDiscussedProduct.bind(this)}
                    remove={this.removeProduct.bind(this)}
                    headerComponent={<StickyHeader/>}>
                    <ProductType/>
                    <ProductName/>
                    <RiskingRating />
                </ProductTable>
                <div className={styles.solutionMain}>
                <div className={styles.Add} ><span onClick={this.handleAddMore}><FontIcon icon="add" className={styles.iconAdd} />&nbsp;&nbsp;Add more products</span></div>
            </div> 
            {this.state.modal}
            </div>      
        
        );
    }
}
