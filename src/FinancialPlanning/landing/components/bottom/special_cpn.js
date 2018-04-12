import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Button from 'wealth/lib/web/components/ui/button';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Popup from 'wealth/lib/web/components/widgets/popup';
import SIJModal from './SIJModal';
import SIJModalCtn from '../../containers/sij_ctn';

import RouteHelper from 'common/lib/routeHelper';
import FormatHelper from 'common/lib/formatHelper';
import dateTimeFormat from '../../../../config/dateTimeFormat';
import styles from './style.scss';
import popupStyle from './popup.scss';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router'
import Loading from 'common/components/Loading';
import DisclaimerModel from './disclaimerModel';
import disclaimerStyle from './disclaimerPop.scss';

class special extends Component {
    constructor (props) {
        super(props);
        this.state = {
            
        };
        // this.clickButtonForDashboardInitData = this.clickButtonForDashboardInitData.bind(this);
        // this.goToRTQPageHandle = this.goToRTQPageHandle.bind(this);
        // this.getCurrentLocale = this.getCurrentLocale.bind(this);
        // this.goToKEPageHandle = this.goToKEPageHandle.bind(this);
        // this.goToFinancialProfilePageHandle = this.goToFinancialProfilePageHandle.bind(this);
        // this.goToProductSummaryPageHandle = this.goToProductSummaryPageHandle.bind(this);
        // this.clickButtonflowDemo = this.clickButtonflowDemo.bind(this);
        // this.amountSubmit = this.amountSubmit.bind(this);	
	    // this.showFnaDashboard= this.showFnaDashboard.bind(this);
	    // this.goToInv = this.goToInv.bind(this);
	    // this.goToIns = this.goToIns.bind(this);
        this.goToFhcPageHandle = this.goToFhcPageHandle.bind(this);
    }

    //for saga to call external service
    clickButtonForDashboardInitData(){
        console.log('clickButtonForDashboardInitData excute!');
        const request = {
            customerId : "IF200106"
        }
        //this.props.initDashboardData(request);
    }
   
 amountSubmit(){
        console.log('amountSubmit click');
        let inputAmount = document.getElementById('inputValue').value;
        console.log(inputAmount);

        this.props.updateDashboardFNAData(inputAmount);
    }

    showFnaDashboard(){
        let fnaParams= {
            customers: [],
            requestComment: [{
                    commentType: "EF"
                },
                {
                    commentType: "INVST"
                },
                {
                    commentType: "SOFT_FACT"
                },
                {
                    commentType: "CUST_INFO"
                }],
            requestInvestorIndicator: [{
                    indicatorKey: "INV"
                },
                {
                    indicatorKey: "AIPI"
                },
                {
                    indicatorKey: "EF"
                },
                {
                    indicatorKey: "DCI"
                },
                {
                    indicatorKey: "MR"
                }],
            messageId:'retrieveFinancialSituationData',
         }    
          this.props.initDashboardFNAData(fnaParams);
    }
    goToRTQPageHandle() {
        browserHistory.push('/group-sfp-war/main/en-gb/rtq');
    }


    clickButtonflowDemo(){
       browserHistory.push('/group-sfp-war/main/en-gb/flowDemo');
    }

    getCurrentLocale() {
        const { routing } = this.props;
        console.log(this.props);
        const pathname = routing.locationBeforeTransitions.pathname;
        const path = RouteHelper.formatPath(pathname);
        return path.locale;
    }

    goToFinancialProfilePageHandle() {
        const target = '/group-sfp-war/main/en-gb/financialProfile';
        //this.props.router.push(target);
        browserHistory.push(target)
    }

     goToProductSummaryPageHandle() {
        const target = '/group-sfp-war/main/en-gb/productSummary';
        //this.props.router.push(target);
        browserHistory.push(target)
    }

    goToInv(){
       const target = '/group-sfp-war/main/en-gb/invJourney';
        browserHistory.push(target) 
    }

    goToIns(){

        const target = '/group-sfp-war/main/en-gb/insFinProfile';
        browserHistory.push(target)
    }
    //when props changed redux will pass to react page then will trigger this method
    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         app:nextProps.app
    //     })
    // }

    componentWillMount(){
        console.log('dashboard init....');
        //this.clickButtonForDashboardInitData();
        //this.showFnaDashboard();
        //onClick={this.goToIns}
    }

