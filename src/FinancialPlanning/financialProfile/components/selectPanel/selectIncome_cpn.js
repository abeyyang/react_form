import  React,{Component} from 'react';
import ReacDOM from 'react-dom';
import classNames from 'classnames';
import styles from '../financialProfilePanel/style.scss';
import financialProfileConfig from '../../../../config/financialProfileConfig'

export default class SelectIncomeComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            incomeReason:null
        };
        this.handleShowMonthly = this.handleShowMonthly.bind(this);
    }
    handleShowMonthly(e){
        console.log("select income....",e.target.value);
        this.setState({
            incomeReason:e.target.value
        });
        
        console.log("click select showMonthly...",e.target.value);
        this.props.callbackParent(e.target.value);
         
    }


    render(){
        const {selectKey} = this.props;
        let MIAESelected={
            commentType:null,
		    commentKey:null
        }
        MIAESelected=this.props.selectKey
        console.log("MIAESelected....",MIAESelected);
        return(
            <div className={classNames(styles.currencySelect, styles.reason)}>
                <p>You acknowledge that the average monthly income from all sources in the past two years
                    shall not be used to caculate your disposable income and consider your affordability because:</p>
                <select  onChange={this.handleShowMonthly} value={this.state.incomeReason===null?selectKey.commentKey:this.state.incomeReason}>
                    <option value="PLEASE_SELECT">Please select</option>
                    {
                        financialProfileConfig.reasonToUpdateMonthlyAndExpense.map((map)=>{
                        return (<option key={map.key} value={map.key}>{map.value}</option>);
                    })
                        
                    }
                </select>
            </div>
        );
    }
}