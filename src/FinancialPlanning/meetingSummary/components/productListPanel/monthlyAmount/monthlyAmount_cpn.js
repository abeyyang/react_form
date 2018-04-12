import React,{Component} from 'react';
import {AmountInput } from 'CommonUI/Form';
import  { Input} from 'wealth/lib/web/components/ui/form'
import styles from './style.scss';

class MonthlyAmount extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
         const {data}= this.props;
        return (
                <div>
                     {data.investmentMonthlyAmount}
                </div>     
                );
        }     
    }

export default MonthlyAmount;