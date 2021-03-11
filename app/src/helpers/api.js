import axios from 'axios';

class API {
    constructor() {}
    
	registerNewToken(tokenId, address, callback) {
		callback(true)
	}

    getNickname(address, callback) {
        //
    }

    getToken(tokenId, callback) {
        //
    }

    _post(url, data, callback) {
        axios.post(url, data)
        .then((response) => {
            callback(response, null)
        })
        .catch(function (error) {
            callback(null, error)
        })
    }

    _get(url, callback) {
        axios.get(url)
        .then((response) => {
            callback(response, null)
        })
        .catch(function (error) {
            callback(null, error)
        })
    }

}

export default API