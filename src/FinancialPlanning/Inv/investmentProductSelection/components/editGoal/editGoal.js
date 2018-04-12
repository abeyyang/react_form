import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import { Input, SelectButton } from 'wealth/lib/web/components/ui/form';
import  Button from 'wealth/lib/web/components/ui/button';
import { AmountDisplay, Textarea, Dropdown, DropdownItem, YesNoButton, ScrollTab, Checkbox, MultiSelect, AmountInput, RadioButton } from 'CommonUI/Form'
import UIStyles from 'common/styles/ui.scss';

class EditGoal extends Component{
    constructor (props) {
        super(props);
        this.state = {
            showSaveGoalPanel:true,
            goalName:"Investment Journey 20171116"
        }
        this.toggleSaveGoal = this.toggleSaveGoal.bind(this);
        this.changeGoalName = this.changeGoalName.bind(this);
    }
    toggleSaveGoal(){
        this.setState((preState)=>{
            return {showSaveGoalPanel:!preState.showSaveGoalPanel}
        }) 
    }
    changeGoalName(event){
        this.setState({
            goalName:event.target.value
        })
    }
    render(){
        return (
            <div className={styles.editGoal}>
                {this.state.showSaveGoalPanel ? 
                (<div className={styles.goalName}><span>Your plan name : {this.state.goalName} |</span><FontIcon icon="edit" className={styles.iconEdit}/><a href="javascript:void(0);" onClick={this.toggleSaveGoal}>Edit</a></div>)
                :
                (<div className={styles.goalName}><div className={styles.goalName}><span>Your plan name : </span><Input htmlAttributes={{maxLength:35, style: {height:"15px",width: "350px"}}} name="goalName" id="goalName" type="text" onChange={this.changeGoalName} placeholder="TextBox" value={this.state.goalName} theme={UIStyles} ></Input></div><div className={styles.back}><div className={styles.buttonSearch}>
                    <a href="javascript:void(0);" className={styles.search} onClick={this.toggleSaveGoal}>Save</a>
                </div></div></div>)
                }
            </div>
        );
    }
}

export default EditGoal;
