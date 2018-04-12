import React, { Component, PropTypes } from 'react';
import styles from './styles.scss';
import StepTracker from 'CommonUI/stepTracker'; 
import { AmountInput,Details,Summary,RiskLevel, Loading, Dropdown, DropdownItem, MultiSelect } from 'CommonUI/Form';
import FontIcon from 'wealth/lib/web/components/ui/FontIcon';
import { Validated, ValidateTypes, ValidationController } from 'CommonUI/validation/index';
import Dialog from 'CommonUI/dialog/Dialog';
import FormExample from '../djy';
export const stepFormList = [
    { 'key': 'Basic info' , value:"基本信息" },
    { 'key': 'personalInfo' , value:"个人信息" },
    { 'key': 'professionalInfo' , value:"联系信息" },
    { 'key': 'contactInfo' , value:"联系方式" },
    { 'key': 'serviceFunction' , value:"服务信息" }
];

class LayoutExampleComponent extends Component {
    constructor(props) {
        super(props);
        const selectData = [];
        const img = require('../form/images/pic2.png');
        for (let i = 0; i < 60; i++) {
            selectData.push({
                img,
                value: ['value', i].join(''),
                displayValue: ['displayValue ',i].join('')
            });
        }
        this.state={
            visible: true,
            currentStep: 1,
            showDialog: false,
            selectData
        };
        this.handleOnNextClick = this.handleOnNextClick.bind(this);
        this.handleOnPrevClick = this.handleOnPrevClick.bind(this);
        this.handleOnShowDialog = this.handleOnShowDialog.bind(this);
        this.handleOnDialogClose = this.handleOnDialogClose.bind(this);
    }
    handleOnDialogClose () {
        this.setState({
            showDialog: false
        });
    }
    handleOnShowDialog () {
        this.setState({
            showDialog: true
        });
    }
    handleOnChange(index,data){
        console.log(index,data);
    }
    handleOnPrevClick(){
        const nValue = this.state.currentStep-1>=1 ? this.state.currentStep - 1 : stepFormList.length;
        this.setState({
            currentStep: nValue
        });
    }
    handleOnNextClick(){
        const nValue = this.state.currentStep+1<= stepFormList.length ? this.state.currentStep + 1 : 1;
        this.setState({
            currentStep: nValue
        });
    }
    render() {
        let currentTitle = '';
        const currentStep = this.state.currentStep;

        return (
            <div className={styles.examle}>
                <div>
                    <div>
                        <StepTracker onChange={this.handleOnChange} currentStep={currentStep} data={stepFormList} />
                        <div style={{ display: 'block', margin: "20px 0"}}>
                            <button onClick={this.handleOnPrevClick}>Prev Step</button>
                            <button onClick={this.handleOnNextClick}>Next Step</button>
                        </div>
                        <StepTracker currentStep={currentStep} clickChange={false}  data={stepFormList} />
                        <div style={{margin: '10px'}}>
                            <p>Detail Summary:</p>
                            <Details open>
                                <Summary>
                                    <span>标题栏.....</span>
                                </Summary>
                                {[...Array(5)].map((dummy, index) => <p key={index}>Detail content</p>)}
                            </Details>
                            <h2>Detail Summary:</h2>
                             <Details open>
                                <Summary>
                                    <div>
                                        <span><FontIcon icon="camera" />Investment Journey</span>
                                        <b>Status-Financialprofile</b>
                                        <i>Last ModifyFiled:11/09/2017</i>
                                    </div>
                                </Summary>
                                {[...Array(5)].map((dummy, index) => <p key={index}>Detail content</p>)}
                            </Details>
                            <h2>RiskLevel</h2>
                            <RiskLevel level={1} />
                            <RiskLevel level={2} />
                            <RiskLevel level={3} />
                            <RiskLevel level={4} />
                            <RiskLevel level={5} />
                            <RiskLevel level={6} />
                            <RiskLevel level={7} color="pink" />
                            <RiskLevel level={8} color="purple" />
                        </div>
                        <button onClick={this.handleOnShowDialog}>ShowDialog</button>
                        <div style={{ display: 'block', width: '300px', height: '300px', position: 'relative' }}>
                            <Loading position="absolute" />
                        </div>
                        <Dialog isOpen={this.state.showDialog} onClose={this.handleOnDialogClose}>
                            <div style={{display:'block',width: '500px'}}>
                            <Details open>
                                <Summary>
                                    <span>标题栏.....</span>
                                </Summary>
                                {[...Array(5)].map((dummy, index) => <p key={index}>Detail content</p>)}
                                <MultiSelect option={this.state.selectData} />
                            </Details>
                            <MultiSelect column={3} option={this.state.selectData} />
                            </div>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }
}

export default LayoutExampleComponent;
