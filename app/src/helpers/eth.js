const HelloContract = require("../abi/Hello.json")

class ETH {

    constructor() {
        this.web3 = null
        this.account = null
        this.contract = null
        this.notifier = null
    }
	
	init = (web3, notifier) => {
		this.web3 = web3
        this.notifier = notifier
	}

    notifyView = (text) => {
        if (this.notifier != null) {
            this.notifier(text)
        }
    }

	loadBlockchainData = async () => {
		const accounts = await this.web3.eth.getAccounts()
		this.account = accounts[0]
		const networkId = await this.web3.eth.net.getId()
		const networkData = HelloContract.networks[networkId]
		if(networkData) {
			const abi = HelloContract.abi
			const address = networkData.address
			this.contract = new this.web3.eth.Contract(abi, address)
		} else {
			this.notifyView("Unable to retreive network data")
		}
		if(this.account == null) {
            this.notifyView("Unable to acces the metamask account")
		}
		if(this.contract == null) {
            this.notifyView("Unable to get the smart contract")
		}
	}

	mint = (callback) => {
		var mintTxHash = null
		this.contract.methods.mint().send({from: this.account}, (error, result) => {
			mintTxHash = result
            // TODO : handle error
            if (error == null) {
                this.notifyView("Token successfully minted. Now waiting for miners validation. This could take a few minutes.")
            } else {
                this.notifyView("Oops, something happend. No token were minted. Try again.")
            }
            
		})
		this.contract.events.allEvents((error, event) => {
            console.log(event)
			if (event != null && mintTxHash != null) {
				if (event.transactionHash == mintTxHash && event.returnValues.to == this.account) {
					callback(event.returnValues)
				}
			}
		})
	}

    transfert = (id, dest, callback) => {
        this.contract.methods.transferFrom(this.account, dest, id).send({from: this.account}, (error, result) => {
            if (error == null) {
                this.notifyView("Token sucessfully transfered.")
            } else {
                this.notifyView("Oops, something happend. Try again.")
            }
		})
    }

    getTokens = (callback) => {
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
export default ETH