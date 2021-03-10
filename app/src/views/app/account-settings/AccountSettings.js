import React, { Component } from 'react'
import { Input } from 'semantic-ui-react'
import { Form } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import axios from 'axios';

class AccountSettings extends Component {
	constructor(props) {
		super(props)
        this.state = {
            nickname: '',
            nicknameSet: true
        }
	}

    async componentWillMount() {
        const address = this.props.eth.account
        axios.get('http://localhost:8888/api/address/'+address)
        .then((response) => {
            if (response.data.nickname != "") {
                this.setState({ nickname: response.data.nickname })
            } else {
                this.setState({ nicknameSet: false })
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    saveNickname() {
        const address = this.props.eth.account
        axios.post('http://localhost:8888/api/address/'+address, {
            nickname: this.state.nickname
        })
        .then((response) => {
            this.setState({ nicknameSet: true})
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

	render() {
        let warning = (
        <div className="ui red message">
            <span style={{textAlign: "left"}}><p>Once set, you wont be able to change your nickname. It will be visible by other users.</p></span>
        </div>
        )
		return (
            <div>
                <h3>{ this.props.eth.account }</h3>
                {warning}
                <Form onSubmit={(event) => {
                    if (this.state.nicknameSet == false) {
                        this.saveNickname()
                    }
			    }}>
                    <Form.Field>
                        <label>Unique username</label>
                        <Input
                        type='text'
                        name='nickname'
                        placeholder='CryptoLolo'
                        value={this.state.nickname}
                        onChange={this.onChangeHandler}
                        disabled={this.state.nicknameSet == true ? 'disabled' : ''}
                        />
                    </Form.Field>
                    <Button className="ui fluid large teal submit">Save</Button>
                </Form>
            </div>
		);
	}
}

export default AccountSettings;