import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'wealth/lib/web/components/ui/button';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import ProductTable, { Column } from 'common/components/table/ProductsTable';
import Pagination from 'wealth/lib/web/components/widgets/pagination';
import PageButtonGroup from 'wealth/lib/web/components/widgets/pageButtonGroup';
import RouteHelper from 'common/lib/routeHelper';
import styles from './style.scss';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router'
import Loading from 'common/components/Loading';
import QuestionsAndCriteriasComponent from '../questionAndCriterias/questionAndCriterias_cpn';
import ProductName from './UTTable/ProductName';
import SuitablityCheck from './UTTable/SuitabilityCheck';
import RiskLevel from './UTTable/RiskLevel';
import ProductCurrency from './UTTable/ProductCurrency';
import SixMonth from './UTTable/SixMonth';
import OneYear from './UTTable/OneYear';
import YTD from './UTTable/YearTener';
import LastUpdateTime from './UTTable/LastUpdateTime';
import Discussed from './UTTable/Discussed';
import Add from './UTTable/Add';
import ProductTypeBond from './BondTable/productType';
import ProductNameBond from './BondTable/productName';
import ProductCodeBond from './BondTable/productCode';
import RiskLevelBond from './BondTable/riskLevel';
import CurrencyBond from './BondTable/Currency';
import SuitabilityCheckBond from './BondTable/suitabilityCheck';
import DiscussedBond from './BondTable/discussed';
import AddOrRemoveBond from './BondTable/addOrRemove';
import StickyHeader from "./UTTable/StickyHeader";
import StickyHeaderUT from "./BondTable/StickyHeader";
import ContextualMenu from "./UTTable/contextualMenu";
// import ContextualMenuForBond from "./ContextualMenuForBond";
import ProductDetail from "./UTTable/productDetail";
import {ScrollTab} from 'CommonUI/Form';

class ProductTableComponent extends React.Component{
     constructor(props){
        super(props);
        this.state={
            showSelectedCriteria:true,
            openedIndex:-1,
            expandIndex:-1,
            productTab:"UT"
        }
        this.backToDashborad = this.backToDashborad.bind(this);
        this.goToInvProdSummary = this.goToInvProdSummary.bind(this);
        this.handleTableCellClick = this.handleTableCellClick.bind(this);
        this.handleTableHeaderClick = this.handleTableHeaderClick.bind(this);
        this.getRowKey = this.getRowKey.bind(this);
        this.open = this.open.bind(this);
        this.expand = this.expand.bind(this);
        this.close = this.close.bind(this);
        this.add = this.add.bind(this);
        this.discuss = this.discuss.bind(this);
        this.saveProducts = this.saveProducts.bind(this);
        this.onSelectPageButton = this.onSelectPageButton.bind(this);
        this.turnPage = this.turnPage.bind(this);
        this.turnPageForBond = this.turnPage.bind(this);
        this.scrollTabClick = this.scrollTabClick.bind(this);
    }

    handleTableCellClick(){
        console.log("check Cell");
    }
    backToDashborad(){
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
    }


    goToInvProdSummary(){
        const target ="/group-sfp-war/main/en-gb/invProdSummary";
        browserHistory.push(target);
    }

    getRowKey(){
        return 1;
    }
    handleTableHeaderClick(){

    }
    
