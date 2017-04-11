/**
 * Created by Administrator on 2017/3/13.
 */
import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import Util from '../vendors/Util';
import Event from '../vendors/Event';
import _ from 'lodash';

import TextField from '../TextField';
import DayPicker from '../_DayPicker';

import MonthPicker from '../_MonthPicker';
import YearPicker from '../_YearPicker';
import TimePicker from '../_TimePicker';
import RaisedButton from '../RaisedButton';
import './DateTimePicker.css';

export default class DateTimePicker extends Component {

    constructor(props) {

        super(props);
        const initValue = Util.value2Moment(props.value, props.dateFormat);
        this.state = {
            value: initValue, // Moment object
            textFieldValue: initValue.format(props.dateFormat),
            popupVisible: false,
            year:initValue.format('YYYY'),
            month:initValue.format('MM'),
            day:initValue.format('DD'),
            hour:initValue.format('HH'),
            minute:initValue.format('mm'),
            second:initValue.format('ss'),
            datePickerLevel:0,
            marginLeft:0,
            isFooter:true
        };

        this.textFieldChangeHandle = this::this.textFieldChangeHandle;
        this.mousedownHandle = this::this.mousedownHandle;
        this.resizeHandle = this::this.resizeHandle;
        this.datePickerChangeHandle = this::this.datePickerChangeHandle;
        this.yearPickerChangeHandle = this::this.yearPickerChangeHandle;
        this.monthPickerChangeHandle = this::this.monthPickerChangeHandle;
        this.dayPickerChangeHandle = this::this.dayPickerChangeHandle;
        this.timePickerChangeHandle = this::this.timePickerChangeHandle;
        this.chooseDateAndTimeHandle = this::this.chooseDateAndTimeHandle;
        this.nowHandle = this::this.nowHandle;
        this.selectDateTimeHandle = this::this.selectDateTimeHandle;
    }

    datePickerChangeHandle(select){
        let {datePickerLevel}=this.state;
        datePickerLevel = datePickerLevel+1;
        this.setState({
            datePickerLevel:datePickerLevel
        })
    }
    textFieldChangeHandle(text){
        if(text && text.length) {
            const flag = moment(text, this.props.dateFormat, true).isValid();
            if (flag) {
                const select_year = moment(text).format('YYYY'),
                    select_month = moment(text).format('MM'),
                    select_day = moment(text).format('DD'),
                    hour = moment(text).format('HH'),
                    minute = moment(text).format('mm'),
                    second = moment(text).format('ss')
                this.setState({
                    textFieldValue: text,
                    year: select_year,
                    month: select_month,
                    day: select_day,
                    hour:hour,
                    minute:minute,
                    second:second
                })
            }
        }else{
            this.setState({
                textFieldValue: text
            })
        }
    }

    dayPickerChangeHandle(date){
        this.setState({
            textFieldValue:date.time,
            year:date.year,
            month:date.month,
            day:date.day,
        })
    }

    monthPickerChangeHandle(date){
        this.setState({
            datePickerLevel:0,
            year:date.year,
            month:date.month
        })
    }
    yearPickerChangeHandle(year){
        this.setState({
            datePickerLevel:1,
            year:year
        })
    }

    timePickerChangeHandle(obj){
        let state = _.cloneDeep(this.state);
        state.hour=obj.hour;
        state.minute=obj.minute;
        state.second=obj.second;
        let timer = moment([state.year,+state.month-1,state.day,state.hour,state.minute,state.second]).format(this.props.dateFormat);
        this.setState({
            hour:obj.hour,
            minute:obj.minute,
            second:obj.second,
            textFieldValue:timer
        })
    }

    chooseDateAndTimeHandle(value){
        this.setState({
            datePickerLevel:value
        })
    }

    selectDateTimeHandle(){
        let state=_.cloneDeep(this.state);
        state.popupVisible=false;
        this.setState(state);
    }

    nowHandle(){
        const year = moment().format('YYYY'),
            month=moment().format('MM'),
            day=moment().format('DD'),
            hour=moment().format('HH'),
            minute=moment().format('mm'),
            second=moment().format('ss');

        let timer = moment().format(this.props.dateFormat);
        this.setState({
            textFieldValue:timer,
            year: year,
            month: month,
            day: day,
            hour: hour,
            minute: minute,
            second: second
        })
    }

