const HelloContract = require("../abi/Hello.json")

module.exports = function() {
	this.web3 = null
	this.account = null
	this.contract = null

	this.init = async function(web3) {
		this.web3 = web3
	}

	this.loadBlockchainData = async function() {
		const accounts = await this.web3.eth.getAccounts()
		this.account = accounts[0]
		const networkId = await this.web3.eth.net.getId()
		const networkData = HelloContract.networks[networkId]
		if(networkData) {
			const abi = HelloContract.abi
			const address = networkData.address
			this.contract = new this.web3.eth.Contract(abi, address)
		} else {
			// TODO : notify unable to retreive network data
		}
		if(this.account == null) {
			// TODO : notify unable to acces the metamask account
		}
		if(this.contract == null) {
			// TODO : notify unable to get the smart contract
		}
	}

	this.mint = function(callback) {
		var mintTxHash = null
		this.contract.methods.mint().send({from: this.account}, function(error, result) {
			mintTxHash = result
            // TODO : handle error
            // TODO : notify mint sent + waiting for miners validation
		})
		this.contract.events.allEvents((error, event) => {
            console.log(event)
			if (event != null && mintTxHash != null) {
				if (event.transactionHash == mintTxHash && event.returnValues.to == this.account) {
                    console.log(event.returnValues)
					callback(event.returnValues)
				}
			}
		})
	}

    this.getTokens = function(callback) {
        var owned = []
        this.contract.methods.balanceOf(this.account).call((err, res) => {
            var i = 0
            for (i = 0; i < res; i++) {
                this.contract.methods.tokenOfOwnerByIndex(this.account, i).call((err, token) => {
                    owned.push(token)
                    if (owned.length == res) {
                        callback(owned)
                    }
                })
            }
        })       
    }
}