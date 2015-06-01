var React = require('react');

var SideMenu = require('./SideMenu');
var BatchInfo = require('./BatchInfo');
var BatchStatus = require('./BatchStatus');
var SystemInfo = require('./SystemInfo');

var Sidebar = React.createClass({
    render: function () {
        return (
        <aside id="sidebar">

            {/* Sidbar Widgets */}
            <div className="side-widgets overflow">
                <BatchStatus {...this.props}/>
                <BatchInfo {...this.props}/>
                <SystemInfo {...this.props}/>
            </div>

            <SideMenu/>
        </aside>
        );
    }

});

module.exports = Sidebar;