    scrollTabClick(event, tab){
        console.log(event);
        this.setState({
            [event.code]:event.value
        });
        console.log(event, tab);
    }
    open(row){
        console.log("open",row);
        let dataList = this.state.data;
        this.setState({
            expandIndex :-1,
            openedIndex : row
        });
    }
    expand(row,event){
        console.log("expand",row);
        if(this.state.expandIndex == row){
            this.setState({
                expandIndex :-1,
                openedIndex :-1
            });
            
        } else {
            this.setState({
                expandIndex :row,
                openedIndex :-1
            });
        }
        
    }
    close(row){
        this.setState({
            expandIndex:-1,
            openedIndex:-1
        });
    }
    add(product,event){
        let productSearchResult = this.props.productSearchResult;
        let selectedProducts = this.props.selectedProducts;
        let discussedProducts = this.props.discussedProducts;
        if(event.target.checked){
            product.checked=true;
            product.discussed=true;
            selectedProducts.push(product);
            let existDisccuss = false;
            for(let j = 0;j<discussedProducts.length;j++){
                if(discussedProducts[j].productKey == product.productKey){
                    existDisccuss = true;
                }
            }
            if(!existDisccuss){
                discussedProducts.push(product);
            }
        } else {
            product.checked=false;
            let addIndex = -1;
            for(let i =0;i<selectedProducts.length;i++){
                if(selectedProducts[i].productKey == product.productKey){
                    addIndex = i;
                }
            }
            if(addIndex != -1){
                selectedProducts.splice(addIndex,1);
            }
        }
        productSearchResult.productData = productSearchResult.productData.filter((item) =>{
            if(item[0].productKey == product.productKey){
                for(let i = 0; i< 10;i++){
                    item[i] = product;
                }
            }
            return item;
        });
        let request = {
            productSearchResult,
            selectedProducts,
            discussedProducts
        };
        this.props.addProducts(request);
    }

    discuss(product,event){
        let productSearchResult = this.props.productSearchResult;
        let discussedProducts = this.props.discussedProducts;
        let selectedProducts = this.props.selectedProducts;
        if(event.target.checked){
            product.discussed=true;
            let existDisccuss = false;
            for(let j = 0;j<discussedProducts.length;j++){
                if(discussedProducts[j].productKey == product.productKey){
                    existDisccuss = true;
                }
            }
            if(!existDisccuss){
                discussedProducts.push(product);
            }
        } else {
            product.discussed=false;
            let discussIndex = -1;
            for(let i =0;i<discussedProducts.length;i++){
                if(discussedProducts[i].productKey == product.productKey){
                    discussIndex = i;
                }
            }
            if(discussIndex != -1){
                discussedProducts.splice(discussIndex,1);
            }
           
        }
        productSearchResult.productData = productSearchResult.productData.filter((item) =>{
            if(item[0].productKey == product.productKey){
                for(let i = 0; i< 10;i++){
                    item[i] = product;
                }
            }
            return item;
        });
        let request = {
            productSearchResult,
            selectedProducts,
            discussedProducts
        };
        this.props.addProducts(request);
    }
    saveProducts(){
        let selectedProducts = this.props.selectedProducts;
        let discussedProducts = this.props.discussedProducts;
        let requestPIQAnswer = this.props.requestPIQAnswer;
        let request = {
            selectedProducts,
            discussedProducts,
            requestPIQAnswer
        };
        this.props.reviewProducts(request);
    }

    onSelectPageButton (value) {
        console.log('page resize to : ' + value);
    }
    turnPage(page){
        console.log('turn to page : ' + page);
    }

