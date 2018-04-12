import React, { Component } from 'react';
import styles from './style.scss';

const addOrRemoveBond = (props)=>{
    const { data,row,column} = props;
    return (
        <div className={styles.add}>
            <input type="checkbox" style={{"zoom": "2"}} onClick={props.add.bind(this,props.data)} id="add" name="add" checked={props.data.checked}/><label htmlFor="add"/>
        </div>
    );
};



export default addOrRemoveBond;