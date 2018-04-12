import React, { Component } from 'react';
import Modal from '../../../../../common/components/trading/Modal';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import  Title from 'wealth/lib/web/components/ui/title';
import FormatHelper from 'common/lib/formatHelper';
import PopupStyle from './popup.scss'; 
import {browserHistory} from 'react-router';


export default class DeleteButtonConfirmPop extends Component {
    constructor (props) {
        super(props);
        
         this.submitHandle = this.submitHandle.bind(this);
         this.deletegoal = this.deletegoal.bind(this);
         this.deleteCancel = this.deleteCancel.bind(this);
    }
   
    componentWillReceiveProps(nextProps) {
       
    }

   
    //submit total value
    submitHandle(){
      console.log("submit overlay");
      const target = '/group-sfp-war/main/en-gb/insFinProfile';
      browserHistory.push(target)

    }
   
    deleteCancel(){
     this.props.clickCurrentGoalDeleteCancelButton();
    }
    deletegoal(){
     this.props.clickCurrentGoalDeleteButton();
    }
    render () {
        console.log("insurance overlay ");
        return (
                <div className={PopupStyle.popup} >
                    <h3>Are you sure you want to remove this plan?</h3>
                    {/*<div >
                       Are you sure you want to remove this plan?
                    </div>*/}
                    
                    <hr className={PopupStyle.line}/>
                    <div className={PopupStyle.footer}>
                        <div className={PopupStyle.btnConfirmSubmit}>
                            <input type="button" onClick={this.deleteCancel} value="Cancel" className={PopupStyle.copy}/>
                            <input type="button" className={PopupStyle.submit} onClick={this.deletegoal} value="confirm"/>
                        </div>
                    </div>
                </div>
        );
    }
}
