import React, { Component } from 'react'

// Tools
import Web3 from 'web3'
import { generateFromString } from 'generate-avatar'
import { ToastContainer, toast } from 'react-toastify'

// Views+Components
import Home from './home/Home'
import Marketplace from './market/Marketplace'

// Style
import 'react-toastify/dist/ReactToastify.css'
import './App.css'

// Helpers
import API from '../../helpers/api'
import ETH from '../../helpers/eth'

// Main component for /app route
// Called in index's router
class App extends Component {

	constructor(props) {
		super(props)
		this.state = { account: null, eth: null, menuItem: -1 } // Default states
        this.api = new API()
	}

	async componentWillMount() {
		let myEth = new ETH()
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		}
		await myEth.init(window.web3, (notification) => {
            this.showToast(notification)
        })
		await myEth.loadBlockchainData()
		this.setState({ account: myEth.account })
		this.setState({ eth: myEth})
        this.setState({ menuItem : 0 })
	}

    render() {
		return (
            <div>
                <ToastContainer />
                <div className="main_header">
                <div className="ui grid top_menu_grid">
                    <div className="left floated ten wide column">
                        <div className="ui">
                            <div className='title'>Hello.</div>
                        </div>
                    </div>
                    <div className="right floated six wide column">
                        <div className='menu_avatar'>
                            {this.state.account == null ? null : (<img src={`data:image/svg+xml;utf8,${generateFromString(this.state.account)}`} alt=""/>)}
                        </div>
                    </div>
                </div>
                <div className="ui secondary pointing menu">
                    <a className={this.state.menuItem == 0 ? "active item" : "item"}
                    onClick={this.menuAction}
                    name="home" >
                        Home
                    </a>
                    <a className={this.state.menuItem == 1 ? "active item" : "item"}
                    onClick={this.menuAction}
                    name="market" >
                        Marketplace
                    </a>
                    <div className="right menu">
                        <div className="item">
                        <div className="ui teal button" onClick={ this.mintButtonAction }>Mint</div>
                        </div>
                    </div>
                </div>
                </div>
                <div className="main_container">
                    { this.showBody() }
                </div>
            </div>
		);
	}

    // PRESENTATION

    showBody() {
        switch (this.state.menuItem) {
            case -1:
              return <div className="loader"></div>
            case 0:
                return (<Home eth={this.state.eth}/>)
            case 1:
                return (<Marketplace />)
            default:
                break;
        }
    }

    // ACTIONS

    menuAction = (event) => {
        if (event.target.name == "home") {
            this.setState({ menuItem : 0 })
        }
        if (event.target.name == "market") {
            this.setState({ menuItem : 1 })
        }
    }

    mintButtonAction = () => {
        this.state.eth.mint((returnValues) => {
            let tokenId = returnValues.tokenId
            this.api.registerNewToken(tokenId, this.state.eth.account, (success) => {
                this.showToast('Successfully minted a new token (id:'+tokenId+')')
                // reload page
                this.showBody()
            })
        })
    }

    showToast = (message) => {
        toast.info(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }
}

export default App;