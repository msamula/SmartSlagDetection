import {updateCharts} from "./charts";
import {slagPercentage} from "./addEvents";

export function handleResults(json){

    let alarm = document.getElementById('alarm');

    for (let i = 0; i < json.results.length; i++) {

        // max Temp

        if(json.results[i].id === 'MaxTemp'){
            document.getElementById('tapTemp').innerHTML = `Tap Temperature: ${(json.results[i].value[0]-273.15).toFixed(1)}°C`;
        }

        // slag percentage

        if(json.results[i].id === 'AOI_1_Result'){

            if( json.results[i].value[0]-273.15 < slagPercentage){
                alarm.style.backgroundColor = 'rgba( 0, 220, 0, 1)';
            }

            if( json.results[i].value[0]-273.15 >= slagPercentage ){
                alarm.style.backgroundColor = 'rgba( 200, 0, 0, 1)';
            }

            let slag = Number(json.results[i].value[0]-273.15);
            let totalSlag = 0;

            updateCharts( slag.toFixed(0), totalSlag);

            document.getElementById('slag').innerHTML = `${slag.toFixed(1)}%`;
            document.getElementById('totalSlag').innerHTML = `${totalSlag}%`;
        }
    }
}



