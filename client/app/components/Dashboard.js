var React = require('react');
var _ = require('underscore');
var Rx = require('rx');
var WebSocket = require('ws');

var Sidebar = require('../sidebar/Sidebar');
var QuickStats = require('./QuickStats');
var Pies = require('./Pies');

var Dashboard = React.createClass({

    getInitialState: function () {
        return {
            batch: {
                "batchId": 38,
                "batchStatus": "Completed",
                "startDate": new Date().getTime(),
                "numberOfJobs": 8,
                "numberOfJobsCompleted": 8,
                "numberOfJobsFailed": 1,
                "numberOfPosts": 43,
                "numberOfComments": 90,
                "numberOfCommentsOnComments": 7,
                "httpRequestPerSecond": "0.69"
            },
            systemInfo: {
                httpLimit: 4,
                memoryTotal: 0,
                memoryUsed: 0
            },
            durationHistory: [],
            sentToQDBHistory: [],
            filteredSeenBeforeHistory: [],
            numberOfJobsFailedHistory: [],
            httpSentHistory: [],
            httpErrorHistory: []
        };
    },

    componentDidMount: function () {
        var that = this;
        var ws = new WebSocket('ws://'+ window.location.host +'/dashboard');
        var open = Rx.Observable.fromEvent(ws, 'open');
        var messages = Rx.Observable.fromEvent(ws, 'message');

        open.subscribe(function () {
            ws.send("Show me the money!");
        });

        messages.subscribe(function (e) {
            if (that.isMounted()) {
                that.setState(JSON.parse(e.data));
            }
        });
    },

    render: function () {
        return (
            <section id="main" className="p-relative" role="main">
                <Sidebar {...this.state}/>

                <section id="content" className="container">
                    {/* Breadcrumb */}
                    <ol className="breadcrumb hidden-xs">
                        <li>
                            <a href="#">Home</a>
                        </li>
                        <li>
                            <a href="#">Library</a>
                        </li>
                        <li className="active">Data</li>
                    </ol>

                    <h4 className="page-title">DASHBOARD</h4>
                    {/* Quick Stats */}
                    <div className="block-area">
                        <QuickStats {...this.state}/>
                    </div>

                    <hr className="whiter"/>

                    {/* Main Widgets */}
                    <div className="block-area">
                        <div className="row">
                            <div className="col-md-12">
                                {/* Pies */}
                                <Pies {...this.state}/>

                            </div>
                            <div className="clearfix"></div>
                        </div>
                    </div>
                    <hr className="whiter"/>
                </section>
            </section>
        );
    }
});

module.exports = Dashboard;
