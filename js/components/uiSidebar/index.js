import './index.css';

import FlagEnum from 'game/FlagEnum'
import MenuItem from './uiMenuButton/MenuItem';
import MenuButton from './uiMenuButton';
import SidebarContent from './uiSidebarContent';
import DecisionView from './uiSidebarContent/uiContentViews/uiDecisionView';
import PriceView from './uiSidebarContent/uiContentViews/uiPriceView';
import StandingView from './uiSidebarContent/uiContentViews/uiStandingView';
import StatView from './uiSidebarContent/uiContentViews/uiStatView';
import React from 'react';

export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this._createMenuButton = this._createMenuButton.bind(this);
        this.onClick = this.onClick.bind(this);

        this.buttons = [
            new MenuItem('Decisions', 'check_box', DecisionView),
            new MenuItem('Prices', 'attach_money', PriceView),
            new MenuItem('Standing', 'person', StandingView),
            new MenuItem('Statistics', 'trending_up', StatView)
        ];

        // The current element selected, so we can unselect it.
        this.selectedElement = null;

        this.state = {
            isActive: false,
            overlay: 0,
            currentView: null
        };
    }

    onClick(e, index, menuItem)
    {
        var element = e.target;

        if (this.state.isActive) {
            if (this.state.overlay === index) {
                // If the overlay is up and the user clicks the same button,
                // close the overlay.
                this.setState({isActive: false});
                this._setSelected(null);
            } else {
                // If the overlay is up and the user clicks a different button,
                // change the overlay.
                this.setState({
                    overlay: index,
                    currentView: menuItem.getView()
                });
                this._setSelected(element);
            }
        } else {
            // If the overlay isn't active, just open it.
            this.setState({
                isActive: true,
                overlay: index,
                currentView: menuItem.getView()
            });
            this._setSelected(element);
        }
    }

    /**
     * Sets which menu icon is selected.
     * @param {object} element The MenuIcon HTML element select.
     */
    _setSelected(element) {
        if (this.selectedElement) {
            this._removeSelected(this.selectedElement);
        }

        if (element) {
            this._addSelected(element);
        }

        this.selectedElement = element;
    }

    /**
     * Adds selected class to an HTML element.
     * @param {object} element The HTML element to add selected to.
     */
    _addSelected(element) {
        // Check if it's already in the class. If so, don't add it.
        if (element.className.indexOf(' selected') === -1) {
            element.className += ' selected';
        }
        this.selectedElement = element;
    }

    /**
     * Removes selected class to an HTML element.
     * @param {object} element The HTML element to remove selected from.
     */
    _removeSelected(element) {
        element.className = element.className.replace(' selected', '');
        this.selectedElement = null;
    }

    /**
     * Creates a menu button for the sidebar.
     * @param  {MenuIcon} value The value to map.
     * @param  {int}      index The index of the value.
     * @return {MenuButton} A react menu button component.
     */
    _createMenuButton(value, index) {
        var iconFlags = this.props.gameManager.IconFlags;

        if (iconFlags.getFlag(FlagEnum.indexToFlag(index))) {
            return (
                <MenuButton key={'menu-icon-' + index}
                    title={value.title}
                    icon={value.icon}
                    onClick={(e) => this.onClick(e, index, value)}
                    badgeCount={value.badgeCount} />
            );
        }
    }

    render() {
        var overlay;
        var sidebar;
        var iconFlags = this.props.gameManager.IconFlags;

        // If there aren't any icons, don't show the sidebar.
        if (iconFlags.value !== 0) {
            sidebar = (
                <div id='sidebar'>
    				{this.buttons.map(this._createMenuButton)}
    			</div>
            );
        }

        // Show the overlay if it's active.
        if (this.state.isActive && this.state.currentView) {
            overlay = <SidebarContent view={this.state.currentView} />;
        }

		return (
            <div id='sidebar-space'>
    			{sidebar}
                {overlay}
            </div>
		);
    }
}
