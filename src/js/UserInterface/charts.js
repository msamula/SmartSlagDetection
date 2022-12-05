import Chart from 'chart.js/auto';

let slagChart, timeChart;

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update('none');
}

export function createCharts(){

    slagChart = new Chart( document.getElementById('slagChart') , {
        type: 'bar',
        data: {
            labels: ['Slag', 'Total Slag'],
            datasets: [{
                label: 'Slag',
                data: [],
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
                backgroundColor: '#FF0000',
                color: '#FFF'
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
            }
        }
    });

    for (let i = 0; i < 100; i++) {
        addData(timeChart, '', 0);
    }
}

export function updateSlagChart(slag, totalSlag){

    /*SLAG CHART*/
    //update data
    slagChart.data.datasets[0].data = [slag, totalSlag];


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

    slagChart.update('none');
    timeChart.update('none');
}