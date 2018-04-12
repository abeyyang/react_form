import React,{Component} from 'react';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form'
import styles from './style.scss';

class BudgetPremium extends Component {
        constructor(props){
            super(props);

        }
        render(){
            const {data} = this.props;
            return (
                <div className={styles.budgetPremium}>

                    <AmountInput type="decimal" value={data.Budgetpremium}
                    />
                </div>   
            );
        }
    }

export default BudgetPremium;