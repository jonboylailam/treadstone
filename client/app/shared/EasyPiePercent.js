var React = require('react');

var EasyPiePercent = React.createClass({
    render: function () {
        var cls = this.props.extraPadding ? "chart pie-chart-tiny p-b-35" : "chart pie-chart-tiny";

        return (
            <div className={cls} data-percent="0">
                <span className="percent">0</span>
                <span className="pie-title">{this.props.title || 'Default Title'}</span>
            </div>
        );
    },
    componentDidMount: function () {
        var element = this.getDOMNode();

        if (this.props.hideLabel) {
            $('.pie-title', element).css('display', 'none');
        } else {
            $('.pie-title', element).css('display', null);
        }

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
                    $('.percent', element).text(Math.round(percent));
                }
            });
    },
    componentDidUpdate: function () {
        var element = this.getDOMNode();
        $(element).data('easyPieChart').update(this.props.percent);
    }
});

module.exports = EasyPiePercent;
