import React, { Component } from 'react';
import styles from './style.scss';

class CriteriaSelector extends Component {
    constructor(props) {
        super(props);
        this.state={
        }
    }
    

    render() {
        const {selectId,dataList,selectedList} = this.props;

        return (
            <div className={styles.overlableDiv}>
                <ul className={styles.ulOverlayClass} onChange="">
                    {
                        
                        dataList.map(function(item,index){
                            let checked = false; 
                            selectedList.filter(function(selectedItem) { 
                                if(item.code == selectedItem.code){
                                    checked=true;
                                }
                            })
                            item.checked = checked;
                            return(
                                <li key={index} className={styles.liOverlayClassLine}>
                                    <input type="checkbox" checked={item.checked} onChange={this.props.selectItem} value={item.label} id={item.code} name={selectId}/><label htmlFor={item.code}>{item.label}</label>
                                </li>
                            )
                        },this)
                    }
                    <li className={styles.liConfirmBar}>
                        <input type="button" className={styles.confirm} name={selectId} id={selectId}  onClick={this.props.selectAll} value="Select All"/>
                        <input type="button" className={styles.cancel} onClick={this.props.confirm} value="confirm"/>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CriteriaSelector;
