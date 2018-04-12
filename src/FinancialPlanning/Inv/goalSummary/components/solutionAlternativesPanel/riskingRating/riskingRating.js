import React,{Component} from 'react';

import styles from './style.scss';
import RiskingRatingSelect from './riskingRatingSelelct';
import RiskLevel from '../../../../../../common/components//riskLevel'

const RiskingRating = (props) => {
        const {data} = props;
        return (
            <div>
                {data.alternativeProductAttributeValue == "add Level"?<RiskingRatingSelect data={data} change={props.change.bind(this)}/>:<RiskLevel level={data.alternativeProductAttributeValue}/>}
            </div>
        );
    }

export default RiskingRating;