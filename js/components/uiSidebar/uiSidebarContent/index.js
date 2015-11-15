import './index.css';

import React from 'react';

export default class SidebarContent extends React.Component {
    render() {
        return (
            <div id='sidebar-content'>
                {this.props.view}
            </div>
        );
    }
}
