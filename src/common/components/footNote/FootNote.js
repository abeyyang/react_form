import React, { PropTypes } from 'react';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';

const FootNote = (props) => {
    return (
        <div className={styles.footNoteWrapper}>
            <div className={styles.footNoteInner}>
                <FontIcon icon={props.icon} theme={styles} />
                <div className={styles.desc}>{props.children}</div>
            </div>
        </div>
    );
};

FootNote.propTypes = {
    children: PropTypes.node.isRequired,
    icon: PropTypes.string
};

FootNote.defaultProps = {
    icon: 'circle-fill-information'
};

export default FootNote;
