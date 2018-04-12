import React,{Component} from 'react';
import classNames from 'classnames';
import {AmountInput } from 'CommonUI/Form';
import  { Input} from 'wealth/lib/web/components/ui/form'
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';

class InitialAmount extends Component {
        constructor(props){
            super(props);

        }

        handleInitialAmount(data,event){
            console.log("handleInitialAmount",event.target.value,"rowIndex:"+data.rowIndex);
            this.setState({
                initialAmountValue:event.target.value
            })
            data.value = event.target.value;
            this.props.change(data);
        };
        render(){
            const {data} = this.props;
            return (
                <div>
                   {data.investmentInitialAmount}
                </div>   
            );
        }
    }

export default InitialAmount;