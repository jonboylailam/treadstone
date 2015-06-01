var React = require('react');

var EasyPiePercent = require('../shared/EasyPiePercent');

var BatchStatus = React.createClass({
    render: function () {
        return (
            <div className="text-center s-widget m-b-25">
                <EasyPiePercent hideLabel="true" percent={this.getProgress()}/>
                <h4 className="m-0 text-success">{this.props.batch.batchStatus}</h4>
            </div>
        );
    },
    getProgress: function () {
        var progress = 0;
        if (this.props.batch.numberOfJobsCompleted > 0 && this.props.batch.numberOfJobs > 0) {
            progress = this.props.batch.numberOfJobsCompleted/this.props.batch.numberOfJobs*100
        }
        return progress;
    }
});

module.exports = BatchStatus;
