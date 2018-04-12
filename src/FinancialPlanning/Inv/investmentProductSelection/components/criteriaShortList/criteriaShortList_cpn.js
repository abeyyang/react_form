import React, { Component } from 'react';
import classNames from 'classnames';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';

class CriteriaShortList extends Component{
    constructor (props) {
        super(props);
        this.state={
            criterias:{
                PIQAnswers:{
                    riskLevel:"Secure",
                    investmentPeriod:"&lt;=1 year",
                    investingLiquidty:"No preference",
                    features:"No preference"
                },
                productCodeCriteria:{},
                productName:"",
                shortListIndicator:false,
                showProductMapIndicator:false,
                timeToMaturity:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ],
                market:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ],
                productType:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ],
                strategy:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ],
                fundHouse:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ],
                shareClass:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ],
                UTMIP:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ],
                assetClass:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ],
                currencyCode:[
                    {
                        code:"FE_ALL",
                        label:"N/A"
                    }
                ]
            }
        }
        this.showProductCriteria = this.showProductCriteria.bind(this);
    }
    showProductCriteria(){
        let layoutRequest = {
            productSearch:"block",
            shortCriteria:"none",
            seachCriteria:"block"
        }
        this.props.updateLayoutStaus(layoutRequest);
    }
    render(){
        return (
            <div style={{"display":this.props.shortCriteria}} className={styles.mainShowResult}>
                <h3 className={styles.showResultTitle}><span onClick={this.showProductCriteria}><FontIcon icon={this.props.show?"chevron-down":"chevron-up"}/> Expand criteria</span></h3>
                <div className={styles.showResultContent}>
                    <ul >
                        <li>riskLevel <span>{this.state.criterias.PIQAnswers.riskLevel}</span></li>    
                        <li>investment period <span>{this.state.criterias.PIQAnswers.investmentPeriod}</span></li>
                        <li>investment liquidty <span>{this.state.criterias.PIQAnswers.investingLiquidty}</span></li>
                        <li>investment features <span>{this.state.criterias.PIQAnswers.features}</span></li>
                    </ul>
                </div>
                <div className={styles.showResultContent}>
                    <ul >
                        <li>timeToMaturity 
                            
                            {this.state.criterias.timeToMaturity.map(function(item,index){
                                if(item.label == 'N/A'){
                                    return (<span key={index}> all </span>);
                                } else{
                                    return(
                                        <span key={index}> {item.label} </span>
                                    )
                                }
                            },this)}
                        </li>    
                    </ul>
                </div>
            </div>
        );
    }
}

export default CriteriaShortList;
