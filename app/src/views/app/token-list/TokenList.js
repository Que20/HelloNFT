import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react'

class TokenList extends Component {
	constructor(props) {
		super(props)
        this.state = {
            tokenIdList: [],
            tokenList: [],
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
                            console.log(this.state)
                        }
                    })
                }
            })
        }
    }

    getTokenData(id, callback) {
        axios.get('http://localhost:8888/api/token/'+id)
        .then((response) => {
            callback(response.data)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

	render() {
		return (
            <div>
                <h1 className="ui header">Your balance of HELLO Token is {this.state.tokenList.length}</h1>
                <table class="ui celled table">
                <thead>
                    <tr>
                        <th>Nickname</th>
                        <th>Token Id</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.tokenList.map((token, key) => {
                            return (
                                <tr>
                                    <td data-label="Nickname">{token.data.name}</td>
                                    <td data-label="Token Id">{token.tokenId}</td>
                                    <td data-label="Action">
                                        <div class="ui basic icon buttons">
                                            <button class="ui button">
                                                Transfert
                                            </button>
                                            <button class="ui button">
                                                <i class="comments icon"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
                </table>
            </div>
		);
	}
}

export default TokenList;