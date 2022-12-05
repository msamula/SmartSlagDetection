import Chart from 'chart.js/auto';

export let slagChart;

export function createChart(){

    slagChart = new Chart( document.getElementById('slagChart') , {
        type: 'bar',
        data: {
            labels: ['Slag', 'Total Slag'],
            datasets: [{
                label: 'Slag',
                data: [50,66],
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
    })
}

function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
    });
    chart.update();
}

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update('none');
}

export function updateChart(chart, label, data){
    removeData(chart);
    addData(chart, label, data);
}