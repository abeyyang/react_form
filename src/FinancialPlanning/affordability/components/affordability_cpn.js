import Popup from 'wealth/lib/web/components/widgets/popup';
import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import FormatHelper from 'common/lib/formatHelper';
//import dateTimeFormat from '../../../../config/dateTimeFormat';
import styles from './style.scss';
import withLoadingScreenBeforeReadyToLeave
    from 'common/components/trading/withLoadingScreenBeforeReadyToLeave';
import { FormattedMessage, injectIntl } from "react-intl";
import { browserHistory } from 'react-router';
import { Input, SelectButton } from 'wealth/lib/web/components/ui/form';
import UIStyles from 'common/styles/ui.scss';
import { AmountDisplay, Textarea, Dropdown, DropdownItem, YesNoButton, ScrollTab, Checkbox, MultiSelect, AmountInput, RadioButton } from 'CommonUI/Form';

class affordabilityCpn extends Component {
    constructor (props) {
        super(props);
        this.state = {
            inputValue:"",
        };

    }
    componentWillMount(){
        let sessionInfo = this.props.session
        let rpqTextParams ={
            messageId:'retrieveQuestionnaire',
            questionnaireTypeCode:"FPCUSTDCLR",
        }; 
        rpqTextParams ={rpqTextParams,sessionInfo}
        this.props.initAffordabilityData(rpqTextParams);
        //rpqTextParams ={rpqTextParams,sessionInfo}
        console.log("landing will amount...",rpqTextParams);
    }
  
    componentDidMount(){
        console.log("landing did amount...")
    }
    componentWillReceiveProps(nextProps){
     
    }
    componentWillUnMount(){
        console.log("profile will  unamount...")
    }
   
