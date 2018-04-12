import React, { Component, PropTypes } from 'react';
import Modal from './Modal';
import WarningMessageListCheck from './WarningMessageList';
import styles from './PicopWarningPanel.scss';
import formatHelper from 'lib/formatHelper';

class PicopWarningPanel extends Component {
    constructor (props) {
        super(props);
        this.showTrigger = this.showTrigger.bind(this);
        this.exitBtnHandle = this.exitBtnHandle.bind(this);
        this.leftBtnHandle = this.leftBtnHandle.bind(this);
        this.footerBtnHandle = this.footerBtnHandle.bind(this);
        this.boldPart = null;
    }

    static propTypes = {
        indicator: PropTypes.string
    };

    componentDidMount () {
        if ('F' == this.props.indicator || 'H' == this.props.indicator) {
            this.boldPart.className = styles.bold;
        }
    }
    
    showTrigger (target) {
        if (!target) { return false; }
        return true;
    }

    proceedBtnHandle () {
        this.props.clickEvent();
    }

    exitBtnHandle () {
        const { locale, router } = this.props;
        router.push(`/${locale}/portfolio`);
    }

    leftBtnHandle () {
        const WarningMessageList = WarningMessageListCheck();
        const content = WarningMessageList.PICOPWarningMsg[this.props.indicator].leftBtn;
        if (content == 'Back') {
            this.props.backBtnEvent();
        } else {
            this.proceedBtnHandle();
        }
    }

    footerBtnHandle () {
        const WarningMessageList = WarningMessageListCheck();
        const content = WarningMessageList.PICOPWarningMsg[this.props.indicator].footerBtn;
        if (content == 'Exit') {
            this.exitBtnHandle();
        } else {
            this.proceedBtnHandle();
        }
    }

    render () {
        const WarningMessageList = WarningMessageListCheck();
        const warningType = 'PICOPWarningMsg';
        const modalContent = WarningMessageList.PICOPWarningMsg[this.props.indicator];
        let titleIndicator = false;
        if ('D' == this.props.indicator || 'E' == this.props.indicator) {
            titleIndicator = true;
        }

        const formatContext = (context) => {
            const compiled = _.template(context);
            const date = formatHelper.dateFormat_1(this.props.date);
            return compiled({ 'date': date });
        }

        return (
            <Modal warningType={warningType} titleIndicator={titleIndicator}>
                    <div className={styles['modal-body']}>
                        <p>{modalContent.guideline}</p>
                        <p>{modalContent.requirement}</p>
                        <p ref={(ref) => { this.boldPart = ref; }}>{formatContext(modalContent.option1)}</p>
                    </div>
                    <div className={styles.btnArea}>
                        {this.showTrigger(modalContent.leftBtn) ? <a  className={styles.left} onClick={this.leftBtnHandle}>{modalContent.leftBtn}</a> : null}
                        {this.showTrigger(modalContent.rightBtn) ? <a  className={styles.right} onClick={this.exitBtnHandle}>{modalContent.rightBtn}</a> : null}
                    </div>
                    {this.showTrigger(modalContent.option2)
                        ? <div className={styles['modal-body']}>
                            <p>{formatContext(modalContent.option2)}</p>
                        </div>
                    : null}
                    {this.showTrigger(modalContent.footerBtn)
                        ? <div className={styles.btnArea}>
                            <a  className={styles.left} onClick={this.footerBtnHandle}>{modalContent.footerBtn}</a>
                        </div>
                    : null}
            </Modal>
        );
    }
}

export default PicopWarningPanel;
