import React from 'react';

export default class InfoLabel extends React.Component {
	render() {
		return this.props.enabled ?
			<label className='content'>{this.props.value}</label> : null;
	}
}
