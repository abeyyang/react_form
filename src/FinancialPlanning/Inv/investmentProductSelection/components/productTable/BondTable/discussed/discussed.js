import React, { Component } from 'react';
import styles from './style.scss';

const discussedBond = (props)=>{
    const { data,row,column} = props;
    return (
        <div className={styles.discuss}>
            <input id="discuss" name="discuss" type="checkBox" style={{"zoom": "2"}} onClick={props.discuss.bind(this,props.data)} checked={props.data.discussed}/><label htmlFor="discuss"></label>
        </div>
    );
};



export default discussedBond;