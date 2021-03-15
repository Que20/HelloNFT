import React, { Component } from 'react';

import API from '../../../helpers/api'
import TransfertModal from './TransfertModal'
import { generateFromString } from 'generate-avatar'
import { Button } from 'semantic-ui-react'

class TokenList extends Component {
	constructor(props) {
		super(props)
        this.api = new API()
        this.state = {
            tokenIdList: [],
            tokenList: [],
            modalShown: false,
            transfertTokenData: null
        }
	}

    async componentWillMount() {
        if (this.props.eth != null) {
            this.props.eth.getTokens((tokenList) => {
                this.setState({ tokenIdList: tokenList})
                for (const tokenId of tokenList) {
                    let tmp = this.state.tokenList
                    this.getTokenData(tokenId, (data) => {
                        let tokenFull = {
                            tokenId: tokenId,
                            data: data
                        }
                        tmp.push(tokenFull)
                        if (this.state.tokenIdList.length == tmp.length) {
                            this.setState({ tokenList: tmp})
                        }
                    })
                }
            })
        }
    }

    getTokenData(id, callback) {
        this.api.getToken(id, (response) => {
            callback(response.data)
        })
    }

	render() {
		return (
            <div>
                <h1 className="ui header">Your balance of HELLO Token is {this.state.tokenList.length}</h1>
                <div style={{display: this.state.modalShown == true ? 'block' : 'none'}}>
                    <TransfertModal eth={this.props.eth} transfertTokenData={this.state.transfertTokenData} onClose={() => {
                        this.setState({modalShown: false})
                    }}/>
                </div>
                <div className='ui equal width center aligned padded grid'>
                <div className='column token_list left aligned'>
                {
                    this.state.tokenList.map((token, key) => {
                        let nick = token.data.name
                        let address = token.data.description
                        let id = token.tokenId
                        return (
                            <div class="ui comments">
                                <div class="comment">
                                    <a class="avatar" href="#">
                                        <img src={`data:image/svg+xml;utf8,${generateFromString(address)}`} alt=""/>
                                    </a>
                                    <div class="content">
                                        <a class="author">{nick}</a>
                                        <div class="text">
                                            Token id : {id}
                                            <br />
                                            Address : {address}
                                        </div>
                                    </div>
                                    <Button onClick={() => {
                                        this.transfert(id, nick, address) 
                                    }}>Transfert</Button>
                                </div>
                                <div className='separator'></div>
                            </div>
                        )
                    })
                }
                </div>
                <div className='column conversation_box left aligned'>
                    
                </div>
                </div>
            </div>
		)
	}

    transfert = (id, nick, address) => {
        this.setState({ modalShown: true })
        this.setState({ transfertTokenData: {
            id: id,
            nick: nick,
            address: address
        } })
    }
}

export default TokenList;