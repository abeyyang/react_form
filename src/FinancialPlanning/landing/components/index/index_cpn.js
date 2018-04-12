import React, { Component } from 'react';
import Notification from 'wealth/lib/web/components/ui/notification';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import RiskProfilePanel from '../../containers/riskProfile_ctn';
import FinancialHealthCheckPanel from '../../containers/financialHealthCheck_ctn';
import RecentpirorityPanel from '../../containers/recentPirority_ctn';
import styles from './style.scss';
import withLoadingScreenBeforeReadyToLeave
    from '../../../../common/components/trading/withLoadingScreenBeforeReadyToLeave';
import {FormattedMessage, injectIntl} from "react-intl";
import "../../../../common/util/extend";
import {logon} from '../../../../logon';
import Tab from 'wealth/lib/web/components/widgets/tab';
import Special from '../bottom/special_cpn';
import RecentPlanMain from '../recentPlan/recentPlanMain/recentPlanMain_cpn';
import { browserHistory } from 'react-router';


class indexPanel extends Component {
    constructor (props) {
        logon();
        super(props);
        this.state = {
            showProfile:true,
            showFhc:false,
            showPlan:false,
            showTabs:"tabs"
        };
        this.changeTabs = this.changeTabs.bind(this);
    }
    changeTabs(target){
        if(target===0){
            this.setState({
                showProfile:true,
                showFhc:false,
                showPlan:false,
                showTabs:"tabs"
            });
        }else if(target===1){
            this.setState({
                showProfile:false,
                showFhc:true,
                showPlan:false,
                showTabs:"tabs2"
            });
        }else if(target===2){
            this.setState({
                showProfile:false,
                showFhc:false,
                showPlan:true,
                showTabs:"tabs3"
            });
        }
    }

    recordSIJgoal(param){

        console.log("start to record base sij goal in index_cpn ");
        let request={};
        console.log("this props in special cpn:",param);
        
        const target = '/group-sfp-war/main/en-gb/insJourney';
        browserHistory.push(target);
        
        
    }

    render () {
        const {
            stickyHeight,
            isApiError,
            fatalErrorHide,
            showApiCallingError,
            errorInfo,
            router,
            params={},
            intl
        } = this.props
        const tabs = [
            { title: <FormattedMessage id="dashboard.L_PROFILE"/> },
            { title: <FormattedMessage id="dashboard.L_FHC_SUMMARY"/> },
            { title: <FormattedMessage id="dashboard.L_RECENT_PLANS"/>}
        ];
        const showProfile = this.state.showProfile;
        const showFhc = this.state.showFhc;
        const showPlan = this.state.showPlan;
        const showTabs = this.state.showTabs;
        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    {/*
                    {showProfile?
                    <div className={styles.notify}>
                        <div className={styles.notifyCnt}>
                            <FontIcon icon="circle-error-solid" className={styles.iconWarn} />
                            <a className={styles.notifyCancel}><FontIcon icon="delete" className={styles.iconDelete} /></a>
                            <div className={styles.notifyMsg}>
                                <p className={styles.notifyTitle}>Important of risk profiling</p>
                                <p className={styles.notifyDetail}>In order to conduct a comprehensive financial planning review, we strongly advise you to complete or update the Risk Profiling Questionnaire. The result of the Risk Profiling Questionnaire is important for us to understand your risk tolerance so that suitable solutions can be presented. Without knowing your risk tolerance it may result in no financial solution to fulfill your need.</p>
                            </div>
                        </div>
                    </div>:null}*/}
                    <div className={styles[showTabs]}><Tab tabs={tabs} onClick={this.changeTabs} theme={styles} /></div>
                    {showProfile? <RiskProfilePanel /> :null}

                    {showFhc?<FinancialHealthCheckPanel /> :null}
                    {/*<h4 className={styles.mt20}>
                        <span className={styles.title}>Recent orders</span>
                        <a href="javascript:;" className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
                    </h4>
                    <h4 className={styles.mt20}>
                        <span className={styles.title}>Your recent pirority plans</span>
                        <a className={styles.dropDown}><FontIcon icon="chevron-down" className={styles.icon} /></a>
                    </h4>*/}


                    {showPlan?
                    <RecentpirorityPanel>
                         <RecentPlanMain />
                    </RecentpirorityPanel>:null}

                   
                   <Special router={this.props.router} recordSIJgoal={this.recordSIJgoal.bind(this)} fhcInitCreateTab={this.props.fhcInitCreateTab} fnaResult={this.props.fnaResult}/>
                    
                </div>
            </div>
        );
    }
}

export default withLoadingScreenBeforeReadyToLeave(injectIntl(indexPanel));