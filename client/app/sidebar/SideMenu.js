var React = require('react');

var SideMenu = React.createClass({
    render: function () {
        return (
        <ul className="list-unstyled side-menu">
            <li className="active">
                <a className="sa-side-home" href="index.html">
                    <span className="menu-item">Dashboard</span>
                </a>
            </li>
        </ul>
        );
    }

});

module.exports = SideMenu;
