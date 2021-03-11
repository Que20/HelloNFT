import React, { Component } from 'react';

class Marketplace extends Component {
	constructor(props) {
		super(props)
	}

    async componentWillMount() {
        //
    }

	render() {
		return (
            <div>
                <h1>Marketplace</h1>
                <div className="loader"></div>
            </div>
		);
	}
}

export default Marketplace;