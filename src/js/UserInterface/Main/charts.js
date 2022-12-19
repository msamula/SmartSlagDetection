import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import {slagPercentage, totalSlagPercentage} from "../Configure/addConfigEvents";

/*ALL CHART FUNCTIONS*/

let slagChart, timeChart;
let timeChartLength = 150;

/*helper function to create timeChart*/
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update('none');
}


/*--- create charts when app starts ---*/
export function createCharts(){

    Chart.register(annotationPlugin);

    slagChart = new Chart( document.getElementById('slagChart') , {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [{
                yAxisID: 'slag',
                label: 'Slag',
                data: [],
                backgroundColor: '#FF2200'
            },
            {
                yAxisID: 'totalSlag',
                label: 'Total Slag',
                data: [],
                backgroundColor: '#9D0000'
            }]
        },
        options: {
            scales: {
                slag: {
                    type: 'linear',
                    position: 'left',
                    min: 0,
                    max: 100,
                    grid: { display: false }
                },

                totalSlag: {
                    type: 'linear',
                    position: 'right',
                    min: 0,
                    max: 5,
                    grid: { display: false }
                },

                x: {
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        slag: {
                            type: 'line',
                            yMin: slagPercentage,
                            yMax: slagPercentage,
                            xMax: 0,
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            borderWidth: 2
                        },
                        totalSlag: {
                            type: 'line',
                            yMin: totalSlagPercentage * 20,
                            yMax: totalSlagPercentage * 20,
                            xMin: 0,
                            xMax: 1,
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            borderWidth: 2
                        }
                    }
                }
            }
        }
    });

    timeChart = new Chart( document.getElementById('timeChart') , {
        type: 'line',
        data: {
            labels: [''],
            datasets: [{
                label: 'Slag',
                data: [],
                fill: true,
                borderWidth: 0,
                backgroundColor: '#FF2200'
            }]
        },
        options: {
            scales: {
                y: {
                    max: 100,
                    min: 0,
                    grid: {
                        display: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            },
            elements: {
                point:{
                    radius: 0
                }
            },
            plugins: {
                annotation: {
                    annotations: {
                        slag: {
                            type: 'line',
                            yMin: slagPercentage,
                            yMax: slagPercentage,
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            borderWidth: 2
                        }
                    }
                }
            }
        }
    });

    for (let i = 0; i < timeChartLength; i++) {
        addData(timeChart, '', 0);
    }
}


/*RESET TIMECHART*/
export function resetTimeChart(){

    //timeChart.data.datasets[0].data = [];

    for (let i = 0; i < timeChartLength; i++) {
        timeChart.data.datasets[0].data[i] = 0;
    }
}


/*UPDATE CHARTS*/
export function updateCharts(slag, totalSlag){

    slagChart.data.datasets[0].data = [slag];
    slagChart.data.datasets[1].data = [totalSlag];


    /*TIME CHART*/
    let date = new Date();

    //remove data
    timeChart.data.labels.shift();
    timeChart.data.datasets[0].data.shift();

    //add data
    timeChart.data.labels.push(`${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${(date.getSeconds()<10?'0':'') + date.getSeconds()}`);
    timeChart.data.datasets[0].data.push(slag);

    slagChart.update('none');   //'none' --> nicht animiert
    timeChart.update('none');
}


/*UPDATE THRESHOLDS/LINES IN CHARTS*/
export function updateChartLines(slagValue, totalSlagValue) {

    slagChart.options.plugins = {
        annotation: {
            annotations: {
                slag: {
                    type: 'line',
                    yMin: slagValue,
                    yMax: slagValue,
                    xMax: 0,
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    borderWidth: 2
                },
                totalSlag: {
                    type: 'line',
                    yMin: totalSlagValue * 20,
                    yMax: totalSlagValue * 20,
                    xMin: 0,
                    xMax: 1,
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                    borderWidth: 2
                }
            }
        }
    };

    timeChart.options.plugins = {
        annotation: {
            annotations: {
                slag: {
                    type: 'line',
                    yMin: slagValue,
                    yMax: slagValue,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    borderWidth: 2
                }
            }
        }
    };
}