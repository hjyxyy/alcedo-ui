import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import Util from '../vendors/Util';
import Event from '../vendors/Event';
import _ from 'lodash';


import TextField from '../TextField';
import DayPicker from '../_DayPicker';

import MonthPicker from '../_MonthPicker';
import YearPicker from '../_YearPicker';
import './DateRangePicker.css';

export default class DateRangePicker extends Component {

	constructor(props) {

		super(props);
		const initValue = Util.value2Moment(props.value, props.dateFormat);
		let startTime = '',
			endTime = ''
		this.state = {
			value: initValue, // Moment object
			popupVisible: false,
			left:{
				text:startTime,
				datePickerLevel:0,
				year:initValue.format('YYYY'),
				month:initValue.format('MM'),
				day:initValue.format('DD')
			},
			right:{
				text:endTime,
				datePickerLevel:0,
				year:initValue.format('MM') == 12 ? +(initValue.format('YYYY'))+1 : initValue.format('YYYY'),
				month:initValue.format('MM') == 12 ? 1 : +(initValue.format('MM'))+1,
				day:initValue.format('DD')
			},
			startTime:'',
			endTime:'',
			historyStartTime:'',
			historyEndTime:'',
			hoverTime:'',
			marginLeft:0
		};

		this.textFieldChangeHandle = this::this.textFieldChangeHandle;
		this.mousedownHandle = this::this.mousedownHandle;
		this.resizeHandle = this::this.resizeHandle;
		this.datePickerChangeHandle = this::this.datePickerChangeHandle;
		this.yearPickerChangeHandle = this::this.yearPickerChangeHandle;
		this.monthPickerChangeHandle = this::this.monthPickerChangeHandle;
		this.dayPickerChangeHandle = this::this.dayPickerChangeHandle;
		this.dayPickerHoverHandle = this::this.dayPickerHoverHandle;
		this.monthAndYearChangeHandle = this::this.monthAndYearChangeHandle;
	}

	datePickerChangeHandle(select){
        let state = _.cloneDeep(this.state);
        state[select].datePickerLevel = state[select].datePickerLevel+1;
        this.setState(state)
	}
	textFieldChangeHandle(select,text){
		if(text && text.length) {
			const flag = moment(text, this.props.dateFormat, true).isValid();
			if (flag) {
				const initValue = moment(text).format('YYYY-MM-DD');
				const select_year = initValue.split('-')[0],
					select_month = initValue.split('-')[1],
					select_day = initValue.split('-')[2]
                let state = _.cloneDeep(this.state);
				if(select == 'left') {
                    if(moment(text).isBefore(state.right.text)){
                        if(select_year == state.right.year && select_month == state.right.month){
                            state.startTime = text;
                            state.left.text = text;
							if(select_month==12){
								state.right.month =1;
								state.right.year =+select_year+1;
							}else{
								state.right.month =+select_month+1;
							}
                            state.left.year=select_year;
                            state.left.month= select_month;
                            state.left.day= select_day;
                        }else{
							state.startTime = text;
							state.left.text = text;
                            state[select].year=select_year;
                            state[select].month= select_month;
                            state[select].day= select_day;
                        }
                    }
					this.setState(state)
				}else{
                    if(moment(state.startTime).isBefore(text)){
                        if(select_year == state.left.year && select_month == state.left.month){
                            state.endTime = text;
                            state.right.text = text;
                            state.right.month =+select_month+1;
                        }else{
                            state.endTime = text;
                            state.right.text = text;
                            state.right.year=select_year;
                            state.right.month= select_month;
                            state.right.day= select_day;
                        }
                    }
                    this.setState(state)
                }
			}
		}else{
            let state = _.cloneDeep(this.state);
            state[select].text = text;
            this.setState(state)
		}
	}

	dayPickerChangeHandle(select,date){
        let state = _.cloneDeep(this.state);
		if(state.endTime){
            state[select].text=date.time;
            state[select].year=date.year;
            state[select].month= date.month;
            state[select].day= date.day;
            state.startTime=date.time;
			state.endTime='';
			state.hoverTime='';
            this.setState(state)
		}else if(state.startTime){
            let startTime = state.startTime;
            let endTime;
            if(moment(startTime).isBefore(date.time)){
                endTime = date.time;
            }else{
                endTime = startTime;
                startTime = date.time;
            }
            state.right.text =endTime;
            state.left.text = startTime;
			state.endTime =endTime;
            state.startTime = startTime;
			state.historyStartTime=startTime;
			state.historyEndTime=endTime;
			state.hoverTime='';
            this.setState(state)
		}else{
			state[select].text=date.time;
			state[select].year=date.year;
			state[select].month= date.month;
			state[select].day= date.day;
			state.startTime=date.time;
			state.endTime='';
			state.hoverTime='';
			this.setState(state)
		}

	}

