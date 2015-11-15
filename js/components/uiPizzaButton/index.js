import './index.css';
import React from 'react';

/**
 * The main clicker button. Creates a pizza.
 */
export default class PizzaButton extends React.Component {
	render() {
		return <button id='pizza-button' onClick={this.props.onClick}></button>;
	}
}
