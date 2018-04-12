import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import styles from './Modal.scss';

class Modal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isRequiredToClose: false
        };
    }

    static propTypes = {
        cancelBtnIndicator: PropTypes.bool,
        children: PropTypes.array
    };

    componentWillReceiveProps (nextProps) {
        this.setState({
            isRequiredToClose: false
        });
    }

    render () {
        const closeModal = () => {
            this.setState({
                isRequiredToClose: true
            });
        };

        return this.state.isRequiredToClose
            ? null
            : <div
                className={styles.modal}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="myModalLabel"
                aria-hidden="false"
              >
                <div
                    className={classNames(
                          styles['modal-dialog'],
                          styles['modal-eject']
                      )}
                >
                    <div
                        className={classNames(
                              styles['modal-content'],
                              styles.box
                          )}
                    >
                        <div className={styles['modal-top']}>
                            {this.props.cancelBtnIndicator ? <a onClick={closeModal} className={styles.close}>×</a> : null}
                        </div>
                        <div
                            className={classNames(
                                  styles['modal-body'],
                                  styles['modal-con']
                              )}
                        >
                            {this.props.children}
                            <div onClick={closeModal} className={styles.cancelIcon}><FontIcon icon="delete" /></div>
                        </div>
                    </div>
                </div>
            </div>;
    }
}

export default Modal;
