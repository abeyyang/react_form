import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import FormatHelper from 'common/lib/formatHelper';
import dateTimeFormat from 'config/dateTimeFormat';
export default class riskProfileQuestionnaireHistroicalRecords extends Component {
    constructor (props) {  
        super(props);
        this.state = {
            
        };
    this.goQuestionnaire = this.goQuestionnaire.bind(this);
    this.goRiskProfile = this.goRiskProfile.bind(this);
    this.goToAffordability = this.goToAffordability.bind(this);
   // this.getReport = this.getReport.bind(this);
    }
   
    componentWillMount(){
        let sessionInfo = this.props.session
        let rtqHistoricalParams = {sessionInfo}
        this.props.getHistoricalRecords(rtqHistoricalParams);
        console.log("landing will amount...")
        
    }
    goToAffordability(){ //for testing
        console.log('go back affordability');
        const target = '/group-sfp-war/main/en-gb/affordability';
        this.props.router.push(target);
    }
    
    getReport(index){
        console.log("qId in page", index);
        let sessionInfo = this.props.session;
        let reqParams = {index,sessionInfo}
        this.props.getReport(reqParams);
    }
    goQuestionnaire(){
        console.log('go back questionnaire');
        const target = '/group-sfp-war/main/en-gb/rtq/riskProfileQuestionnaire006';
        this.props.router.push(target);
    }
    goRiskProfile(){
        console.log('go back RTQ');
        const target = '/group-sfp-war/main/en-gb/rtq';
        this.props.router.push(target);
    }
    componentDidMount(){
        console.log("landing did amount...")
    }

    componentWillUnMount(){
        console.log("landing will  unamount...")
    }
    componentWillReceiveProps(nextProps) {
        console.log("next props in page",nextProps)

    }


    render () {
       const {
            historyRecords,
            session,
            report
       } = this.props;
       let cusId = session.customerId;
        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.riskProfilePage}>
                        <h2>Risk Profile Questionnaire</h2>
                        <h3>Previous Records</h3>
                        <div className={styles.customerInformation}>
                            <h3>Customer Information</h3>
                            <table>
                                 <tr>
                                    <td>Customer ID Type</td>
                                    <td id="rpq_customerIDType">HKD</td>
                                </tr>
                                <tr>
                                    <td>Customer ID</td>
                                    <td  id="rpq_customerID">{cusId}</td>
                                </tr>
                                <tr>
                                    <td>Customer Name</td>
                                    <td  id="rpq_customerName">Jason</td>
                                </tr>
                            </table>
                        </div>
                        <div className={styles.customerPreviousRecords}>
                            <h3>Customer Previous Records</h3>
                            <table>
                                <tr>
                                    <th>Date Completed</th>
                                    <th>Expiry date</th>
                                    <th>Risk TOLERANCE level</th>
                                    <th>Staff Name</th>
                                    <th>Branch Number</th>
                                    <th>Channel</th>
                                    <th>&nbsp;</th>
                                </tr>
                                {
                                    historyRecords.map(function(item,index){
                                        console.log("item",item);
                                        let expireDate = item.expireDate
                                        let completeDate = item.completeDate
                                        let riskDes = item.riskName
                                        let staffName = item.staffName
                                        let branch = item.branch
                                        let channel = item.channel
                                        let qId = item.qId
                                        console.log("qId in page in layout",qId)
                                        return(

                                            <tr key={index}>
                                                <td>{completeDate}</td>
                                                <td>{expireDate}</td>
                                                <td>{riskDes}</td>
                                                <td>{staffName}</td>
                                                <td>{branch}</td>
                                                <td>{channel}</td>
                                                <td><a href="javascript:void(0)" onClick={this.getReport.bind(this,qId)} className={styles.viewReport}>View report<FontIcon icon="chevron-right" className={styles.icon} /></a></td>
                                            </tr>


                                        )
                                    },this)
                                }
                            </table>
                        </div>
                        <div className={styles.button}>
                            <a id="rpq_previousRecordsCan" href="javascript:void(0)" onClick={this.goRiskProfile} className={styles.cancel}>Cancel</a>
                            <a id="rpq_previousRecordsStartAssesment" href="javascript:void(0);"  onClick={this.goQuestionnaire} className={styles.assessment}>Start Assesment</a>
                             {/*<a id="rpq_previousRecordsStartAssesment" href="javascript:void(0);"  onClick={this.goToAffordability} className={styles.assessment}>TESTING</a>*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}