    componentDidMount(){
    }

    componentWillUnMount(){
    }

    goToKEPageHandle() {
        const target = '/group-sfp-war/main/en-gb/knowledgeAndExperience';
        //this.props.router.push(target);
        browserHistory.push(target);
    }
    goToFhcPageHandle() {
        const target = '/group-sfp-war/main/en-gb/fhc';
        this.props.fhcInitCreateTab();
        //this.props.router.push(target);
        this.props.router.push(target);
    }

    confirmSIJOverlay(){

        this.refs.popupSIJ.hide();
        console.log("popup instance",this.refs.popupSIJ);
        const target = '/group-sfp-war/main/en-gb/insJourney';
        browserHistory.push(target);
    }
    cancelSIJOvleray(){
        this.refs.popupSIJ.hide();
    }

    //
    // 
    // <Button  value="sagaDemo" onClick={this.clickButtonForDashboardInitData} />
    render () {
        let fna=this.props.fnaResult;
        console.log('fnaResult...',fna)
        let investmentOnclickFunction = "";
        let popupRefSIJ = "";
        let disableStyle;
        if(fna.length>=1){
            console.log("----fna----special------"+fna[0].reviewDateTime);
            let reviewDateTime = fna[0].reviewDateTime
            if(reviewDateTime!=""&&reviewDateTime!="N/A"){
                let currentDate = FormatHelper.dateFormatPattern(new Date(),dateTimeFormat.DATE_FORMAT_DTD);
                let lastModified = FormatHelper.dateFormatPattern(fna[0].reviewDateTime,dateTimeFormat.DATE_FORMAT_DTD);
                if(currentDate==lastModified){
                    console.log("currentDate is lastModified");
                    popupRefSIJ = "sij"
                    investmentOnclickFunction = this.goToInv;
                }else{
                    console.log("currentDate is not lastModified");
                    disableStyle = "disable";
                    //alert("please help update FNA to lateset");
                }
            }
        }
        return (
            <div className={styles.specialPage}>
                <p className={styles.whatwhouldyoulike}><FormattedMessage id="dashboard.L_what_would"/></p>
                <div className={styles.moduleThree}>
                    <div className={styles.whatyouwant}>
                        <p><FormattedMessage id="dashboard.L_know_what"/></p>
                        <div className={styles.wantDescription}><FormattedMessage id="dashboard.L_if_have_no_specific_financial"/></div>
                        {/*<a data-popupRef="disclaimer"><FormattedMessage id="dashboard.L_simplifiedwould_investments"/></a>
                        <a onClick={investmentOnclickFunction} className={styles[disableStyle]}><FormattedMessage id="dashboard.L_simplifiedwould_investments"/></a>
                        <a data-popupRef={popupRefSIJ} className={styles[disableStyle]}><FormattedMessage id="dashboard.L_simplifiedwould_insurance"/></a>*/}
                        <a id="laning_simplifiedwould_investments" onClick={this.goToInv} ><FormattedMessage id="dashboard.L_simplifiedwould_investments"/></a>
                        <a id="landing_simplifiedwould_insurance" data-popupRef="sij"><FormattedMessage id="dashboard.L_simplifiedwould_insurance"/></a>
                    </div>
                    <div className={styles.needGuidance} name="fhcButtonBannerPanel">
                        <p><FormattedMessage id="dashboard.L_need_guidance"/></p>
                        <div className={styles.wantDescription}><FormattedMessage id="dashboard.L_Our_Financial_Health_Check"/></div>
                        <a name="goToFhcButton" onClick={this.goToFhcPageHandle}><FormattedMessage id="dashboard.L_Financial_health_check"/></a>   
                    </div>
                </div>

                 <Popup hideOnOverlayClick theme={popupStyle} popupRef="sij" ref="popupSIJ" >
                    
                         <SIJModal confirmSIJOverlay={this.confirmSIJOverlay.bind(this)} cancelSIJOvleray={this.cancelSIJOvleray.bind(this)}/>
                    
                </Popup>

                <Popup hideOnOverlayClick theme={disclaimerStyle} popupRef="disclaimer"  >
                    <DisclaimerModel />
                </Popup>
            </div>
            
        );
    }
};


export default withLoadingScreenBeforeReadyToLeave(injectIntl(special))