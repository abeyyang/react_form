import React, { Component } from 'react';
import classNames from 'classnames';
import FontIcon from 'wealth/lib/web/components/ui/fontIcon';
import styles from './style.scss';
import { browserHistory } from 'react-router';

export default class disclaimer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            showHideInd:{
                disclaimerAndDeclarations:false
            }
        };
    }
    componentWillMount(){
    }
    
    componentWillReceiveProps(nextProps) {
       
        this.setState({
             showHideInd:{
                disclaimerAndDeclarations:false
            }
        });
    }
    show (currentType,event) {
        this.setState((preState, props) => {
            preState.showHideInd[""+currentType+""]=!preState.showHideInd[""+currentType+""];
            return preState;
        });
    }

    render () {
       
        const disclaimerAndDeclarations =this.state.showHideInd.disclaimerAndDeclarations;
        
        return (
           <div className={classNames(styles.disclaimer, styles.clearfix)}>
                    <p className={styles.pointer} onClick={this.show.bind(this,'disclaimerAndDeclarations')}>Disclaimer & declarations
                    
                    <FontIcon icon= {disclaimerAndDeclarations ?"chevron-up-small":"chevron-down-small"} className={styles.chevron} /></p>   
                    
                {disclaimerAndDeclarations ?
                    (<div>
                        <p className={styles.declareDetail}>
                            Lorern ipsum dolor sit amet, consectetur adipiscing elit. Phasellus metus nisi, gravida vita gravida non, efficitur et sem. Nam 
                            congue turpis ut scelerisque fermentum. Vestibulum id pretium nisi, rhoncus aliquet felis. Vestibulum felis leo, porta eget felis eu, laoreet 
                            faucibus arcu. Ut ac sollicitudin sapien. Nulla ullamcorper sagittis risus eu molestie. Fusce finibus nibh sit amet erat interdum, sit amet dapieus 
                            est aliquet. Nunc imperdiet ante quis lorem iaculis consequat. Proin at maximus felis. Vestibulum sed diam in eros sollicitudin fringilla consectetur in
                            neque.
                        </p>
                        <br/>
                        <p className={styles.declareDetail}>
                            Nullam volutpat ullamcorper fermentum. Fusce pretium arcu leo, non dignissim odio ullamcorper eu. Praesent euismod
                            nec nisi ac ultricies. Maecenas semper, sem vel Vestibulum consectetur, tellus ex vulputate ante, vel ullamcorper dolor 
                            nunc sed ligula. Etiam id ligula quis arcu luctus suscipit eu a quam. Sed lectus ipsum, finibus id nisl sit amet, molesite 
                            vehicula leo. Sed sit amet ultricies magna. 
                        </p>
                        <br/>
                    </div>) : null
                }
            </div>
        );
    }
}
