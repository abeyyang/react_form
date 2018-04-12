import React, { Component } from 'react';
import Modal from '../../../../common/components/trading/Modal';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import  Title from 'wealth/lib/web/components/ui/title';
import FormatHelper from 'common/lib/formatHelper';
import PopupStyle from './popup.scss'; 
import {browserHistory} from 'react-router';


export default class SIJModal extends Component {
    constructor (props) {
        super(props);
        this.confirmSIJOverlay = this.confirmSIJOverlay.bind(this);
        this.cancelSIJOvleray = this.cancelSIJOvleray.bind(this);
    }
   
    componentWillReceiveProps(nextProps) {
       
    }
    confirmSIJOverlay(){
        this.props.confirmSIJOverlay();
    }
    cancelSIJOvleray(){
        this.props.cancelSIJOvleray();
    }
    render () {
        return (
                <div >
                    <div className={PopupStyle.title}><Title title="Insurance declaration" /></div>
                    <div >
                        <p className={PopupStyle.description}>HSBC offers goal based financial planning services to help you better understand 
                         your financial circumstances and needs. Both investment and insurance solutions 
                         may be available for your consideration. For those who are only looking for life 
                         insurance solution(s) to fulfil your needs, you confirm that you agree with 
                         the following before proceeding with the Insurance - Financial Needs Analysis:
                         </p>
                        <p className={PopupStyle.descriptionCustomer} >Customer Declaration</p>
                        <p className={PopupStyle.description}> You confirm that you would like to proceed with the Insurance - Financial Needs Analysis 
                            on the basis that life insurance solution(s) is/ are identified to be more suitable to 
                            fulfil your needs assessed by us and/ or life insurance solution(s) is/ are what
                             you are looking for to fulfil your needs. You also confirm that the target saving 
                             amount (if applicable) and budget specified by you are not advised by HSBC, and you understand
                              your life protection needs.
                        </p>
                        
                    </div>
                    
                    <hr className={PopupStyle.line}/>
                    <div className={PopupStyle.footer}>
                        <div className={PopupStyle.btnConfirmSubmit}>
                            <a id="sij_cancelSIJOvleray" href="javascript:;" onClick={this.cancelSIJOvleray}>Cancel</a>
                            <a id="sij_confirmSIJOverlay" href="javascript:;"className={PopupStyle.submit} onClick={this.confirmSIJOverlay} >Confirm</a>
                        </div>
                    </div>
                </div>
        );
    }
}
