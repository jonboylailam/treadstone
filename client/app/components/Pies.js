var React = require('react');
var EasyPiePerSecond = require('../shared/EasyPieRequestPerSecond');
var EasyPiePercent = require('../shared/EasyPiePercent');

var Pies = React.createClass({
    render: function () {
        return (
            <div className="tile text-center">
                <div className="tile-dark p-10">
                    <EasyPiePerSecond title='Http Requests' rps={this.props.batch.httpRequestPerSecond} percent={this.getRequestPerSecondPercent()}/>
                    <EasyPiePercent title='Posts' percent={this.getPostPercent()}/>
                    <EasyPiePercent title='Comments' percent={this.getCommentsPercent()}/>
                    <EasyPiePercent title='Comments on comments' extraPadding='true' percent={this.getCommentsOnCommentsPercent()}/>
                </div>
            </div>
        );
    },
    getRequestPerSecondPercent: function () {
        var percent = this.props.batch.httpRequestPerSecond / this.props.systemInfo.httpLimit * 100;
        return Math.round(percent);
    },
    getPostPercent: function () {
        var total = this.props.batch.numberOfPosts + this.props.batch.numberOfComments + this.props.batch.numberOfCommentsOnComments;
        return this.calculatePercentage(this.props.batch.numberOfPosts, total);
    },
    getCommentsPercent: function () {
        var total = this.props.batch.numberOfPosts + this.props.batch.numberOfComments + this.props.batch.numberOfCommentsOnComments;
        return this.calculatePercentage(this.props.batch.numberOfComments, total);
    },
    getCommentsOnCommentsPercent: function () {
        var total = this.props.batch.numberOfPosts + this.props.batch.numberOfComments + this.props.batch.numberOfCommentsOnComments;
        return this.calculatePercentage(this.props.batch.numberOfCommentsOnComments, total);
    },
    calculatePercentage: function (x, y) {
        var ans = 0;

        if (x > 0 && y > 0) {
            ans = x/y*100
        }
        return Math.round(ans);
    }
});

module.exports = Pies;
