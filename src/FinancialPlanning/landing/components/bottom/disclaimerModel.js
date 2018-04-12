import React, { Component } from 'react';
import Modal from '../../../../common/components/trading/Modal';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import  Title from 'wealth/lib/web/components/ui/title';
import FormatHelper from 'common/lib/formatHelper';
import disclaimerStyle from './disclaimerPop.scss'; 
import {browserHistory} from 'react-router';
import classNames from 'classnames';


export default class DisclaimerModel extends Component {
    constructor (props) {
        super(props);
    }
   
    componentWillReceiveProps(nextProps) {
       
    }
    render () {
        return (
                <div >
                    <div className={disclaimerStyle.title}><Title title="Acknowledgement" /></div>
                    <div className={disclaimerStyle.ack}>
                        <p className={disclaimerStyle.description}>During this discussion, certain information related to</p>
                        <div className={disclaimerStyle.firstAck}>
                            <p className={disclaimerStyle.ackTitle} >1.&nbsp;&nbsp;Involvement of Regulated Products</p>
                            <p className={disclaimerStyle.ackDetails}>The discussions and information provided to you in connection with this Investment Service(the "service") involve regulated products governed by specific legal and regulatory requirements and can only be carried out with existing HSBC investment customers or customers who have specifically consented to receiving information on regulated products.For other customers, HSBC ("the Bank" or "we") cannot provide further information on regulated products except with customer's prescribed consent.
                            </p>
                        </div>
                        <div className={disclaimerStyle.secondAck}>
                            <p className={disclaimerStyle.ackTitle} >2.&nbsp;&nbsp;Discussion of Market Situation, Investment Views, and Your Investment Performance</p>
                            <p className={disclaimerStyle.ackDetails}>During such discussions, the Bank may provide you with certain information and involve discussion of including without limitation opinions on the current market situation, general investment views and approaches, indicative prices and terms of investment products or services, calculations in respect of investment products or services and the performance of your investment kept with the Bank (the "Information"). During the discussion, we may provide for your reference an optional display of your full account balance (both sole & joint accounts) with the Bank.
                            </p>
                        </div>
                        <div className={disclaimerStyle.thirdAck}>
                            <p className={disclaimerStyle.ackTitle} >3.&nbsp;&nbsp;Assumptions and Estimations</p>
                            <p className={disclaimerStyle.ackDetails}>During the discussion, specific investment products or services (including portfolio-building services), and calculation in respect of the performance of investment kept with the Bank, may be discussed with you based on information that you have provided and based on certain assumptions and estimations that will be discussed and explained to you in the course of the discussions. Please also note that the assumptions and estimations used in calculating investment performance may have significant effect on the result of the calculations and you should take particular care when referring to or using such data or any information derived therefrom. 
                            </p>
                            <p className={classNames(disclaimerStyle.ackDetails,disclaimerStyle.mt20)}>
                            The discussion of any such investment products or services and any Information provided is for your consideration in making your own investment decisions and are for your reference only. They are not and should not be construed as an offer to sell or a solicitation for an offer to buy any financial products, and should not be considered as investment advice.</p>
                        </div>
                        <div className={disclaimerStyle.fourthAck}>
                            <p className={disclaimerStyle.ackTitle} >4.&nbsp;&nbsp;Information from Third Party Sources</p>
                            <p className={disclaimerStyle.ackDetails}>Some of the Information is derived from third party. The Bank believes such Information to be reliable but it has not independently verified. The Information may also include opinions and judgments from third party sources. The Bank has neither been involved in the forming of, nor does it endorse, such opinions or judgments.
                            </p>
                        </div>
                        <div className={disclaimerStyle.fiveAck}>
                            <p className={disclaimerStyle.ackTitle} >5.&nbsp;&nbsp;Completeness and Accuracy</p>
                            <p className={disclaimerStyle.ackDetails}>Whilst every care has been taken in preparing the Information, the Bank makes no guarantees, representation or warranty and accepts no responsibility or liability as to the accuracy or completeness of the Information. Except as specifically indicated, the expressions of opinion are those of the Bank only and are subject to change without notice. The Bank shall not be liable for any loss or damage arising out of your reliance on the Information.
                            </p>
                        </div>
                        <div className={disclaimerStyle.sixthAck}>
                            <p className={disclaimerStyle.ackTitle} >6.&nbsp;&nbsp;Risk Disclosure</p>
                            <p className={disclaimerStyle.ackDetails}>Investment involves risk, value of investment may move up or down, and may become valueless. Past performance figures shown are not indicative of future performance. Please read the relevant product offering documents for the investment products or services of interest to you for further details. You should carefully consider whether any investment products or services mentioned therein are appropriate for you in view of your investment experience, objectives, financial resources and circumstances. The Service is not intended to provide professional advice (including without limitation, tax, legal or accounting advice) or investment recommendations and should not be relied upon in that regard, or to be taken as statement, transaction advice, contract note or official confirmation from the Bank. You are advised to obtain appropriate professional advice where necessary.
                            </p>
                        </div>
                        <div className={disclaimerStyle.sevenAck}>
                            <p className={disclaimerStyle.ackTitle} >7.&nbsp;&nbsp;Personal Data</p>
                            <p className={disclaimerStyle.ackDetails}>In the course of discussion and for the purpose of providing the Service, the Bank may obtain your information kept with other HSBC group entities. Personal information collected in this Service whether obtained from you or from other HSBC group entities will be kept confidential by the Bank in accordance with the terms of the Bank 's Notice to Customers relating to the Personal Data (Privacy) Ordinance.
                            </p>
                            <p className={classNames(disclaimerStyle.ackDetails,disclaimerStyle.mt20)}>By clicking the "Accept" button, you acknowledge that you have read and understood the information described above and hereby provide your consent for the Bank to discuss with you information about any regulated products and to display your current portfolio and full account details including both sole & joint accounts during the discussion.
                            </p>
                        </div>
                        
                    </div>
                    
                    <hr className={disclaimerStyle.line}/>
                    <div className={disclaimerStyle.footer}>
                        <div className={disclaimerStyle.btnConfirmSubmit}>
                            <a href="javascript:;" onClick="">Cancel</a>
                            <a href="javascript:;"className={disclaimerStyle.submit} onClick="" >Accept</a>
                        </div>
                    </div>
                </div>
        );
    }
}

