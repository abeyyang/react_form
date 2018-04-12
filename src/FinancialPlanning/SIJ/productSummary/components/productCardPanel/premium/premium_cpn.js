import React,{Component} from 'react';
import styles from './style.scss';
import QuoteModal from './QuoteModal';
import Popup from 'wealth/lib/web/components/widgets/popup';
import popupStyle from './popup.scss';

const Premium = (props) => {
        const {data,confirmQuoteOverlay,cancelQuoteOvleray,loadingGetQuote}= props;
        
        console.log('Premium...',props);
        return (
           <div className={styles.premium}>
                <p>{data.Premium}</p>
                <div className={styles.button}>
                    <a data-popupRef="Quote" onClick={()=>{
                            props.loadingGetQuote(props.row)
                        }}>Get quote</a>
                </div>
                <Popup  theme={popupStyle} popupRef="Quote" ref="popupQuote" show={props.getQuoteData.getQuoteOneOverlay}>
                    <QuoteModal confirmQuoteOverlay={props.confirmQuoteOverlay} cancelQuoteOvleray={props.cancelQuoteOvleray} getQuoteData={props.getQuoteData} updateGetQuoteForm={props.updateGetQuoteForm}/>
                </Popup>
            </div>   
        );
    }

export default Premium;  