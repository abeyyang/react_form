import React, { Component } from 'react';
import { AmountDisplay, Textarea, Dropdown, DropdownItem, YesNoButton, ScrollTab, Checkbox, MultiSelect, AmountInput, RadioButton } from 'CommonUI/Form';
import { Input, SelectButton } from 'wealth/lib/web/components/ui/form';
import { Validated, ValidateTypes } from '../../common/components/validation';
import classNames from 'classnames';
import UIStyles from './ui.scss';
import styles from './style.scss';
const multiData1 = [
    {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayVdisplayVdisplayVdisplayVdisplayV 1'
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2'
    }, {
        value: 'value 3',
        displayValue: 'displayV 3'
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1'
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2'
    }, {
        value: 'value 3',
        displayValue: 'displayV 3'
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1',
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: true
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1',
        isChecked: true
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: true
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: true
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1'
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2'
    }, {
        value: 'value 3',
        displayValue: 'displayV 3'
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1'
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3'
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1'
    }
];
const multiData = [
    {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayVdisplayVdisplayVdisplayVdisplayV 1',
        isChecked: false
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1',
        isChecked: false
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1',
        isChecked: false
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1',
        isChecked: false
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1',
        isChecked: false
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1',
        isChecked: false
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1',
        isChecked: false
    }, {
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        value: 'value 4',
        displayValue: 'displayV 4',
        isChecked: false
    }, {
        value: 'value 5',
        displayValue: 'displayV 5',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        value: 'value 4',
        displayValue: 'displayV 4',
        isChecked: false
    }, {
        value: 'value 5',
        displayValue: 'displayV 5',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        value: 'value 4',
        displayValue: 'displayV 4',
        isChecked: false
    }, {
        value: 'value 5',
        displayValue: 'displayV 5',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }, {
        value: 'value 4',
        displayValue: 'displayV 4',
        isChecked: false
    }, {
        value: 'value 5',
        displayValue: 'displayV 5',
        isChecked: false
    }, {
        value: 'value 3',
        displayValue: 'displayV 3',
        isChecked: false
    }
];
const currencies = [
    {code:"HKD",toFixed: 2},
    {code:"RMB",toFixed: 4}
]
const dropDownData = [
    {
        img: require('./images/pic1.png'),
        value: 'value 1',
        displayValue: 'displayV 1'
    },{
        img: require('./images/pic2.png'),
        value: 'value 2',
        displayValue: 'displayV 2'
    },{
        value: 'value 3',
        displayValue: 'displayV 3'
    }
];
class FormExample extends Component {
    constructor (props, context) {
        super(props, context);
        console.log(context, 'context');
        this.state = {
            multiselect: 'please select',
            initValue: '',
            multiSelectInitValue: ['value 3','value 5'],
            password: '',
        };
        this.MultiSelectChange = this.MultiSelectChange.bind(this);
        this.scrollTabClick = this.scrollTabClick.bind(this);
        this.dropDownChange = this.dropDownChange.bind(this);
    }

