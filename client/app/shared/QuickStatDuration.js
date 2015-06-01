var React = require('react');
var Rx = require('rx');
var moment = require('moment');

var durationSubs;

var QuickStatDuration = React.createClass({
    render: function () {
        return (
            <div className="tile quick-stats media">
                <div id="stats-line" className="pull-left"></div>
                <div className="media-body">
                    <h2 data-value="12">0</h2>
                    <small>{this.props.label || "Duration"}</small>
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        var that = this;
        var interval = Rx.Observable.interval(1000);
        durationSubs = interval.subscribe(function () {
                that.updateDuration();
        });
    },
    componentDidUpdate: function () {
        if (this.props.stopTimer) {
            durationSubs.dispose();
            this.updateDuration();
        }
    },
    updateDuration: function () {
        var element = this.getDOMNode();
        $('h2', element).text(this.calculateDuration());
        $("#stats-line", element).sparkline(this.props.sparklineData, {
            type: 'line',
            height: '65',
            width: '100%',
            lineColor: 'rgba(255,255,255,0.4)',
            lineWidth: 1.25,
            fillColor: 'rgba(0,0,0,0.2)',
            barWidth: 5,
            barColor: '#C5CED6'
        });
    },
    calculateDuration: function () {
        var endDate = this.props.end || new Date().getTime();
        if (!this.props.stopTimer) {
            endDate = new Date().getTime();
        }

        var duration = endDate - this.props.start;
        var m = moment.duration(duration);
        return m.minutes() + 'min '+ m.seconds() + 'secs';
    }
});

module.exports = QuickStatDuration;
