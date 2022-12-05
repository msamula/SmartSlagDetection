import Chart from 'chart.js/auto';

let slagChart;

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
    })
}

export function updateSlagChart(slag, totalSlag){
    slagChart.data.datasets[0].data = [slag, totalSlag];
    slagChart.update('none');
}