import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import styles from '../financialProfilePanel/style.scss';


 
 
 export default class SelectNumDependentComponent  extends Component{
     constructor(props){
        super(props);
        // console.log(props,"props")
        this.state={
            denpendentNum:''
        }
     }
     changeHandleNum(event){
        this.setState({
            denpendentNum:event.target.value
        }) 
        this.props.callbackParent(event.target.value);
     }
     render(){
        console.log(this.props.denpendentNum,"select denpentNum");
        let selectValue=0;
        if(this.props.denpendentNum!==undefined&&this.props.denpendentNum!==null){
            selectValue=this.props.denpendentNum
        }
        let tempSelectValue=this.state.denpendentNum
        console.log("selectValue...",selectValue);
        console.log("tempSelectValue...",tempSelectValue);
         return(
                <div className={classNames(styles.currencySelect, styles.number)}>
                    <p><strong>Is anyone dependent on you financially ?</strong></p>
                    <span>Number of dependents</span>
                    <select onChange={this.changeHandleNum.bind(this)} value={(tempSelectValue!==undefined && tempSelectValue !==null&&tempSelectValue !=="")?tempSelectValue:selectValue} >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                </div>
         );
     }
 }