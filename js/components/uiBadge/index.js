import './index.css';

import React from 'react';

/**
 * A number badge for icons.
 */
export default class Badge extends React.Component {
	render() {
		return (
			<div className='badge'>
				<div className='badge-text'>{this.props.count}</div>
			</div>
		);
	}
}
