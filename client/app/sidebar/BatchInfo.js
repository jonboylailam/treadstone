var React = require('react');
var moment = require('moment');

var BatchInfo = React.createClass({
    render: function () {
        return (
            <div className="s-widget m-b-25">
                <h2 className="tile-title">
                    Batch Info
                </h2>

                <div className="s-widget-body">
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{this.props.batch.batchId}</h6>
                            </div>
                            <div className="media-body">
                                <h6>Batch ID</h6>
                            </div>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{moment(this.props.batch.startTime).format('DD MMM YY H:m')}</h6>
                            </div>
                            <div className="media-body">
                                <h6>Start Date</h6>
                            </div>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{this.props.batch.numberOfJobs}</h6>
                            </div>
                            <div className="media-body">
                                <h6>Jobs Queued</h6>
                            </div>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{this.props.batch.numberOfJobsCompleted}</h6>
                            </div>
                            <div className="media-body">
                                <h6>Jobs Completed</h6>
                            </div>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{Math.ceil(parseInt(this.props.batch.numberOfJobsFailed))}</h6>
                            </div>
                            <div className="media-body">
                                <h6>Jobs Failed</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = BatchInfo;
