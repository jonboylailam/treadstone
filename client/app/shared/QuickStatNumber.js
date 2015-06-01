var React = require('react');

var QuickStatNumber = React.createClass({
    render: function () {
        return (
            <div className="tile quick-stats">
                <div id="stats-line" className="pull-left"></div>
                <div className="data">
                    <h2 data-value="0">0</h2>
                    <small>{this.props.label}</small>
                </div>
            </div>
        );
    },
    componentDidMount: function () {
        this.updateQuickStat(true);

    },
    componentDidUpdate: function () {
        this.updateQuickStat()
    },
    updateQuickStat: function (anitmate) {
        var element = this.getDOMNode();
        var target = $('h2', element);

        if (anitmate) {
            var toAnimate = this.props.value;
            // Animate the element's value from x to y:
            $({someValue: 0}).animate({someValue: toAnimate}, {
                duration: 1000,
                easing:'swing', // can be anything
                step: function() { // called on every step
                    // Update the element's text with rounded-up value:
                    target.text(commaSeparateNumber(Math.round(this.someValue)));
                }
            });

            function commaSeparateNumber(val){
                while (/(\d+)(\d{3})/.test(val.toString())){
                    val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
                }
                return val;
            }
        } else {
            target.text(commaSeparateNumber(Math.round(this.props.value || 0)));
        }


        $('#stats-line', element).sparkline(this.props.sparklineData, {
            type: 'line',
            height: '65',
            width: '100%',
            lineColor: 'rgba(255,255,255,0.4)',
            lineWidth: 1.25,
            fillColor: 'rgba(0,0,0,0.2)',
            barWidth: 5,
            barColor: '#C5CED6'
        });

    }
});

module.exports = QuickStatNumber;