	dayPickerHoverHandle(select,date){
		let state = _.cloneDeep(this.state);
		let startTime = state.startTime;
		let endTime = state.endTime;
		if(startTime && endTime==''){
			state.hoverTime = date.time;
			if(moment(startTime).isBefore(date.time)){
				state.left.text=startTime;
				state.right.text=date.time;
			}else{
				state.right.text=startTime;
				state.left.text=date.time;
			}
			this.setState(state)
		}
	}

	monthAndYearChangeHandle(select,date){
		let state = _.cloneDeep(this.state);
		state[select].year=date.year;
		state[select].month=date.month;
		this.setState(state)
	}


	monthPickerChangeHandle(select,date){
        let state = _.cloneDeep(this.state);
        state[select].datePickerLevel = 0;
        state[select].year=date.year;
        state[select].month=date.month;
        this.setState(state);
	}
	yearPickerChangeHandle(select,year){
        let state = _.cloneDeep(this.state);
        state[select].datePickerLevel = 1;
        state[select].year=year;
        this.setState(state);
	}

	MonthDays(year){
		// debugger
		let _date_array = [];
		for (var i = 0; i < 12; i++) {
			switch (i + 1) {
				case 1:
				case 3:
				case 5:
				case 7:
				case 8:
				case 10:
				case 12:
					_date_array.push(31);
					break;
				case 4:
				case 6:
				case 9:
				case 11:
					_date_array.push(30);
					break;
				case 2:
					if (moment(year+'-02-29','YYYY-MM-DD', true).isValid()) {
						_date_array.push(29);
					} else {
						_date_array.push(28);
					}
					break;
				default:
					break;
			}
		}
		return _date_array;
	}