    scrollTabClick (event, tab) {
        console.log(event, tab);
    }
    MultiSelectChange (selectData) {
        console.log(selectData, 'selectData');
        
    }
    dropDownChange (selectData, index) {
        console.log(selectData, index, 'selectData');
    }
    handleOnMultilSelectItemClick(data) {
        console.log(data);
    }
    render() {
        return (
            <div className={styles.example}>
                <h2>AmountDisplay Component</h2>
                <AmountDisplay value={222222.0000} theme={UIStyles} />
                <h2>Textarea Component</h2>
                <Textarea placeholder="please enter" disabled="disabled" />
                <h2>Input:</h2>
                <Input htmlAttributes={{maxLength:5, style: {width: "40px"}}} name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" theme={UIStyles} />
                <br /><br />
                <Validated id="passwordValidate" type={ValidateTypes.MandatoryValidate} value={this.state.password}
                    onError={(code,msg)=>{
                        return <div className={styles.errorMessage}><span>{msg}</span></div>;
                    }}
                >
                    <Input onChange={(evt)=>{this.setState({password:evt.target.value});}} data-role="validate" name="default-input-password" id="default-input-password" type="password" placeholder="Password" theme={UIStyles} />
                </Validated>
                <h2>Custom Checkbox:</h2>
                <div className={UIStyles.checkboxList}>
                    <ul>
                        <li>
                            <label htmlFor="checkboxes-1">
                                <Checkbox onChange={()=>{console.log("on Checkbox change");}} name="checkboxes" value="1" id="checkboxes-1" theme={UIStyles} />
                                <span>Default Icon</span>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="checkboxes-2">
                                <Checkbox name="checkboxes" value="1" id="checkboxes-2" theme={UIStyles} />
                                <span className={UIStyles.labelText}>Default Icon</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <h2>Custom RadioButton:</h2>
                <div className={UIStyles.radioButtonList}>
                    <ul>
                        <li>
                            <label htmlFor="RadioButton-1" className={UIStyles.radioButtonLabel}>
                                <RadioButton disabled={true} name="RadioButton" id="RadioButton-1" value="1" onChange={(event) => { console.log(event.target); }} defaultChecked />
                                <span  className={UIStyles.labelText}>Default Icon</span>
                            </label>
                        </li>
                        <li>
                            <label htmlFor="RadioButton-2" className={UIStyles.radioButtonLabel}>
                                <RadioButton disabled={true} name="RadioButton" id="RadioButton-2" value="1" onChange={(event) => { console.log(event.target); }} defaultChecked />
                                <span  className={UIStyles.labelText}>Default Icon</span>
                            </label>
                        </li>
                    </ul>
                </div>
                <h2>YesNoButton</h2>
                <YesNoButton
                    name="yesno"
                    defaultYesNo={false}
                    labels={['yes', 'no']}
                    onChange={(value) => {
                        console.log(value);
                    }}
                    theme={UIStyles}
                />
                <h2>AmountInput:</h2>
                <AmountInput width="400px" type="decimal" symbol="RMB" currency={currencies} thousandsGroup={false} value={60000} theme={UIStyles} /><br /><br />
                <AmountInput symbolVisible={false} width="300px" type="decimal" value={60000} thousandsGroup={false} theme={UIStyles} /><br /><br />
                <AmountInput width="300px" placeholder="Please enter" value={2000} symbol="$" showStar theme={UIStyles} />

                <h2>MultiCheckbox:</h2>
                <MultiSelect onDropDownItemChange={this.handleOnMultilSelectItemClick} disabled={true}  displayString="You have selected {{value}} items" name="multiCheckbox" id="multiCheckbox" displayValue={this.state.multiselect} onChange={this.MultiSelectChange} option={multiData} />
                <p>SingleColumn</p>
                <MultiSelect onDropDownItemChange={this.handleOnMultilSelectItemClick} displayString="You have selected {{value}} items" name="multiCheckbox2" id="multiCheckbox2" onChange={this.MultiSelectChange} option={multiData1} />
                <p>ThreeColumn</p>
                <MultiSelect onDropDownItemChange={this.handleOnMultilSelectItemClick} selectData={this.state.multiSelectInitValue} clear="清除" selectAll="全选" confirm="确认" column={3} displayString="You have selected {{value}} items" name="multiCheckbox3" id="multiCheckbox3"  onChange={this.MultiSelectChange} option={multiData} />
                <button onClick={()=>{
                    this.setState({
                        multiSelectInitValue: [
                            {
                                value: 'value 3',
                                displayValue: 'displayV 3',
                                isChecked: false
                            }, {
                                value: 'value 4',
                                displayValue: 'displayV 4',
                                isChecked: false
                            }
                        ]
                    });
                }}
                >ChangeState</button>
                <h2>Styled drop down / select box:</h2>
                <Dropdown option={dropDownData} disabled onChange={this.dropDownChange} />
                <p>Only Dropdown</p>
                <Dropdown option={dropDownData} initialValue={this.state.initValue} onChange={this.dropDownChange} />
                <button
                    onClick={()=>{
                        this.setState({
                            initValue: 'value 2'
                        });
                    }}
                >changeState</button>
                <p>Dropdown + DropdownItem</p>
                <Dropdown onChange={this.dropDownChange}
                    initialValue="dropdown-value-2"
                    initialDisplayValue="value 1"
                >
                    <DropdownItem
                        value="dropdown-value-1"
                        displayValue="value 1"
                    />
                    <DropdownItem
                        value="dropdown-value-2"
                        displayValue="value 2"
                    />
                </Dropdown>
                <h2>ScrollTab</h2>
                <ScrollTab tabs={ [{ title: 'on' },{ title: 'off' }]} activeIndex={1} onClick={this.scrollTabClick} /><br /><br />
                <ScrollTab tabs={ [{ title: 'Unit trusts(406)' },{ title: 'Bonds/ CDs / SP / FX / Others' }]} activeIndex={1} onClick={this.scrollTabClick} /><br /><br />
                <ScrollTab tabs={ [{ title: 'RETIREMENT' },{ title: 'EDUCATION' },{ title: 'GROW YOUR WEALTH' },{ title: 'CRITICAL ILLNESS' }]} activeIndex={1} theme={UIStyles} onClick={this.scrollTabClick} /><br /><br />
            </div>
        );
    }
}

export default FormExample;