    render(){
        const {productSearchResult,productSearchResultForBond,productSearch} = this.props;
        let overallPaginationNode = '';
        let overallPaginationNodeForBond = '';
        let currentPage=1;
        let totalPages =5;
        let list = [];
        let resultInfo = productSearchResult.resultInfo;
        const pageButton = [15, 40];
        let recordPerPage = 15;
    
        const pageButtonGroupNode = <PageButtonGroup options={pageButton} currentOption={currentPage} onSelect={this.onSelectPageButton} theme={styles} />;
        let paginationNode = '';
        if (recordPerPage !== 'ALL') {
            const totalPages = Math.ceil(resultInfo.totalCount / resultInfo.pageSize);
            if (totalPages > 1) {
                paginationNode = <Pagination currentPage={resultInfo.pageNum} totalPages={totalPages} turnPage={this.turnPage} theme={styles} />;
            }
        }
        overallPaginationNode = (
            <div className={styles.pageBtnGroupHolder}>
                <div className={styles.pageBtnGroupLeft}>
                    <span>Show:</span>
                    {pageButtonGroupNode}
                </div>
                <div className={styles.pageBtnGroupRight}>
                    {paginationNode}
                </div>
            </div>
        );

        let resultInfoForBond = productSearchResultForBond.resultInfo;
        const pageButtonForBond = [15, 40];
        let recordPerPageForBond = 15;
    
        const pageButtonGroupNodeForBond = <PageButtonGroup options={pageButton} currentOption={currentPage} onSelect={this.onSelectPageButton} theme={styles} />;
        let paginationNodeForBond = '';
        if (recordPerPageForBond !== 'ALL') {
            const totalPagesForBond = Math.ceil(resultInfoForBond.totalCount / resultInfoForBond.pageSize);
            if (totalPages > 1) {
                paginationNodeForBond = <Pagination currentPage={resultInfoForBond.pageNum} totalPages={totalPagesForBond} turnPage={this.turnPageForBond} theme={styles} />;
            }
        }
        overallPaginationNodeForBond = (
            <div className={styles.pageBtnGroupHolder}>
                <div className={styles.pageBtnGroupLeft}>
                    <span>Show:</span>
                    {pageButtonGroupNodeForBond}
                </div>
                <div className={styles.pageBtnGroupRight}>
                    {paginationNodeForBond}
                </div>
            </div>
        );

        let tabs = [
            {
                code:"productTab", 
                title: 'Unit trusts('+this.props.productSearchResult.resultInfo.totalCount+')',value:"UT"
            },
            {
                code:"productTab",title: 'Bonds/ CDs / SP / FX / Others('+this.props.productSearchResultForBond.resultInfo.totalCount+')',value:"BOND"
            }
        ];
        return (
            <div style={{"display":productSearch}} className={styles.tableContant}>
                <div className={styles.productFoundContent}>
                    <p className={styles.productTitle}>product</p>
                </div>
               
                <div className={styles.productFilter}>
                    <div className={styles.feProductLable}>
                        <ScrollTab theme={styles} tabs={tabs} activeIndex={0} onClick={this.scrollTabClick} /><br /><br />
                    </div>
               </div>
               <br/><br/>
               {
                   this.state.productTab=="UT"?<div className={styles.tables}>
                <ProductTable theme={styles} data={productSearchResult.productData}
                    column={10}
                    rowHeight={100}
                    headerHeight={100}
                    expandRowComponent={<ContextualMenu/>}
                    openedComponent={<ProductDetail/>}
                    headerComponent={<StickyHeader/>}
                    topOffset={0}
                    leftOffset={113}
                    add={this.add}
                    discuss={this.discuss}
                    open={this.open}
                    expand={this.expand}
                    close={this.close}
                    expandIndex={this.state.expandIndex}
                    openedIndex={this.state.openedIndex}
                >
                    <ProductName/>
                    <SuitablityCheck/>
                    <RiskLevel/>
                    <ProductCurrency/>
                    <SixMonth/>
                    <OneYear/>
                    <YTD/>
                    <LastUpdateTime/>
                    <Discussed/>
                    <Add/>
                </ProductTable>
                {overallPaginationNode}
                </div>:<div className={styles.tables}>
                <ProductTable theme={styles} data={productSearchResultForBond.productData}
                    column={8}
                    rowHeight={100}
                    headerHeight={100}
                    openedComponent={<ProductDetail/>}
                    headerComponent={<StickyHeaderUT/>}
                    topOffset={0}
                    leftOffset={113}
                    add={this.add}
                    discuss={this.discuss}
                    open={this.open}
                    expand={this.expand}
                    close={this.close}
                    expandIndex={this.state.expandIndex}
                    openedIndex={this.state.openedIndex}
                >
                    <ProductTypeBond/>
                    <ProductNameBond/>
                    <ProductCodeBond/>
                    <RiskLevelBond/>
                    <CurrencyBond/>
                    <SuitabilityCheckBond/>
                    <DiscussedBond/>
                    <AddOrRemoveBond/>
                </ProductTable>
                {overallPaginationNodeForBond}
                </div>
               }
               
                
                <div className={styles.bottom} >
                    <div className={styles.back}><a href="javascript:;" onClick={this.backToDashborad}><FontIcon icon="chevron-left" className={styles.icon} />Back to product mapping</a></div>
                    <div className={styles.button}>
                        <a href="javascript:void(0);" onClick={this.saveProducts}  className={styles.report}>Review product</a>
                    </div>
                    <div className={styles.decalration}><span>Disclaimer & declarations</span><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                </div>
            </div>
        )}
}
export default withLoadingScreenBeforeReadyToLeave(injectIntl(ProductTableComponent));