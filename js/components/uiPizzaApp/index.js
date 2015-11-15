import Sidebar from 'components/uiSidebar';
import PizzaButton from 'components/uiPizzaButton';
import InfoPanel from 'components/uiInfoPanel';
import React from 'react';

export default class PizzaApp extends React.Component {
	render() {
		return (
			<div id='game'>
				<PizzaButton onClick={this.props.gameManager.onClick} />
				<InfoPanel gameManager={this.props.gameManager}/>
				<Sidebar gameManager={this.props.gameManager}/>
			</div>
		);
	}
}
