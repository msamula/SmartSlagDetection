import {resetTimeChart, updateCharts} from "./Main/charts";
import {slagPercentage, totalSlagPercentage, updateVesselHeat} from "./Configure/addConfigEvents";
import {tapTemp, alarm, slagDisplay, totalSlagDisplay, dateTime} from "./Main/loadHtmlElements";

let slag, totalSlag;

let updateHeatVessel = true;

export function handleResults(json){

    for (let i = 0; i < json.results.length; i++) {

        // max Temp
        if(json.results[i].id === 'MaxTemp'){

            tapTemp.innerHTML = `Tap Temperature: ${(json.results[i].value[0]-273.15).toFixed(1)}°C`;
        }

        // slag
        if(json.results[i].id === 'AOI_1_Result'){

            slag = Number((json.results[i].value[0]-273.15).toFixed(1));
        }

        // totalSlag
        if(json.results[i].id === 'TotalSlag'){

            totalSlag = Number((json.results[i].value[0]-273.15).toFixed(1));
        }


        //reset charts and update time, vesselNo and heatNo when AOI_O_Count < 300 pixel
        if(json.results[i].id === 'AOI_0_Count'){

            if(json.results[i].value[0] < 300){

                if(updateHeatVessel){

                    resetTimeChart();
                    updateVesselHeat();

                    let date = new Date();
                    dateTime.innerHTML = `Date/Time: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}  ${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${(date.getSeconds()<10?'0':'') + date.getSeconds()}`;

                    updateHeatVessel = false;
                }
            }
        }

        if(json.results[i].id === 'AOI_0_Count'){
            if(updateHeatVessel === false && json.results[i].value[0] > 300){

                updateHeatVessel = true;
            }
        }
    }


    slagDisplay.innerHTML = `${slag}%`;
    totalSlagDisplay.innerHTML = `${totalSlag}%`;

    //alarm red or green
    if( slag < slagPercentage && totalSlag < totalSlagPercentage){
        alarm.style.backgroundColor = 'rgba( 0, 220, 0, 1)';
    }

    if( slag >= slagPercentage || totalSlag >= totalSlagPercentage){
        alarm.style.backgroundColor = '#9D0000';
    }

    updateCharts( slag, totalSlag);
}



