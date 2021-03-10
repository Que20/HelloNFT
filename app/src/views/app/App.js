import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3'
import MintForm from './mint-form/MintForm';
import TokenList from './token-list/TokenList';
import AccountSettings from './account-settings/AccountSettings'

const ETH = require('../../helpers/eth')

class App extends Component {

	constructor(props) {
		super(props)
		this.state = {
			account: null,
			eth: null,
            selection: -1
		}
        this.menuAction = this.menuAction.bind(this)
	}

	async componentWillMount() {
		console.log('Hello there!')
		let myEth = new ETH()
		if (window.ethereum) {
			window.web3 = new Web3(window.ethereum)
			await window.ethereum.enable()
		} else if (window.web3) {
			window.web3 = new Web3(window.web3.currentProvider)
		}
		await myEth.init(window.web3)
		await myEth.loadBlockchainData()
		this.setState({ account: myEth.account })
		this.setState({ eth: myEth})
        this.setState({ selection : 0 })
	}

    menuAction(event) {
        if (event.target.name == "mint") {
            this.setState({ selection : 1 })
        }
        if (event.target.name == "token") {
            this.setState({ selection : 0 })
        }
        if (event.target.name == "account") {
            this.setState({ selection : 2 })
        }
    }

	render() {
		return (
			<div className="App">
                <div className="ui inverted menu">
                    <div className="header item">Project HELLO Token</div>
                    <a className={this.state.selection == 0 ? "active item" : "item"} href="#" onClick={this.menuAction} name="token">My Tokens</a>
                    <a className={this.state.selection == 1 ? "active item" : "item"} href="#" onClick={this.menuAction} name="mint">Mint new</a>
                    <div className="right menu">
                        {/* <span className="item right">conntected with<span className="address"> &nbsp;{this.state.account}</span></span> */}
                        <a className="item right" href="#" onClick={this.menuAction} name="account"><i class="user icon"></i></a>
                        
                    </div>
                </div>
                
				<main className="ui center aligned grid">
					<div className="column">
						{ this.showBody() }
					</div>
				</main>
			</div>
		);
	}

    showBody() {
        switch (this.state.selection) {
            case -1:
              return <div class="loader"></div>
            case 0:
                return (<TokenList eth={this.state.eth}/>)
            case 1:
                return (<MintForm eth={this.state.eth}/>)
            case 2:
                return (<AccountSettings eth={this.state.eth}/>)
            default:
                break;
          }
        
    }
}

export default App;
