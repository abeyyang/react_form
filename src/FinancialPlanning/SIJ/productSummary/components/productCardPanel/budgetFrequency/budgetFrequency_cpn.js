import React,{Component} from 'react';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form'
import styles from './style.scss';

class BudgetFrequency extends Component {
        constructor(props){
            super(props);

        }
        render(){
            const {data} = this.props;
            const dropdownList = [
                {value: 'Yearly', displayValue: 'Yearly'},
                {value: 'Half Yearly', displayValue: 'Half Yearly'},
                {value: 'Quarterly', displayValue: 'Quarterly'},
                {value: 'Monthly', displayValue: 'Monthly'},
                {value: 'Single', displayValue: 'Single'}
            ];
            return (
                <div className={styles.budgetFrequency}>
                    {/*<select className={styles.selectleft}>
                        <option value="Yearly">Yearly</option>
                        <option value="Half Yearly">Half Yearly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Single">Single</option>
                    </select>*/}
                     <Dropdown id="" name="" option={dropdownList} defaultVale="Yearly"/>
                </div>   
            );
        }
    }

export default BudgetFrequency;