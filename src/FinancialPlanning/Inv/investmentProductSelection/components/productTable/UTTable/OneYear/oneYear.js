import React, { Component } from 'react';
import styles from './style.scss';
import NumericComparator from 'wealth/lib/web/components/ui/numericComparator';

const OneYear = (props) => {
    const { data } = props;
    
    let amount = 0;
    if(data.attribute.varPrc1YrPct_PERFRM != undefined){
        amount = Number(data.attribute.varPrc1YrPct_PERFRM);
    }
    return (
        <div>
            <span><NumericComparator changeValue={amount} originalValue={100} type="percent" hasBackgroundColor /></span>
        </div>
    );
}

export default OneYear;
