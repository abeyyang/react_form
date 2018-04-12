import React,{Component} from 'react';
import { AmountDisplay, AmountInput, RadioButton, Checkbox, Dropdown, DropdownItem, MultiSelect, Textarea, ScrollTab } from 'CommonUI/Form'
import styles from './style.scss';

class BudgetCurrency extends Component {
        constructor(props){
            super(props);

        }

    
        render(){

            const dropdownList = [
                {value: 'AMH', displayValue: 'Hong Kong'},
                {value: 'AOC', displayValue: 'China'},
                {value: 'SGH', displayValue: 'Singapore'}
            ];

            return (
                <div className={styles.bugetCurrency}>
                    <Dropdown id="" name="" option={dropdownList}
                    />
                </div>   
            );
        }
    }

export default BudgetCurrency;