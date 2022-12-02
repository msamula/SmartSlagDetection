export function handleResults(json){
    let alarm = document.getElementById('alarm');
    document.getElementById('tapTemp').innerHTML = `Tap Temperature: ${(json.results[5].value[0]-273.15).toFixed(1)}°C`;

    if( json.results[2].value[0]-273.15 < 40 ){
        alarm.style.backgroundColor = 'rgba(0,255,0,1)';
    }

    if( json.results[2].value[0]-273.15 >= 40){
        alarm.style.backgroundColor = 'rgba(255,0,0,1)';
    }
}



/*HARD CODED AOI_0_Result (steel)       json.results[1].value[0]-273.15*/
/*HARD CODED AOI_1_Result (slag)        json.results[2].value[0]-273.15*/
/*HARD CODED Tap Temp (max Temp in aoi) json.results[5].value[0]-273.15*/