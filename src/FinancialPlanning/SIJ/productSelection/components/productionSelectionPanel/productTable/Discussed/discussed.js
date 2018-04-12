import React, { Component } from 'react';
import { Checkbox} from 'CommonUI/Form';
import UIStyles from 'common/styles/ui.scss';

import styles from './style.scss';

const Discussed =(props) => {
    return (
        <div className={styles.discuss} className={ UIStyles.checkboxList} onClick={props.change.bind(this,{productId:props.data.productId,discussed:props.data.discussed})}>
            {/*<input id="discuss" type="checkBox" style={{"zoom": "2"}} value="1" className={styles.chkbox}/>*/}
            <input type="checkbox" className={styles.chkbox} name="questionOne2" value="1" checked={props.data.discussed?"checked":""} />
	        <label  className={styles.boxlabel} />
                                                          
            <span className={styles.checked}></span>
        </div>
    );
}

export default Discussed;
