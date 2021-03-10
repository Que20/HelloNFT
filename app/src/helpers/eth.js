const Web3 = require("web3")
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
			console.log('No network data')
		}
		if(this.account) {
			//console.log(this.account)
		} else {
			console.log('No account')
		}
		if(this.contract) {
			//console.log(this.contract)
		} else {
			console.log('No contract')
		}
		const totalSupply = await this.contract.methods.totalSupply().call()
		//console.log(totalSupply)
		//this.web3.eth.getTransaction('0x08e00d07ee0b5f9640327c61019b1af45c86668bdf71c7e8f07427230f982a2f', (err, res) => {
			//console.log(res)
		//})
		
	}

	this.mint = function(nickname, callback) {
		var mintTxHash = null
		this.contract.methods.mint(nickname).send({from: this.account}, function(error, result) {
			mintTxHash = result
		})
		this.contract.events.allEvents((error, event) => {
            console.log(event)
			if (event != null && mintTxHash != null) {
				if (event.transactionHash == mintTxHash && event.returnValues.nickname == nickname) {
                    console.log(event.returnValues)
					callback(event.returnValues.tokenId)
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