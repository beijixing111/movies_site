
import Axios from 'axios';

const apis = {
	menuinfo: '/api/menuinfo',
	login: '/api/login',
	movie: '/api/movie',
	pic: '/api/pic' 
};

const toUrlData = obj => {
	let dataArr = [];
	for(let key in obj) {
		dataArr.push([key, obj[key]].join('='));
	}
	return dataArr.join('&');
}

const callapi = (api,  method = 'GET', params = {}) => {
	let config = {
		method,
		timeout: 3000,
		url: api
	};
	if(method == 'GET' || method == 'DELETE') {
		config.url += '?' + toUrlData(params);
	}
	if(method == 'POST' || method == 'PUT') {
		config.data = params;
	} 
	return new Promise ((resolve,reject) => {
		Axios(config).then(res => {
			console.log(res);
			resolve(res);
		}).catch(err => {
			console.log(err);
			reject(err);
		});
	})
	
}

const getMovieData = params => {
	return callapi(apis.movie, 'GET', params);
}

const putMovieData = params => {
	return callapi(apis.movie, 'PUT', params);
}

const deleteMovieData = params => {
	return callapi(apis.movie, 'DELETE', params);
}

const getPicData = params => {
	return callapi(apis.pic, 'GET', params);
}

const login = params => {
	return callapi(apis.login, 'POST', params);
}

const getMenuInfo = params => {
	console.log(params);
	return callapi(apis.menuinfo, 'GET', params);
}

export {
	getMovieData,
	putMovieData,
	deleteMovieData,
	getPicData,
	login,
	getMenuInfo
};