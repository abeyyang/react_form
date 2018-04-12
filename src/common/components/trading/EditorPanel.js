/**
 * Refer to:
 * https://finance.yahoo.com/quote/YHOO?ltr=1
 */
import React from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fonticon';
import editorPanel from './EditorPanel.scss';
import productsConfig from '../../config/productsConfig';

import FormattedEditorTitle from './buy/formatComponent/formattedEditorTitle'


const FieldDescription = (props) => {
    let fieldDescSection = null;
    let isVisiable = false;

    const onClick = () => {
        isVisiable = !isVisiable;
        fieldDescSection.style.display = (isVisiable && 'block') || 'none';
        // console.log('----------FieldDescription===================='+fieldDescSection
        // );
    };

    const takeRef = (ref) => {
        fieldDescSection = ref;
        // console.log(props.fieldLabel+'---refrefref-------' + (fieldDescSection &&
        // fieldDescSection.innerText || 'empty'));
    };

    return (
        <div className={editorPanel.qmark}>
            <div onClick={onClick}><FontIcon icon="circle-help" /></div>
            <div
                className={editorPanel.description}
                style={{
                    display: 'none'
                }}
                ref={takeRef}
            >
                <div className={editorPanel['triangle-top']} />
                {props.content}
            </div>
        </div>
    );
};

function EditorPanel (props) {
    const fieldLabel = props.fieldLabel;
    const isActive = props.isActive;
    const className = (isActive &&
        classNames(editorPanel.active, editorPanel['h-con'])) ||
        editorPanel['h-con'];
    const [fieldDesCcontent, ...remaining] = props.children;
    let height = productsConfig.EditorPanelMinHight + ( props.underlyingNum - 1 ) * productsConfig.underlyingHight * 2 ;
    return (
        <div className={className} style={{minHeight:`${height}px`}}>
            <h3>
                <span className={editorPanel.title}>{/*  Order type  */} <FormattedEditorTitle title={fieldLabel}/></span>

                <FieldDescription
                    content={fieldDesCcontent}
                    fieldLabel={fieldLabel}
                />
            </h3>
            <div>
                {remaining}
            </div>
        </div>
    );
}

FieldDescription.propTypes = {
    content: React.PropTypes.object
};

EditorPanel.propTypes = {
    children: React.PropTypes.array,
    fieldLabel: React.PropTypes.string,
    isActive: React.PropTypes.bool
};

export default EditorPanel;