    mousedownHandle(e) {
        const flag =  Event.triggerPopupEventHandle(e.target,require('react-dom').findDOMNode(this.refs.trigger),this.refs.popup,this.state.popupVisible);
        if(flag){
            !this.props.disabled && this.setState({
                popupVisible:flag
            });
        }else{
            !this.props.disabled && this.setState({
                popupVisible:flag,
                datePickerLevel:0
            });
        }
    }
    resizeHandle(){
        const {left} = Util.getOffset(this.refs.datePicker);
        const width = 300;
        const windowWidth = document.body.clientWidth;
        let marginLeft;
        if((left+width)>=windowWidth){
            marginLeft = (left+width)-windowWidth;
        }else{
            marginLeft=0
        }
        this.setState({
            marginLeft:marginLeft
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value || nextProps.dateFormat !== this.props.dateFormat) {
            const value = Util.value2Moment(nextProps.value, nextProps.dateFormat);
            this.setState({
                value,
                textFieldValue: value.format(nextProps.dateFormat)
            });
        }
    }

    componentDidMount() {
        // debugger
        const {value,dateFormat}=this.props;
        let state = _.cloneDeep(this.state);
        const {left} = Util.getOffset(this.refs.datePicker);
        const width = 300;
        const windowWidth = document.body.clientWidth;
        let marginLeft;
        if((left+width)>=windowWidth){
            marginLeft = (left+width)-windowWidth;
        }else{
            marginLeft=0
        }
        if(value){
            const select_year = moment(value).format('YYYY'),
                select_month=moment(value).format('MM'),
                select_day=moment(value).format('DD');

            state.value=value;
            state.textFieldValue=moment(value).format(dateFormat);
            state.year=select_year;
            state.month=select_month;
            state.day=select_day;
            if(marginLeft){
                state.marginLeft=marginLeft;
            }
            this.setState(state)
        }

        Event.addEvent(window, 'mousedown', this.mousedownHandle);
        Event.addEvent(window, 'resize', this.resizeHandle);
    }

    componentWillUnmount() {
        Event.removeEvent(window, 'mousedown', this.mousedownHandle);
        Event.removeEvent(window, 'resize', this.resizeHandle);
    }

    render() {
        const {className, style, name, placeholder , dateFormat,maxValue,minValue} = this.props;
        const {textFieldValue, popupVisible ,datePickerLevel,year,month,day,hour,minute,second,marginLeft,isFooter} = this.state;
        const popStyle={
            left:'-'+marginLeft+'px'
        }

        return (
            <div className={`date-picker ${className}`}
                 ref="datePicker"
                 style={style}>

                <TextField ref="trigger"
                           className="date-picker-field"
                           name={name}
                           placeholder={placeholder}
                           value={textFieldValue}
                           iconCls="fa fa-calendar"
                           readOnly={true}
                           isClearIcon={false}
                    />

                <div ref="popup"
                     className={`date-picker-popup ${popupVisible ? '' : 'hidden'}`}
                      style={popStyle}>
                    <div className="calendar-date-input-wrap">
                        <TextField  className='calendar-input'
                                    placeholder={'Select Date'}
                                    isClearIcon={true}
                                   value={textFieldValue}
                                   onChange={this.textFieldChangeHandle}/>
                    </div>
                    {
                        datePickerLevel == 0 ?
                            <DayPicker
                                dateFormat={dateFormat}
                                year={year}
                                month={month}
                                day={day}
                                hour={hour}
                                minute={minute}
                                second={second}
                                maxValue={maxValue}
                                minValue={minValue}
                                isFooter={true}
                                onChange={this.dayPickerChangeHandle}
                                previousClick={this.datePickerChangeHandle}
                            />
                            :(
                            datePickerLevel == 1 ?
                                <MonthPicker
                                    year={year}
                                    month={month}
                                    day={day}
                                    maxValue={maxValue}
                                    minValue={minValue}
                                    onChange={this.monthPickerChangeHandle}
                                    previousClick={this.datePickerChangeHandle}
                                />
                                :(
                                datePickerLevel == 2 ?
                                    <YearPicker
                                        year={year}
                                        month={month}
                                        day={day}
                                        maxValue={maxValue}
                                        minValue={minValue}
                                        onChange={this.yearPickerChangeHandle}
                                    />
                                    :
                                    <TimePicker className="time-picker-body"
                                                popupVisible={popupVisible}
                                                hour={hour}
                                                minute={minute}
                                                second={second}
                                                onChange={this.timePickerChangeHandle}
                                    />
                            )

                        )

                    }
                    {
                        isFooter ?
                            <div className="calendar-footer">
                                <div className="action fl">
                                    {
                                        (minValue && moment(this.props.value).isBefore(minValue)) || (maxValue && moment(maxValue).isBefore(this.props.value))?
                                            <a href="javascript:;" className="fl">
                                                <span className="item-gray">Now</span>
                                            </a>
                                            :
                                            <a href="javascript:;"
                                               className="fl"
                                               onClick={this.nowHandle}>
                                                Now
                                            </a>
                                    }
                                    {
                                        datePickerLevel == 3 ?
                                            <a href="javascript:;" className="fr" onClick={()=>{
                                                this.chooseDateAndTimeHandle(0)
                                            }}>
                                                Select date
                                            </a>
                                            :
                                            <a href="javascript:;" className="fr" onClick={()=>{
                                                this.chooseDateAndTimeHandle(3)
                                            }}>
                                                Select time
                                            </a>
                                    }
                                </div>
                                <div className="select-button fr" onClick={this.selectDateTimeHandle}>
                                    <RaisedButton  className={year && month && day && hour && minute && second ? 'active': ''}
                                                   value="Ok"
                                                   buttonStyle="primary"
                                                   />
                                </div>
                            </div>
                            :
                            null
                    }
                </div>

            </div>
        );
    }
};

DateTimePicker.propTypes = {

    className: PropTypes.string,
    style: PropTypes.object,

    name: PropTypes.string,

    // timestamp
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
    placeholder: PropTypes.string,
    dateFormat: PropTypes.string,
    popupVisible: PropTypes.bool

};

DateTimePicker.defaultProps = {

    className: '',
    style: null,

    name: '',
    value: new Date().getTime(),
    placeholder: 'Date',
    dateFormat: 'YYYY-MM-DD HH:mm:ss'

};