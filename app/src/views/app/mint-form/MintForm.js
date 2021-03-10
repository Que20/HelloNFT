import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react'
import { Input } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import axios from 'axios';

let countries = [
	{ key: 'af', value: 'af', flag: 'af', text: 'Afghanistan' },
	{ key: 'ax', value: 'ax', flag: 'ax', text: 'Aland Islands' },
	{ key: 'al', value: 'al', flag: 'al', text: 'Albania' },
	{ key: 'dz', value: 'dz', flag: 'dz', text: 'Algeria' },
]

class MintForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			nickname: '',
			data: '',
			country: '',
			mintedId: null,
            hasSetNickname: true
		}
        this.componentWillMount = this.componentWillMount.bind(this)
	}

    async componentWillMount() {
        const address = this.props.eth.account
        axios.get('http://localhost:8888/api/address/'+address)
        .then((response) => {
            if (response.data.nickname == "") {
                this.setState({ hasSetNickname: false})
            } else {
                this.setState({ hasSetNickname: true})
                this.setState({ nickname: response.data.nickname})
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

	onChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}

    createNickname(callback) {
        const address = this.props.eth.account
        axios.post('http://localhost:8888/api/address/'+address, {
            nickname: this.state.nickname
        })
        .then((response) => {
            this.setState({ hasSetNickname: true})
            callback()
        })
        .catch(function (error) {
            console.log(error)
            callback()
        })
    }

	async mint() {
		let nick = this.state.nickname
		if (nick != null && nick != "") {
			this.props.eth.mint(this.state.nickname, (token_id) => {
				this.setState({
					nickname: '',
					data: '',
					country: '',
					mintedId: token_id
				})
				axios.post('http://localhost:8888/api/token', {
					nickname: nick,
					data: this.state.data,
					token_id: token_id
				})
				.then((response) => {
					this.setState({ mintedId: token_id})
				})
				.catch(function (error) {
					console.log(error)
				})
			})
		}
	}

	render() {
		let validation = null
		if (this.state.mintedId != null) {
			let success = <span style={{textAlign: "left"}}><p>Success: You've just minted the token {this.state.mintedId}</p></span>
			validation = <div className="ui teal message"> {success} </div>
		}
		return (
            <div>
                <h1 className="ui header">Issue a new HELLO Token</h1>
                <p>Create a token registered with your nickname.</p>
                <p>This token will allow anyone that buys it to reach you via the HelloIM app</p>

                <Form onSubmit={(event) => {
                    if (this.state.hasSetNickname == false) {
                        this.createNickname(() => {
                            this.mint()
                        })
                    } else {
                        this.mint()
                    }
			    }}>
				    {validation}
                    <Form.Field>
                        <label>Unique username</label>
                        <Input
                        type='text'
                        name='nickname'
                        placeholder='CryptoLolo'
                        value={this.state.nickname}
                        onChange={this.onChangeHandler}
                        disabled={this.state.hasSetNickname == true ? 'disabled' : ''}
                        />
                    </Form.Field>
                    <Form.Field>
                    <label>Some data you would want to add ?</label>
                        <Input
                        type='text'
                        name='data'
                        placeholder='Hey there 👋'
                        onChange={this.onChangeHandler}
                        />
                    </Form.Field>
                    <Form.Field>
                    <label>Country</label>
                        <Dropdown
                            placeholder='Country'
                            fluid
                            selection
                            name='country'
                            value={this.state.country}
                            onChange={this.onChangeHandler}
                            options={countries}
                        />
                    </Form.Field>
                    <Button className="ui fluid large teal submit">Mint</Button>
                </Form>
            </div>
		);
	}
}

export default MintForm;