    render () {
        const {
            stickyHeight,
            router,
            intl,
            affResult
        } = this.props;
        const radioGroup = [
            {key: 'Y',  desc: affResult.AT_6_A_001,checked:false},
            {key: '10', desc: affResult.AT_6_B_001,checked:false},
            {key: '20', desc: affResult.AT_6_C_001,checked:false},
            {key: '30', desc: affResult.AT_6_D_001,checked:true},
            {key: '40', desc: affResult.AT_6_E_001,checked:false},
            {key: '50', desc: affResult.AT_6_F_001,checked:false},
            {key: 'NA', desc: affResult.AT_6_G_001+'(Single premium / payment)',checked:false},
        ];
        const sourceRadioGroup = [
            {key: 'premium', desc: affResult.AT_2_A_001},
            {key: 'sources', desc: affResult.AT_2_B_001},
            {key: 'reasons', desc: affResult.AT_2_C_001},
        ];
        return (
        <div className={styles.bodyBackground} >
            <div className={styles.mainBackground}>
                <div className={styles.affordabilityPage}>
                    <h4>Affordability declaration</h4>
                    <div className={styles.smallHeader}>
                        <p className={styles.indicates}><span>*</span>&nbsp;Indicates a required field</p>
                        <div className={styles.collapse}>
                            <a className={styles.collapseShow}>
                                <FontIcon icon="minimize" className={styles.icon} />Collapse all section</a>
                        </div>
                    </div>
                    <div className={styles.affordabilityCtn}>
                        {/*Affordability information*/}
                        <div className={styles.affordabilityInfor}>
                            <div className={styles.affordabilityInforHeader}>
                                <h2><span className={styles.header}>Affordability information</span></h2>
                                <a onClick="" className={styles.showIconDownUp}><FontIcon icon="chevron-up" className={styles.iconDownUp}/></a>
                            </div>
                            <div className={styles.affordabilityInforDetail}>
                                <p className={styles.theme}>Alternate ID</p>
                                <Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox"  theme={styles} value={this.props.inputValue} />
                                
                                <select className={styles.selectId} >
                                    <option>Please select</option>
                                    <option>I</option>
                                    <option>P</option>
                                    <option>X</option>
                                </select>
                                <p className={styles.explain}>(Different from bank's record)</p>
                            </div>
                        </div>
                         {/*Affordability declaration*/}
                         <div className={styles.affordabilityDeclaration}>
                            <div className={styles.affordabilityDeclarationHeader}>
                                <h2><span className={styles.header}>Affordability declaration</span></h2>
                                <a onClick="" className={styles.showIconDownUp}><FontIcon icon="chevron-up" className={styles.iconDownUp}/></a>
                            </div>
                            <div className={styles.affordabilityDeclarationDetail}>
                                <p className={styles.theme}>Your retirement age is <span className={styles.boldFont}>70</span> years old. The payment term will not go beyond your retirement age</p>
                                <p className={styles.theme}>The payment term will go beyond your retirement age: N/A (Single Payment/ Single Premium/ Aggregate Premium) </p>
                                <div className={styles.questionOne}>
                                    <p className={styles.title}>{affResult.QT_1_001} <span className={styles.flag}>*</span>
                                        <FontIcon icon="circle-help-solid" className={styles.iconHelp} />
                                    </p>
                                    <p className={styles.explain}>{affResult.QN_1_001}</p>
                                    <div className={styles.answers}>
                                        <div className={ UIStyles.checkboxList}>
                                            <ul>
                                                <li>
                                                    <label htmlFor="checkboxes-1">
                                                        <Checkbox name="checkboxes" value="1" id="checkboxes-1" theme={UIStyles} />
                                                        <span>{affResult.AT_1_A_001} (NA)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label htmlFor="checkboxes-2">
                                                        <Checkbox name="checkboxes" value="1" id="checkboxes-2" theme={UIStyles} />
                                                        <span className={UIStyles.labelText}>{affResult.AT_1_B_001} (HKD 85,000.00)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label htmlFor="checkboxes-3">
                                                        <Checkbox name="checkboxes" value="1" id="checkboxes-3" theme={UIStyles} />
                                                        <span>{affResult.AT_1_C_001} (HKD 1,000,000.00)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label htmlFor="checkboxes-4">
                                                        <Checkbox name="checkboxes" value="1" id="checkboxes-4" theme={UIStyles} />
                                                        <span className={UIStyles.labelText}>{affResult.AT_1_D_001} (HKD 30,000.00)</span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label htmlFor="checkboxes-5">
                                                        <Checkbox name="checkboxes" value="1" id="checkboxes-5" theme={UIStyles} />
                                                        <span className={UIStyles.labelText}>{affResult.AT_1_E_001}</span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className={UIStyles.radioButtonList}>
                                            <ul>
                                                {sourceRadioGroup.map((item, index) => {

                                                const radioId = "RadioButton-" + index;

                                                    return(
                                                            <li key={radioId}>
                                                                <label htmlFor={radioId} className={UIStyles.radioButtonLabel}>
                                                                    <RadioButton name="RadioButtonX" id={radioId} value={item.key} theme={UIStyles} onChange= { (event) => { this.props.updateSampleField( {radioValue : event.target.value} ); } }  />
                                                                    <span className={UIStyles.labelText}>{item.desc}</span>
                                                                </label>
                                                            </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                        <div className={styles.premiumAddtional}>
                                             <p className={styles.theme}>{affResult.QT_3_001}<Input htmlAttributes={ {maxLength : 10 } }   name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles} /></p>
                                             <p className={styles.theme}>{affResult.QT_3_002} <Input htmlAttributes={ {maxLength : 10 } }  name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles} /></p>
                                             <div className={UIStyles.checkboxList}>
                                                <ul>
                                                    <li>
                                                        <label htmlFor="checkbox-1">
                                                            <Checkbox name="checkbox" value="1" id="checkbox-1" theme={UIStyles} />
                                                            <span>{affResult.AT_3_A_001}</span>
                                                        </label>
                                                    </li>
                                                    <li>
                                                        <label htmlFor="checkbox-2">
                                                            <Checkbox name="checkbox" value="1" id="checkbox-2" theme={UIStyles} />
                                                            <span className={classNames(styles.labelText,UIStyles.labelText)}>{affResult.AT_3_B_001}</span>
                                                        </label>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={styles.sourcesAddtional}>
                                            <span className={styles.theme}>{affResult.QT_4_001}</span>
                                            <div className={ UIStyles.checkboxList}>
                                                <ul>
                                                    <li>
                                                        <label htmlFor="sourcesCheckbox-1">
                                                            <Checkbox name="sourcesCheckbox" value="1" id="sourcesCheckbox-1" theme={UIStyles} />
                                                            <span>{affResult.AT_4_A_001}</span>
                                                        </label>
                                                    </li>
                                                    <div className={styles.amountDetail}>
                                                         <p className={styles.theme}>{affResult.AT_4_A_003}</p>
                                                         HKD <Input htmlAttributes={ {maxLength : 10 } }  name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles} />
                                                         
                                                         <p className={styles.theme}>{affResult.AT_4_A_004}</p>
                                                         
                                                         <p className={styles.theme}>{affResult.AT_4_A_006} <Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue} theme={styles} /></p>
                                                    </div>
                                                    <li>
                                                        <label htmlFor="sourcesCheckbox-2">
                                                            <Checkbox name="sourcesCheckbox" value="1" id="sourcesCheckbox-2" theme={UIStyles} />
                                                            <span className={classNames(styles.labelText,UIStyles.labelText)}>{affResult.AT_4_B_001}</span>
                                                        </label>
                                                    </li>
                                                    <div className={styles.amountDetail}>
                                                         <p className={styles.theme}>{affResult.AT_4_B_003}</p>
                                                         HKD <Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles} />
                                                         
                                                         <p className={styles.theme}>{affResult.AT_4_B_004}</p>
                                                         {affResult.AT_4_B_005} <Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles} />
                                                         
                                                         <p className={styles.theme}>{affResult.AT_4_B_006} <Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles} /></p>
                                                    </div>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className={styles.reasonAddtional}>
                                            <p className={styles.theme}>{affResult.QT_5_001}<Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles} /></p>
                                        </div>
                                    </div>
                                    <div className={styles.answersAddtional}>
                                        <p className={styles.theme}>{affResult.QT_1_004}</p>
                                        <p className={styles.themeRemarks}>{affResult.QT_1_005}</p>
                                        <p className={styles.theme}>
                                            {affResult.QT_1_006}<br/>
                                            {affResult.QT_1_007}<br/>
                                            {affResult.QT_1_008}<br/>
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.affordabilityAssessment}>
                                    <div className={styles.affordabilityAssessmentHeader}>
                                        <h2>Affordability Assessment</h2>
                                        <input className={styles.assess} type="button" defaultValue="Assess affordability"/>
                                    </div>
                                    <div className={styles.affordabilityAssessmentResult}>
                                        <p className={styles.resultHeader}>You pass the affordability assessment.</p>
                                        <table border="1">
                                            <tr>
                                                <th>{affResult.T_001}</th>
                                                <th>{affResult.T_002}</th>
                                            </tr>
                                            <tr>
                                                <td>{affResult.T_001_001}</td>
                                                <td>
                                                    <p>{affResult.T_002_001}</p>
                                                    <p className={styles.resultCnt}>{affResult.T_003_003}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{affResult.T_001_002}</td>
                                                <td>
                                                    <p>{affResult.T_003_004}</p>
                                                    <p className={styles.resultCnt}>{affResult.T_003_006}:</p>
                                                    <p className={styles.resultCnt}>{affResult.T_003_007}</p>
                                                    <p className={styles.resultCnt}>{affResult.T_003_008}</p>
                                                </td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                                <div className={styles.questionTwo}>
                                    <p className={styles.title}>{affResult.QT_7_001} <span className={styles.flag}>*</span>
                                        <FontIcon icon="circle-help-solid" className={styles.iconHelp} />
                                    </p>
                                    <p className={styles.explain}>{affResult.QT_7_001}</p>
                                    <div className={classNames(styles.answers, UIStyles.checkboxList)}>
                                        <ul>
                                            <li>
                                                <label htmlFor="checkboxe-1">
                                                    <Checkbox name="checkboxes" value="1" id="checkboxe-1" theme={UIStyles} />
                                                    <span>{affResult.AT_7_A_001}</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label htmlFor="checkboxe-2">
                                                    <Checkbox name="checkboxes" value="1" id="checkboxe-2" theme={UIStyles} />
                                                    <span className={UIStyles.labelText}>{affResult.AT_7_B_001}</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label htmlFor="checkboxe-3">
                                                    <Checkbox name="checkboxes" value="1" id="checkboxe-3" theme={UIStyles} />
                                                    <span>{affResult.AT_7_C_001}</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label htmlFor="checkboxe-4">
                                                    <Checkbox name="checkboxes" value="1" id="checkboxe-4" theme={UIStyles} />
                                                    <span>{affResult.AT_7_D_001}</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label htmlFor="checkboxe-4">
                                                    <Checkbox name="checkboxes" value="1" id="checkboxe-5" theme={UIStyles} />
                                                    <span className={UIStyles.labelText}>{affResult.AT_7_E_001}</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label htmlFor="checkboxe-5">
                                                    <Checkbox name="checkboxes" value="1" id="checkboxe-6" theme={UIStyles} />
                                                    <span className={UIStyles.labelText}>{affResult.AT_7_F_001}</span>
                                                </label>
                                            </li>
                                            <li>
                                                <label htmlFor="checkboxe-6">
                                                    <Checkbox name="checkboxes" value="1" id="checkboxe-7" theme={UIStyles} />
                                                    <span className={UIStyles.labelText}>{affResult.AT_7_G_001}</span>
                                                </label>
                                            </li>
                                            <Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles}  />
                                        </ul>
                                    </div>
                                </div>

                                {/*Q2 begin... 2.Approximately what percentage...*/}
                                <div className={styles.questionThree}>
                                    <p className={styles.title}>{affResult.QT_6_001} {affResult.QT_6_002}</p>
                                    <p className={styles.explain}>{affResult.QN_6_001} </p>
                                    
                                    <div className={classNames(styles.answers, UIStyles.radioButtonList)}>
                                        <ul>
                                            {radioGroup.map((item, index) => {

                                            const radioId = "RadioButton-" + index;

                                                return(
                                                        <li key={radioId}>
                                                            <label htmlFor={radioId} className={UIStyles.radioButtonLabel}>
                                                                <RadioButton name="RadioButtonX" id={radioId} value={item.key} theme={UIStyles} defaultChecked={item.checked} onChange= { (event) => { this.props.updateSampleField( {radioValue : event.target.value} ); } }  />
                                                                <span className={UIStyles.labelText}>{item.desc}</span>
                                                            </label>
                                                        </li>
                                                )
                                            })}
                                        </ul>
                                        <p className={styles.explainAnswer}>Regular premium of the selected plan(s) are more than 105% of the budget</p>
                                    </div>
                                </div>

                                <div className={styles.questionFour}>
                                    <p className={styles.theme}>Your current accumulative liquid assets  <span className={styles.boldFont}>HKD 103,000.00</span> </p>
                                    <div className={styles.answers}>
                                        <Input htmlAttributes={ {maxLength : 10 } } name="default-input-text" id="default-input-text" type="text" placeholder="TextBox" value={this.props.inputValue}  theme={styles} />
                                    </div>
                                </div>
                                {/*Q2 end... 2.Approximately what percentage...*/}

                            </div>
                        </div>

                        

                        {/*Protections gap*/}
                         <div className={styles.protectionGap}>
                            <div className={styles.protectionGapHeader}>
                                <h2><span className={styles.header}>Protections gap</span></h2>
                                <a onClick="" className={styles.showIconDownUp}><FontIcon icon="chevron-up" className={styles.iconDownUp}/></a>
                            </div>
                            <div className={styles.protectionGapDetail}>
                                <p className={styles.acknowledge}>I acknowledge the total sum insured applied for is <span className={styles.boldFont}>HKD 1,000,000.00</span>, which is less than my total protection need of <span className={styles.boldFont}>HKD 2,000,000.00</span> and agreed to proceed with the transcation because:</p>
                                <p className={styles.title}>Please document appropriate reason <span className={styles.flag}>*</span>
                                    <FontIcon icon="circle-help-solid" className={styles.iconHelp} />
                                </p>
                                <Textarea placeholder="please enter" theme={styles} />
                            </div>
                        </div>

                        {/*Affordability declaration remarks*/}
                         <div className={styles.affordabilityRemark}>
                            <div className={styles.affordabilityRemarkHeader}>
                                <h2><span className={styles.header}>Affordability declaration remarks</span></h2>
                                <a onClick="" className={styles.showIconDownUp}><FontIcon icon="chevron-up" className={styles.iconDownUp}/></a>
                            </div>
                            <div className={styles.affordabilityRemarkDetail}>
                                <p className={styles.theme}>Remarks</p>
                                <Textarea placeholder="please enter" theme={styles} />
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
        );

    }  
}

export default withLoadingScreenBeforeReadyToLeave(injectIntl(affordabilityCpn))