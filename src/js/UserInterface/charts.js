import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

let slagChart, timeChart;

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update('none');
}

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
                backgroundColor: '#FF0000'
            },
            {
                yAxisID: 'totalSlag',
                label: 'Total Slag',
                data: [],
                backgroundColor: '#000000'
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
                            yMin: 40,
                            yMax: 40,
                            xMax: 0,
                            borderColor: 'rgba(0, 255, 0, 1)',
                            borderWidth: 1
                        },
                        totalSlag: {
                            type: 'line',
                            yMin: 40,
                            yMax: 40,
                            xMin: 0,
                            xMax: 1,
                            borderColor: 'rgba(0, 255, 0, 1)',
                            borderWidth: 1
                        }
                    }
                }
            }
        }
    });

    timeChart = new Chart( document.getElementById('timeChart') , {
        type: 'bar',
        data: {
            labels: [''],
            datasets: [{
                label: 'Slag',
                data: [],
                borderWidth: 1,
                backgroundColor: '#FF0000'
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
            plugins: {
                annotation: {
                    annotations: {
                        slag: {
                            type: 'line',
                            yMin: 40,
                            yMax: 40,
                            borderColor: 'rgba(0, 255, 0, 1)',
                            borderWidth: 1
                        }
                    }
                }
            }
        }
    });

    for (let i = 0; i < 100; i++) {
        addData(timeChart, '', 0);
    }
}

export function updateCharts(slag, totalSlag){

    /*SLAG CHART*/
    //update data
    slagChart.data.datasets[0].data = [slag];
    slagChart.data.datasets[1].data = [totalSlag];


    /*TIME CHART*/
    let date = new Date();

    //add data
    timeChart.data.labels.push(`${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${(date.getSeconds()<10?'0':'') + date.getSeconds()}`);
    timeChart.data.datasets[0].data.push(slag);

    //remove data
    if(timeChart.data.labels.length > 100){
        timeChart.data.labels.shift();
        timeChart.data.datasets[0].data.shift();
    }

    slagChart.update();
    timeChart.update();
}