import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import CreateRerods from './createRecords'
import Accordion,{AccordionTab} from "wealth/lib/web/components/widgets/Accordion";
import styles from './CreateTabStyle.scss';
import ResultCtn from '../containers/Result_ctn';
import AboutMeCtn from '../containers/AboutMe_ctn';
import EducationCtn from '../containers/Education_ctn';
import RetirementCtn from '../containers/Retirement_ctn';
import CriticalIllnessCtn from '../containers/CriticalIllness_ctn';
import GrowYourWealthCtn from '../containers/GrowYourWealth_ctn';
import ProtectionCtn from '../containers/Protection_ctn';
import {FormattedMessage, injectIntl} from "react-intl";
import { withRouter } from 'react-router';

class CreateTab extends Component {

    constructor (props) {
        super(props);               
        this.goToDashboardPageHandle = this.goToDashboardPageHandle.bind(this);
        this.calculate = this.calculate.bind(this);
        this.save = this.save.bind(this);
    }

    goToDashboardPageHandle() {
        console.log('FhcTabs.goToDashboardPageHandle');
        const target = '/group-sfp-war/main/en-gb/index';
        this.props.router.push(target);
    } 
    calculate() {
        const createFormResult = this.props.validateByTag("FHC_create_from",(error)=>{
            console.log("CreateTab validate createFormResult err=======:", error);
        });
        console.log("CreateTab validate createFormResult===:", createFormResult);

        let validateChildrenAgeResult = true;
        if(this.props.hasChildUnder18){
            validateChildrenAgeResult = this.props.validateByTag("FHC_create_from_children_age",(error)=>{
                console.log("CreateTab validate validateChildrenAgeResult err=======:", error);
            });
        }
        console.log("CreateTab validate validateChildrenAgeResult===:", validateChildrenAgeResult);

        if(createFormResult&&validateChildrenAgeResult){
            this.props.fhcCalculate();
        }else{
            console.log("form data invalid, not process calculation");
        }
        window.scrollTo(0, 0);
    }
    save() {
        if(!this.props.alreadyCalculated){
            return;
        }
        this.props.fhcSaveAndContinue();
        window.scrollTo(0, 0);
    }

    componentWillMount() {
      console.log('CreateTab Component WILL MOUNT! state',this.state);
      console.log('CreateTab Component WILL MOUNT! props',this.props);
  }
  componentDidMount() {
       console.log('CreateTab Component DID MOUNT! state',this.state);
       console.log('CreateTab Component DID MOUNT! props',this.props);
  }
  componentWillReceiveProps(newProps) {
        console.log('CreateTab Component WILL RECEIVE PROPS! state',this.state);
        console.log('CreateTab Component WILL RECEIVE PROPS! props',this.props);
        console.log('CreateTab Component WILL RECEIVE PROPS! new props',newProps);
  }
  shouldComponentUpdate(newProps, newState) {
            return true;
  }
  componentWillUpdate(nextProps, nextState) {
        console.log('CreateTab Component WILL UPDATE! state',this.state);
        console.log('CreateTab Component WILL UPDATE! props',this.props);
  }
  componentDidUpdate(prevProps, prevState) {
        console.log('CreateTab Component DID UPDATE! state',this.state);
        console.log('CreateTab Component DID UPDATE! props',this.props)
  }
  componentWillUnmount() {
         console.log('CreateTab Component WILL UNMOUNT! state',this.state);
         console.log('CreateTab Component WILL UNMOUNT! props',this.props)
  }
    render () {


        return (
            <div className={styles.createRecordsPage}>
               <div className={styles.right}><FontIcon icon="clock" className={styles.iconClock} /><FormattedMessage id="fhc.settinglifeGoals"/></div>
               <div className={styles.rightDate}><FormattedMessage id="fhc.lastModified"/>01/12/2018</div>
               <ResultCtn/>
               <div className={styles.others}>
                    <div className={styles.Indicates}>*<span className={styles.IndicatesText}><FormattedMessage id="fhc.indicatesField"/></span></div>
                    <div className={styles.Expand}>
                        <a onClick={(event) => {this.props.createFormExpandAll();}}><FontIcon icon="add" className={styles.iconAdd} />
                        <span className={styles.IndicatesText}><FormattedMessage id="fhc.expandAll"/></span></a>               
                    </div>
                    <AboutMeCtn/>
                    <EducationCtn/>
                    <RetirementCtn/>
                    <ProtectionCtn/>
                    <CriticalIllnessCtn/>
                    <GrowYourWealthCtn/>
                </div>
                <div className={styles.back}>
                    <a href="javascript:;" onClick={this.goToDashboardPageHandle}><FontIcon icon="chevron-left" className={styles.icon} /><FormattedMessage id="fhc.backToHome"/></a>
                    <a href="javascript:;" onClick={this.calculate.bind(this)} className={styles.calculateLink}>Calculate</a>
                    <a href="javascript:;" onClick={this.save} className={this.props.alreadyCalculated?styles.saveLink:styles.saveLinkDisabled}>Continue</a>
                </div>
            </div>
        );
    }
}

export default withRouter(CreateTab);