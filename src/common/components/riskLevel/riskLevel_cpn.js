import React ,{Component} from 'react';
import styles from './style.scss';
import {riskLevel} from '../../../config/investmentConfig'

export default class RiskLevel extends Component{
    constructor(props){
        super(props);
        this.state = {
            level:1,
            color:'#6989ab'
        }
    }
//get config color and level
    getRiskLevel(level){
         let riskLevelObj ={};
        riskLevel.RISK_LEVEL_LIST.map((risk,index)=>{
            if(risk.key == level){
                riskLevelObj = risk;
            }
        })
        this.setState(
            {
                level:riskLevelObj.key,
                color:riskLevelObj.value
            }
        )
    }
    //init one time 
    componentWillMount(){
       this.getRiskLevel(this.props.level);
    }
    //reresh one time
    componentWillReceiveProps(nextProps){
        this.getRiskLevel(nextProps.level);
    }

    render(){
        return( <span className={styles.riskLevel} style={{backgroundColor:`${this.state.color}`}}>{this.state.level}</span>);
    }
}