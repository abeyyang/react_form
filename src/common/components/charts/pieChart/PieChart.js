// @flow

import React, { Component, PropTypes } from 'react';
import Highcharts from 'highcharts/highcharts';
import PieLegend from './PieLegend';

class PieChart extends Component {
    componentDidMount () {
        const { data } = this.props;
        const config = {
            series: [{
                data
            }]
        };

        const defaultConfig = {
            chart: {
                type: 'pie'
            },
            title: {
                text: ''
            },
            credits: {
                enabled: false
            }
        };

        const newConfig = Object.assign({}, defaultConfig, config);

        this.chart = Highcharts.chart(this.chartRef, newConfig);
    }

    componentWillUnmount () {
        this.chart.destroy();
    }

    render () {
        const { data, widthValue } = this.props;
        return (
            <div style={{ width: `${widthValue}px`}}>
                <div ref={(chartRef) => { this.chartRef = chartRef; }} />
                <div style={{ textAlign: 'center'}}>
                    <PieLegend data={data} unit={'%'} />
                </div>
            </div>
        );
    }
}

PieChart.propTypes = {
    config: PropTypes.shape({
        series: PropTypes.arrayOf(PropTypes.shape({
            data: PropTypes.array.isRequired
        }))
    })
};

export default PieChart;
