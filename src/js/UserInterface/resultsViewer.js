import {resetTimeChart, updateCharts} from "./Main/charts";
import {slagPercentage, totalSlagPercentage} from "./Configure/addConfigEvents";
import {tapTemp, alarm, slagDisplay, totalSlagDisplay, dateTime} from "./Main/loadHtmlElements";

let slag, totalSlag;

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

        if(json.results[i].id === 'AOI_0_Count'){
            if(json.results[i].value[0] < 300){

                resetTimeChart();

                let date = new Date();
                dateTime.innerHTML = `Date/Time: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}  ${(date.getHours()<10?'0':'') + date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}:${(date.getSeconds()<10?'0':'') + date.getSeconds()}`;
            }
        }
    }


    slagDisplay.innerHTML = `${slag}%`;
    totalSlagDisplay.innerHTML = `${totalSlag}%`;

    if( slag < slagPercentage && totalSlag < totalSlagPercentage){
        alarm.style.backgroundColor = 'rgba( 0, 220, 0, 1)';
    }

    if( slag >= slagPercentage || totalSlag >= totalSlagPercentage){
        alarm.style.backgroundColor = 'rgba( 200, 0, 0, 1)';
    }

    updateCharts( slag, totalSlag);
}



