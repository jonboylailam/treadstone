var React = require('react');

var EasyPieRequestPerSecond = React.createClass({

    render: function () {
        return (
            <div className="pie-chart-tiny" data-percent={this.props.percent}>
                <span className="value-p-s"></span>
                <span className="pie-title">{this.props.title}</span>
            </div>
        );
    },
    componentDidMount: function () {
        var that = this;
        var element = this.getDOMNode();
        $(element).easyPieChart({
            easing: 'easeOutBounce',
            barColor: 'rgba(255,255,255,0.75)',
            trackColor: 'rgba(0,0,0,0.3)',
            scaleColor: 'rgba(255,255,255,0.3)',
            lineCap: 'square',
            lineWidth: 4,
            size: 100,
            animate: 3000,
            onStep: function(from, to, percent) {
                $(this.el).find('.value-p-s').text(Number(that.props.rps).toFixed(1));
            }
        });
    },
    componentDidUpdate: function () {
        var element = this.getDOMNode();
        $(element).data('easyPieChart').update(this.props.percent);
    }
});

module.exports = EasyPieRequestPerSecond;
