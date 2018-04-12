import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import Button from 'wealth/lib/web/components/ui/button';
import Accordion,{AccordionTab} from "wealth/lib/web/components/widgets/Accordion";
import Tab from "wealth/lib/web/components/widgets/tab";
import ScrollTab from "wealth/lib/web/components/widgets/scrollTab";
import styles from './style.scss';
import { browserHistory } from 'react-router';
import ProductTableComponent from '../containers/productTable';
import QuestionsAndCriteriasComponent from '../containers/questionAndCriterias';
import CriteriaShortList from '../containers/criteriaShortList';
import StepTracker from './stepTracker/stepTracker';
import EditGoal from './editGoal/editGoal';
import Modal from 'common/components/modal/modal';
import { AmountDisplay, Textarea, Dropdown, DropdownItem, YesNoButton, Checkbox, MultiSelect, AmountInput, RadioButton } from 'CommonUI/Form'

class InvestmentProductSelection extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showSaveGoalPanel:true,
            showSearchResult:"none",
            showQuestionCritrias:"block",
            showCriteriaList:"none",
            isOpen:false,
            dataIndex:0
        };
        this.toggleModal = this.toggleModal.bind(this);
    }
    handleProductResult(){
        
        this.setState({
             showSearchResult:"block",
             showQuestionCritrias:"block",
             showCriteriaList:"none"
        })
    }
    

    componentWillReceiveProps(nextState){
        console.log('productTable functions data ',nextState);
        if(nextState.renderPageTargetUrl != undefined && nextState.renderPageTargetUrl != ''){
            const target ="/group-sfp-war/main/en-gb/invProdSummary";
            this.props.router.push(target);
        }
    }


    toggleModal = () => {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }
    dropDownChange(){

    }
    render () {
        console.log('search Result',this.props);
        let currencyCodeList=[
                {value: 'USD', displayValue: 'USD'},
                {value: 'TWD', displayValue: 'TWD'},
                {value: 'GBP', displayValue: 'GBP'},
                {value: 'EUR', displayValue: 'EUR'},
                {value: 'JPY', displayValue: 'JPY'},
                {value: 'AUD', displayValue: 'AUD'},
                {value: 'HKD', displayValue: 'HKD'},
                {value: 'NZD', displayValue: 'NZD'},
            ];
        return (
            <div className={styles.bodyBackground}>
                <div className={styles.mainBackground}>
                    <div className={styles.financialProfile}>
                        <StepTracker/>
                        <EditGoal showSaveGoalPanel={this.state.showSaveGoalPanel}/>
                        <h4>
                            <span className={styles.title}>Product selection</span>
                        </h4>
                         
                        <QuestionsAndCriteriasComponent/>
                        
                        <CriteriaShortList/>
                        
                        <ProductTableComponent/>

                        {/*<div>

                            <button onClick={this.toggleModal}>
                                Open the modal
                            </button>

                            <Modal show={this.state.isOpen}
                                onClose={this.toggleModal}>
                                <Dropdown id="commonModal" option={currencyCodeList} onChange={this.dropDownChange.bind(this)} />
                            </Modal>
                        </div>*/}
                    </div>
                </div>
            </div>
        );
    }
}
export default InvestmentProductSelection;