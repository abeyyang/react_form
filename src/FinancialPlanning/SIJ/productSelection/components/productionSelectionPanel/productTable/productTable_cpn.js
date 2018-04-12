import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'wealth/lib/web/components/ui/button';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import ProductTable, { Column } from 'common/components/table/ProductsTable';
import RouteHelper from 'common/lib/routeHelper';
import styles from './style.scss';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router'
import Loading from 'common/components/Loading';
import ProductName from './ProductName';
import SuitablityCheck from './SuitabilityCheck';
import RiskLevel from './RiskLevel';
import ProductCurrency from './ProductCurrency';
import SixMonth from './SixMonth';
import OneYear from './OneYear';
import YTD from './YearTener';
import LastUpdateTime from './LastUpdateTime';
import Discussed from './Discussed';
import Add from './Add';
import StickyHeader from "./StickyHeader";
import ContextualMenu from "./contextualMenu";
import ProductDetail from "./productDetail";

class ProductTableComponent extends React.Component{
     constructor(props){
        super(props);
        this.state={
            showSelectedCriteria:true,
            data:this.props.data,
            openedIndex:-1,
            expandIndex:-1
        }
        let product = {
            productKey:{

            },
            productInfo:{

            },
            riders:{

            }
        }
        this.backToDashborad = this.backToDashborad.bind(this);
        this.goToInvProdSummary = this.goToInvProdSummary.bind(this);
        this.handleTableCellClick = this.handleTableCellClick.bind(this);
        this.handleTableHeaderClick = this.handleTableHeaderClick.bind(this);
        this.getRowKey = this.getRowKey.bind(this);
        this.open = this.open.bind(this);
        this.expand = this.expand.bind(this);
        this.close = this.close.bind(this);
    }
    shouldComponentUpdate(nextProps,nextState){
        return true;

    }

    handleTableCellClick(){
        console.log("check Cell");
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            data:nextProps.data
        })
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
                expandIndex :-1
            });
        } else {
            this.setState({
                expandIndex :row
            });
        }
        
    }
    close(row){
        this.setState({
            expandIndex:-1,
            openedIndex:-1
        });
    }

    render(){
        return (
            <div style={{"display":this.props.show}} className={styles.tableContant}>
               
               <div className={styles.tables}>
                <ProductTable theme={styles} data={this.state.data}
                    rowHeight={68}
                    headerHeight={68}
                    expandRowComponent={<ContextualMenu/>}
                    openedComponent={<ProductDetail/>}
                    headerComponent={<StickyHeader/>}
                    topOffset={120}
                    add={this.props.add}
                    open={this.open}
                    expand={this.expand}
                    close={this.close}
                    expandIndex={this.state.expandIndex}
                    openedIndex={this.state.openedIndex}
                    change = {this.props.change}
                    leftOffset={113}
                >
                    <ProductName/>
                    <SuitablityCheck/>
                    <RiskLevel/>
                    <ProductCurrency/>
                    <Discussed/>
                    <Add/>
                </ProductTable>
                </div>
                
               
            </div>
        )}
}
export default withLoadingScreenBeforeReadyToLeave(injectIntl(ProductTableComponent));