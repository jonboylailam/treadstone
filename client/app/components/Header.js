var React = require('react');

var Header = React.createClass({
	render: function() {
		return (
            <header id="header" className="media">
                <a href="" id="menu-toggle"></a>
                <a className="logo pull-left" href="index.html">CONSOLE</a>
            </header>
		);
	}
	
});

module.exports = Header;
