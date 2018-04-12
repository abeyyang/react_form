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
                   <Input name="default-input-text" id="default-input-text" type="text" placeholder="0.0" theme={styles} onChange = {this.handleInitialAmount.bind(this,data) } />
                    <FontIcon icon="circle-help-solid" className={classNames(styles.icon,styles.inputright)} />
                </div>   
            );
        }
    }

export default InitialAmount;