import React ,{Component} from "react";
import styles from './style.scss';
import Modal from 'common/components/trading/Modal'


export default class DeleteMessage extends Component{

    constructor(props){
        super(props);
       
    }

    render(){
        const {cancel,confirm,indexid} = this.props;
        return <Modal>
            <div className={styles.modalBoday}>
                <div>
                    <div className={styles.content}>You are about to remove this product.<br/>Are you sure want to do this?</div>
                    <strong>You will be returned to the product selections for your goal.</strong>
                    <p></p>
                </div>
            </div>
            <div className={styles.btnArea}>
                <a  className={styles.cancelBtn}  onClick={cancel.bind(this)}>Cancel</a> 
                <a  className={styles.subBtn}  onClick={confirm.bind(this,indexid)}>confirm</a> 
            </div> 
       </Modal>
    }
}