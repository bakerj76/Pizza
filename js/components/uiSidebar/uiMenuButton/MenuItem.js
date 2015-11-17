import React from 'react';

/**
 * Contains information for a menu icon.
 */
export default class MenuItem {
	/**
	 * Creates an object containing menu icon information.
	 * @param  {string}    title The message on mouseover.
	 * @param  {string}    icon  The material icon name.
	 * @param  {Component} view  The React component for the view.
	 */
	constructor(title, icon, view) {
		this.title = title;
		this.icon = icon;
		this.view = view;
	}

	/**
	 * Gets the React component to render to the sidebar-content div.
	 * @param {GameManager} gameManager The main game manager.
	 * @return {Component}              The view React component.
	 */
	getView(gameManager) {
		return <this.view gameManager={gameManager}/>;
	}
}
