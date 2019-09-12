
const formatNum = n => {
	n = n.toString();
  return n[1] ? n : '0' + n;
}

const dateFormat = time => {
	let newTime = new Date(time);
	let year = newTime.getFullYear();
	let month = newTime.getMonth() + 1;
	let day = newTime.getDate();
	return [year, formatNum(month), formatNum(day)].join('-');
}

export default dateFormat;