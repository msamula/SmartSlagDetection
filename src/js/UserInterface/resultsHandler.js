/*HARD CODED AOI_0_Result (steel)       json.results[1].value[0]-273.15*/
/*HARD CODED AOI_1_Result (slag)        json.results[2].value[0]-273.15*/
/*HARD CODED Tap Temp (max Temp in aoi) json.results[5].value[0]-273.15*/

import {updateCharts} from "./charts";

export function handleResults(json){

    let alarm = document.getElementById('alarm');

    for (let i = 0; i < json.results.length; i++) {

        if(json.results[i].id === 'TapTemp'){
            document.getElementById('tapTemp').innerHTML = `Tap Temperature: ${(json.results[i].value[0]-273.15).toFixed(1)}°C`;
        }

        if(json.results[i].id === 'AOI_1_Result'){

            if( json.results[i].value[0]-273.15 < 40 ){
                alarm.style.backgroundColor = 'rgba( 0, 255, 0, 1)';
            }

            if( json.results[i].value[0]-273.15 >= 40){
                alarm.style.backgroundColor = 'rgba( 255, 0, 0, 1)';
            }

            let slag = Number(json.results[i].value[0]-273.15);

            updateCharts( slag.toFixed(0), slag.toFixed(0));

            document.getElementById('slag').innerHTML = `${slag.toFixed(1)}%`;
            document.getElementById('totalSlag').innerHTML = `${slag.toFixed(1)}%`;
        }
    }
}



