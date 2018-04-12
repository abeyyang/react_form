import React,{Component} from 'react';
import {AmountInput } from 'CommonUI/Form';
import  { Input} from 'wealth/lib/web/components/ui/form'
import styles from './style.scss';

class MonthlyAmount extends Component {
    constructor(props){
        super(props);
    }
    handleMonthlyAmount(data,event){
        console.log("handleInitialAmount",event.target.value,"rowIndex:",data.rowIndex);
        this.setState({
            monthlyAmountValue:event.target.value
        })
        data.value = event.target.value;
        this.props.change(data);
    }

    render(){
         const {data}= this.props;
        return (
                <div>
                     <Input name="default-input-text" id="default-input-text" type="text" placeholder="0.0"  theme={styles} onChange = {this.handleMonthlyAmount.bind(this,data) } />
                </div>     
                );
        }     
    }

export default MonthlyAmount;