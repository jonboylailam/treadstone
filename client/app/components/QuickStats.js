var React = require('react');
var Rx = require('rx');

var QuickStatDuration = require('../shared/QuickStatDuration');
var QuickStatNumber = require('../shared/QuickStatNumber');

var QuickStats = React.createClass({
    render: function () {
        var stopDurationTimer = this.props.batch.numberOfJobs == this.props.batch.numberOfJobsCompleted;

        return (
            <div className="row">
                <div className="col-xs-6">
                    <QuickStatDuration stopTimer={stopDurationTimer} sparklineData={this.props.durationHistory} start={this.props.batch.startDate} end={this.props.batch.endDate}/>
                </div>

                <div className="col-xs-6">
                    <QuickStatNumber label="Sent to QDB" sparklineData={this.props.sentToQDBHistory} value={this.props.batch.sentToQDB} />
                </div>

                <div className="col-xs-6">
                    <QuickStatNumber label="Jobs Failed" sparklineData={this.props.numberOfJobsFailedHistory} value={this.props.batch.numberOfJobsFailed} />
                </div>
                <div className="col-xs-6">
                    <QuickStatNumber label="Filtered" sparklineData={this.props.filteredSeenBeforeHistory} value={this.props.batch.filteredSeenBefore} />
                </div>
            </div>
        );
    }
});

module.exports = QuickStats;
