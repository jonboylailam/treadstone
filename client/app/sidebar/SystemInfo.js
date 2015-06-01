var React = require('react');

var SystemInfo = React.createClass({
    render: function () {
        var width50 = {width: '50%'};
        var that = this;
        var memoryUsagePercent = function () {
            var memTotal = that.props.systemInfo.memoryTotal;
            var memUsed = that.props.systemInfo.memoryUsed;
            var percent = 0;
            if (memUsed > 0 && memTotal > 0) {
                percent = memUsed / memTotal * 100;
            }
            return parseInt(percent, 10);
        };
        var memoryUsage = function () {
            var memTotal = that.props.systemInfo.memoryTotal;
            var memUsed = that.props.systemInfo.memoryUsed;
            return that.bytesToSize(memUsed) + '/'+ that.bytesToSize(memTotal, true)
        };


        return (
            <div className="s-widget m-b-25">
                <h2 className="tile-title">
                    System Info
                </h2>

                <div className="s-widget-body">
                    <div className="side-border">
                        <small>Memory Usage ({memoryUsage()})</small>
                        <div className="progress progress-small">
                            <a href="#" data-toggle="tooltip" title=""
                               className="progress-bar tooltips progress-bar-success"
                               style={{width: memoryUsagePercent()+'%'}}
                               data-original-title={ memoryUsagePercent() +'%)'}>
                            </a>
                        </div>
                    </div>
                    <div className="side-border">
                        <small>Thread Pool Usage (13 of 16)</small>
                        <div className="progress progress-small">
                            <a href="#" data-toggle="tooltip" title=""
                               className="progress-bar tooltips progress-bar-success"
                               style={width50} data-original-title="13 of 16 (60%)">
                            </a>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{this.props.systemInfo.batchLimit === 0 ? 'NONE' : this.props.systemInfo.batchLimit}</h6>
                            </div>
                            <div className="media-body">
                                <h6>Batch limit</h6>
                            </div>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{this.props.systemInfo.jobLimit}</h6>
                            </div>
                            <div className="media-body">
                                <h6>Job Limit</h6>
                            </div>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{this.props.systemInfo.loopEnabled ? 'ON' : 'OFF'}</h6>
                            </div>
                            <div className="media-body">
                                <h6>Loop Enabled</h6>
                            </div>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{this.props.systemInfo.qdbEnabled ? 'ON' : 'OFF'}</h6>
                            </div>
                            <div className="media-body">
                                <h6>QDB Enabled</h6>
                            </div>
                        </div>
                    </div>
                    <div className="side-border">
                        <div className="media">
                            <div className="pull-right">
                                <h6>{this.props.systemInfo.httpLimit}</h6>
                            </div>
                            <div className="media-body">
                                <h6>HTTP Limit</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        if($('.tooltips')[0]) {
            $('.tooltips').tooltip();
        }
    },
    componentDidUpdate: function () {

    },
    bytesToSize: function(bytes, showSize) {
        if (bytes == 0) return '0 Byte';
        var k = 1000;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));

        if (showSize) {
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
        } else {
            return (bytes / Math.pow(k, i)).toPrecision(3);
        }
    }
});

module.exports = SystemInfo;
