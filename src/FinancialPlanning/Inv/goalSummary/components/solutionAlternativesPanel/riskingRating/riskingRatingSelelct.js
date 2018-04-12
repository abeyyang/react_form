import React,{Component} from 'react';
import {alternativeProductRiskLevel} from 'config/investmentConfig'
import styles from './style.scss';

class RiskingRatingSelect extends Component {
    constructor(props){
        super(props);
        // this.handleRisk = this.handleRisk.bind(this);
    }
    render(){
        const {data,change} = this.props;
        return (
             <div className={styles.riskRatingSelect} >
                    <select ref="risk" onChange={this.handleRisk =(event)=>{
                        let productRiskLeveObj = Object.assign({},data);
                        productRiskLeveObj.alternativeProductAttributeValue = event.target.value;
                        change(productRiskLeveObj)}}>
                         {
                            alternativeProductRiskLevel.GOAL_SUMMARY_DISCUSSED_RISK_LEVEL.map((level,key)=>{
                                return (<option key={key} value={level.key}>{level.value}</option>);
                            })
                        }
                    </select>
            </div>
        );

    }
}

export default RiskingRatingSelect;