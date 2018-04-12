import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import ProductCard from '../../../Inv/goalSummary/components/productCardPanel';
import SIJProductCard from '../../../SIJ/productSummary/components/productCardPanel';
import SoultionAlternatives from '../solutionAlternativesPanel';
import CustomerDedaration from '../../../Inv/goalSummary/components/customerDedarationPanel';
import SIJCustomerDedaration from '../../../SIJ/productSummary/components/customerDedarationPanel';
import withLoadingScreenBeforeReadyToLeave
    from '../../../../common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router';

class productSummaryPanel extends Component {
    constructor (props) {
        super(props);
        this.state = {
           isShow:false
        };
        //    this.show = this.show.bind(this);
           this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
           this.finalise = this.finalise.bind(this);
    }
    componentWillMount(){
        this.initGoalSummary();
    }
    initGoalSummary(){
        let request={
            goalKey: {
                planId:111,
                goalId:123
            },
            messageId:'retrieveGoalSolutionDetail',
            sessionInfo:{}
        }
        this.props.retrieveGoalSolutionDetailforProdSumm(request);
    }
    show () {
        this.setState((preState, props) => {
            return { isShow:!preState.isShow };
        });
    }
    goToDashboardPageHandle(){
        console.log('test');
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
        browserHistory.push(target)
    }
    finalise(){
         let request={
            subserviceId: [{
		        functionOutputCode: "SAVCOMPLET"
	        }],
            leadId: {
		        leadSourceSystemNumber: ""
	        },
            goalKey: {
		        "planId": '',
		        "goalId": ''
	            },
            messageId:'recordGoalSolutionDetail',
            productList:this.props.rtvGSResponse.productList,
            exisitingHolding:this.props.rtvGSResponse.existingHolding,
            notes:this.props.rtvGSResponse.notes,
            sessionInfo:{}
        }
        this.props.recordGoalSolutionDetailforProdSumm(request);
        // const target = '/group-sfp-war/main/en-gb/meetingSummary';
        // browserHistory.push(target);
    }
    render () {
        console.log("productlist",this.props.alternativeProductList);
      const isShow = this.state.isShow;
        return (
     <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.productSummaryPage}>
                        <h4>
                            <span className={styles.title}>Product Summary</span>
                        </h4>
                            {/*{this.props.financialGoal.goalTypeCode == 'INS_JOURNEY' ?*/}
                            <div>
                                <h3>
                                    <span className={styles.title}>Product cart</span>
                                    <FontIcon icon="circle-fill-information" className={styles.icon} />
                                    <a href="javascript:;" className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
                                </h3>

                                <SIJProductCard insProductCardList={this.props.goalSolutionDetailData.insProductCardList}/>
                            </div>
                            {/*:null}*/}
                          
                            <h3>
                                <span className={styles.title}>Solution and Alternatives Discussed</span>
                                <FontIcon icon="circle-fill-information" className={styles.icon} />
                                <a href="javascript:;" className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
                            </h3>

                             <SoultionAlternatives alternativeProductList={this.props.alternativeProductList}/>
                            {this.props.financialGoal.goalTypeCode == 'SP_PROD_NEED' ?
                            <div>
                                <h3>
                                    <span className={styles.title}>Product cart</span>
                                    <FontIcon icon="circle-fill-information" className={styles.icon} />
                                    <a href="javascript:;" className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
                                </h3>

                                <ProductCard productCardList={this.props.productCardList}/>
                            </div>
                            :null}
                             {this.props.financialGoal.goalTypeCode == 'INS_JOURNEY' ?
                             <SIJCustomerDedaration/>
                             :<CustomerDedaration/>}

                            <div className={styles.back}><a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} />Back to product selection</a></div>
                            <div className={styles.button}>
                            <a href="javascript:;" className={styles.save}>Save progress</a>
                            <a href="javascript:;" onClick={this.finalise} className={styles.finalise}>Finalise your plan</a>
                            </div>
                            <div className={styles.decalration}><span>Disclaimer & declarations</span><FontIcon icon="chevron-down-small" className={styles.iconDown} /></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withLoadingScreenBeforeReadyToLeave(injectIntl(productSummaryPanel))