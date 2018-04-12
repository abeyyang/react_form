import React, { Component } from 'react';
import styles from './style.scss';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';

const Add = (props)=>{
    return (
        // <div className={styles.add}>
        //     <input type="checkbox" style={{"zoom": "2"}} onClick={props.add.bind(this,props.data.value)} id="add" name="add" value="1"/><label htmlFor="add"/>
        // </div>

        <div style={{"zoom": "2"}} className={styles.add}>
            {props.data.selected>0?
                <div className={styles.enableremoveProductnmuber} onClick={props.add.bind(this,{productId:props.data.productId,operation:"delete"})} >
                    <FontIcon icon="minimize"  /> 
                </div> :
                <div className={styles.removeProductnmuber}>
                    <FontIcon icon="minimize" /> 
                </div>
           }
            <span className={styles.addProductnmuber} >
                {props.data.selected>0?props.data.selected:0}
            </span>
            <span  onClick={props.add.bind(this,{productId:props.data.productId,operation:"add"})}  >
                
                <FontIcon icon="add" className={styles.addMoreProductnmuber} />
            </span>
        
        </div>
    );
};



export default Add;