	resizeHandle(){
		const {left} = Util.getOffset(this.refs.datePicker);
		const width = 600;
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

	mousedownHandle(e) {
		// debugger
		const flag =  Event.triggerPopupEventHandle(e.target,require('react-dom').findDOMNode(this.refs.trigger),this.refs.popup,this.state.popupVisible);
		let state = _.cloneDeep(this.state);
        if(flag){
			state.popupVisible=flag
			!this.props.disabled && this.setState(state);
        }else{
			state.popupVisible=flag;
			state.left.datePickerLevel=0;
			state.right.datePickerLevel=0;
			if(!state.endTime){
				state.startTime=state.historyStartTime;
				state.endTime=state.historyEndTime;
				state.left.text=state.historyStartTime;
				state.right.text=state.historyEndTime;
				state.hoverTime='';
				if(state.historyStartTime && state.historyEndTime){
					state.left.year = moment(state.historyStartTime).format('YYYY');
					state.left.month = moment(state.historyStartTime).format('MM');
					state.left.day = moment(state.historyStartTime).format('DD');
					if (moment(state.historyStartTime).format('YYYY') == moment(state.historyEndTime).format('YYYY') && moment(state.historyStartTime).format('MM') == moment(state.historyEndTime).format('MM')) {
						if(moment(state.historyEndTime).format('MM')==12){
							state.right.year=+moment(state.historyEndTime).format('YYYY')+1;
							state.right.month=1;
						}else{
							state.right.year=moment(state.historyEndTime).format('YYYY');
							state.right.month=+moment(state.historyEndTime).format('MM')+1;
						}
					}else{
						state.right.year=moment(state.historyEndTime).format('YYYY');
						state.right.month=moment(state.historyEndTime).format('MM');
					}
					state.right.day = moment(state.historyEndTime).format('DD');
				}
			}
            !this.props.disabled && this.setState(state);
        }

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
		const {defaultValue, dateFormat}=this.props;
        let state = _.cloneDeep(this.state);
		const {left} = Util.getOffset(this.refs.datePicker);
		const width =600;
		const windowWidth = document.body.clientWidth;
		let marginLeft;
		if((left+width)>=windowWidth){
			marginLeft = (left+width)-windowWidth;
		}else{
			marginLeft=0
		}
		if (defaultValue && defaultValue.length) {
			let leftValue = defaultValue[0].value,
				rightValue = defaultValue[1].value,
				leftYear = moment(defaultValue[0].value).format('YYYY'),
				leftMonth = moment(defaultValue[0].value).format('MM'),
				leftDay = moment(defaultValue[0].value).format('DD'),
				rightYear = moment(defaultValue[1].value).format('YYYY'),
				rightMonth = moment(defaultValue[1].value).format('MM'),
				rightDay = moment(defaultValue[1].value).format('DD');
				state.left.text=leftValue;
				state.left.year=leftYear;
				state.left.month=leftMonth;
				state.left.day=leftDay;
				state.right.text=rightValue;
				state.right.day=rightDay;
			if (leftYear == rightYear && leftMonth == rightMonth) {
				if(leftMonth==12){
					state.right.year=+rightYear+1;
					state.right.month=1;
				}else{
					state.right.year=rightYear;
					state.right.month=+rightMonth+1;
				}
			}else{
                state.right.year=rightYear;
                state.right.month=rightMonth;
			}
			state.startTime=leftValue;
			state.endTime=rightValue;
			state.historyStartTime=leftValue;
			state.historyEndTime=rightValue;
			state.marginLeft=marginLeft;
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
		const {className, style, name, placeholder, dateFormat} = this.props;
		const { popupVisible ,left,right,startTime,endTime,hoverTime,marginLeft} = this.state;
		let	textFieldValue;
		if(left.text && right.text){
			textFieldValue = left.text + '~ '+right.text;
		}else{
			textFieldValue = '';
		}

		let maxYear = right.year;
		let maxMonth = right.month;
		if(maxMonth==1){
			maxYear=+maxYear-1;
			maxMonth=12;
		}else{
			maxYear=maxYear;
			maxMonth=+maxMonth-1;
		}
		maxMonth=maxMonth-1;
		let maxDay = this.MonthDays(maxYear)[maxMonth];
		let maxValue = moment([maxYear,maxMonth,maxDay]).format('YYYY-MM-DD');
		// debugger
		let minYear = left.year;
		let minMonth = left.month;
		if(minMonth==12){
			minYear=+minYear+1;
			minMonth=1;
		}else{
			minYear=minYear;
			minMonth=+minMonth+1;
		}
		let minValue = moment([minYear,minMonth-1,1]).format('YYYY-MM-DD');
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
				     className={`date-range-picker-popup ${popupVisible ? '' : 'hidden'}`}
					 style={popStyle}>
					<div className="calendar-date-input-wrap">
						<div className="DateRangePickerHeaderInput">
							<TextField  className='fl calendar-input'
										placeholder={placeholder}
										value={left.text}
										onChange={(text)=>{
											this.textFieldChangeHandle('left',text)
										}}
							/>
							<div className="fl">
								~
							</div>
							<TextField className='fl calendar-input'
									   placeholder={placeholder}
									   value={right.text}
									   onChange={(text)=>{
										   this.textFieldChangeHandle('right',text)
									   }}
							/>
						</div>
					</div>
					{
						left.datePickerLevel == 0 ?
							<DayPicker
								dateFormat={dateFormat}
								year={left.year}
								month={left.month}
								day={left.day}
								isFooter={false}
								isRange={true}
								maxValue={maxValue}
								startTime={startTime}
								endTime={endTime}
								hoverTime={hoverTime}
								monthAndYearChange={(obj)=>{
									this.monthAndYearChangeHandle('left',obj)
								}}
								onChange={(obj)=>{
									this.dayPickerChangeHandle('left',obj)
								}}
								previousClick={()=>{
									this.datePickerChangeHandle('left')
								}}
								hoverHandle={(obj)=>{
									this.dayPickerHoverHandle('left',obj)
								}}
							/>
							:(
							left.datePickerLevel == 1 ?
								<MonthPicker
									year={left.year}
									month={left.month}
									day={left.day}
									maxValue={maxValue}
									onChange={(obj)=>{
										this.monthPickerChangeHandle('left',obj)
									}}
									previousClick={()=>{
										this.datePickerChangeHandle('left')
									}}
								/>
								:
								<YearPicker
									year={left.year}
									month={left.month}
									day={left.day}
									maxValue={maxValue}
									onChange={(obj)=>{
										this.yearPickerChangeHandle('left',obj)
									}}
								/>
						)

					}
					{
						right.datePickerLevel == 0 ?
							<DayPicker
								dateFormat={dateFormat}
								year={right.year}
								month={right.month}
								day={right.day}
								isFooter={false}
								isRange={true}
								startTime={startTime}
								endTime={endTime}
								hoverTime={hoverTime}
								minValue={minValue}
								monthAndYearChange={(obj)=>{
									this.monthAndYearChangeHandle('right',obj)
								}}
								onChange={(obj)=>{
									this.dayPickerChangeHandle('right',obj)
								}}
								previousClick={()=>{
									this.datePickerChangeHandle('right')
								}}
								hoverHandle={(obj)=>{
									this.dayPickerHoverHandle('left',obj)
								}}
							/>
							:(
							right.datePickerLevel == 1 ?
								<MonthPicker
									year={right.year}
									month={right.month}
									day={right.day}
									minValue={minValue}
									onChange={(obj)=>{
										this.monthPickerChangeHandle('right',obj)
									}}
									previousClick={()=>{
										this.datePickerChangeHandle('right')
									}}
								/>
								:
								<YearPicker
									year={right.year}
									month={right.month}
									day={right.day}
									minValue={minValue}
									onChange={(obj)=>{
										this.yearPickerChangeHandle('right',obj)
									}}
								/>
						)

					}
				</div>

			</div>
		);
	}
};

DateRangePicker.propTypes = {

	className: PropTypes.string,
	style: PropTypes.object,

	name: PropTypes.string,

	// timestamp
	value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
	defaultValue: PropTypes.array,
	placeholder: PropTypes.string,
	dateFormat: PropTypes.string,
	popupVisible: PropTypes.bool

};

DateRangePicker.defaultProps = {

	className: '',
	style: null,

	name: '',
	value: new Date().getTime(),
	placeholder: 'Date',
	dateFormat: 'YYYY-MM-DD'

};