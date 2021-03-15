import axios from 'axios';

class API {
    constructor() {}
    
	registerNewToken(tokenId, address, callback) {
		this._post('http://localhost:8888/api/token', { token_id: tokenId, address: address }, (res, err) => {
            callback(res != null)
        }) 
	}

    getNickname(address, callback) {
        this._get('http://localhost:8888/api/address/'+address, (res, err) => {
            callback(res.nickname)
        })
    }

    getToken(tokenId, callback) {
        this._get('http://localhost:8888/api/token/'+tokenId, (res, err) => {
            callback(res)
        })
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