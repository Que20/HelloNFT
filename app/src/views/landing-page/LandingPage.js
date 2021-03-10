import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import './LandingPage.css';

class LandingPage extends Component {
	constructor(props) {
		super(props)
	}

    async componentWillMount() {
        //
    }

	render() {
		return (
            <div class="pusher">
                {/* <h1>Loris</h1>
                <h2>Tokenize yourself</h2>
                <h3></h3>
                <Button href='../app'>Enter app</Button> */}
                <div class="ui inverted vertical masthead center aligned segment">
                    <div class="ui container">
                        <div class="ui text container">
                            <h1 class="ui inverted header">
                                Tokenize yourself
                            </h1>
                            <h2>Loris is the first non fungible token based messaging service.</h2>
                            <Button className="ui huge teal button" href="../app">Get Started <i class="right arrow icon"></i></Button>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default LandingPage;