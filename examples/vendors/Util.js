import moment from 'moment';

function isEmptyObject(obj) {
	try {
		for (let key in obj) {
			return false;
		}
	} catch (e) {
		return true;
	}
}

function isArray(v) {
	return ({}).toString.call(v) === '[object Array]';
}

function isDate(v) {
	return ({}).toString.call(v) === '[object Date]';
}

function getOffset(el) {

	if (!el) {
		return null;
	}

	let offset = {
		top: el.offsetTop,
		left: el.offsetLeft
	};
	while (el.offsetParent) {
		el = el.offsetParent;
		offset.top += el.offsetTop;
		offset.left += el.offsetLeft;
	}

	return offset;

}

function isEnableLocalStorage() {
	try {
		return 'localStorage' in window && window['localStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function isEnableSessionStorage() {
	try {
		return 'sessionStorage' in window && window['sessionStorage'] !== null;
	} catch (e) {
		return false;
	}
}

function isEnableCookieAndStorage() {
	return navigator.cookieEnabled && isEnableLocalStorage() && isEnableSessionStorage();
}

// function deepCopy(source) {
//
// 	let result = {};
//
// 	for (let key in source) {
// 		if (typeof source[key] === 'object') {
// 			result[key] = deepCopy(source[key]);
// 		} else {
// 			result[key] = source[key];
// 		}
// 	}
//
// 	return result;
//
// }

function formatCapitalize(value) {
	return value ? value.charAt(0).toUpperCase() + value.substring(1).toLowerCase() : value;
}

function getScrollHeight() {
	return document.body.scrollHeight || document.documentElement.scrollHeight;
}

function getScrollTop() {
	return document.body.scrollTop || document.documentElement.scrollTop;
}

function value2Timestamp(value, format) {

	const defaultValue = new Date().getTime();

	if (typeof value === 'number') {
		return new Date(value).toString() === 'Invalid Date' ? defaultValue : value;
	} else if (typeof value === 'string') {
		let date = moment(value, format);
		return date.isValid() ? date.valueOf() : defaultValue;
	} else if (moment.isDate(value)) {
		let date = moment(value);
		return date.isValid() ? date.valueOf() : defaultValue;
	}

	return defaultValue;

}

function value2Moment(value, format) {

	const defaultValue = moment();

	if (typeof value === 'string') {
		let date = moment(value, format);
		return date.isValid() ? date : defaultValue;
	} else {
		let date = moment(value);
		return date.isValid() ? date : defaultValue;
	}

}

export default {
	isEmptyObject,
	isArray,
	isDate,
	getOffset,
	isEnableLocalStorage,
	isEnableSessionStorage,
	isEnableCookieAndStorage,
	formatCapitalize,
	getScrollHeight,
	getScrollTop,
	value2Timestamp,
	value2Moment
};