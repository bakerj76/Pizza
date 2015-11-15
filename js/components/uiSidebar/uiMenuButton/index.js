import './index.css';

import React from 'react';
import Badge from 'components/uiBadge';

export default class MenuButton extends React.Component {
	render() {
		var badge;

		if (this.props.badgeCount !== 0) {
			badge = <Badge count={this.props.badgeCount}/>;
		}

		return (
			<div className='menu-button'
				 onClick={this.props.onClick}
				 title={this.props.title}>
				<i className='material-icons'>
					{this.props.icon}
				</i>
				{badge}
			</div>
		);
	}
}
