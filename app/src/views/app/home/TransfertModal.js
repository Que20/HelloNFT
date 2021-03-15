import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'

class TransfertModal extends Component {
	constructor(props) {
		super(props)
        this.state = {
            dest: null
        }
	}

    async componentWillMount() {
        //
    }

    onChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}


	render() {
		return (
            <div className='transfert_modal'>
                <div className='modal_container'>
                    <div className='modal_close'>
                        <a href="#" onClick={() => { this.props.onClose() }}> <i class="close icon"></i> </a>
                    </div>
                    <h3>
                        Transfert { this.props.transfertTokenData != null ? this.props.transfertTokenData.nick : ""}
                    </h3>

                    <form class="ui form">
                    <div class="field">
                        <label>To address</label>
                        <input type="text" name="dest" placeholder="0x0000" value={this.state.dest} onChange={this.onChangeHandler}/>
                    </div>

                    <button class="ui button" type="submit" onClick={() => {
                        this.props.eth.transfert(this.props.transfertTokenData.id, this.state.dest, () => {
                            this.props.onClose()
                        })
                    }}>Submit</button>
                    </form>
                </div>
            </div>
		)
	}
}

export default TransfertModal;