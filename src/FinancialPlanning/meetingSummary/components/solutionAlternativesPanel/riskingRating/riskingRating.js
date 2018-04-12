import React,{Component} from 'react';
import RiskLevel from '../../../../../common/components//riskLevel'

const RiskingRating = (props) => {
        const {data} = props;
        return (
            <div>
                  <span>{<RiskLevel level={data.alternativeProductAttributeValue}/>}</span>
            </div>
        );
    }

export default RiskingRating;