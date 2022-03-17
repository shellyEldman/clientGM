import React from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

const Charts = ({ socketConnection, signalsList }) => {

    const options = {
        title: {
            text: undefined
        },
        chart: {
            animation: false,
            spacingTop: 50,
            events: {
                load: function () {
                    signalsList.forEach((signal) => {
                        socketConnection.on(signal.name, data => {
                            const index = this.series.findIndex((s) => s.name === signal.name);
                            var series = this.series[index];
                            const point = [new Date().getTime(), parseFloat(data.value)];
                            const shift = series.data.length > 150;
                            series.addPoint(point, true, shift);
                        });
                    });
                }
            }
        },
        xAxis: {
            type: 'datetime',
            minRange: 30 * 1000,  // 30 sec
        },
        yAxis: [{
            title: {
                text: ''
            }
        }],
        time: {
            useUTC: false
        },
        series:
            signalsList.map((signal) => {
                return {
                    type: "areaspline",
                    data: [],
                    name: signal.name,
                }
            })
    };

    return (
        <div className='charts'>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
            <div className="alert alert-info text-center" role="alert">
                Click on a signal name to hide/show the signal
            </div>
        </div>
    );
}

export default Charts;