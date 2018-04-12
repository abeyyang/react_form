import React, { Component } from 'react';
import styles from './style.scss';

class CriteriaSelectorInput extends Component {

    render() {
    
        const {dataList,selectId} = this.props;
        let textValue = "";
        if(dataList.length == 0 ){

        } else if (dataList.length == 1){
            textValue = dataList[0].label;
        } else {
            textValue = dataList.length + " items";
        }
        return (
            <input type="text" id={selectId} name={selectId} disabled className={styles.input} value={textValue}/>
        )
    }
}
export default CriteriaSelectorInput;