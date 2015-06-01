var React = require('react');
var Router = require('react-router');

var Header = require('./components/Header');

var App = React.createClass({
	render: function() {
        return (
            <div className="app">

                <Header/>
                <div className="clearfix"></div>

                <Router.RouteHandler/>
            </div>
		);
	}
});

module.exports = App;
