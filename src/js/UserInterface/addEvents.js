import {loadStatus} from "./loadStatus";
import {updateChartLines} from "./charts";

let loadStatusInterval;

let areaMaxTemp = 800, targetMaxTemp = 1050;

export let slagPercentage = 40;
export let totalSlagPercentage = 2;

export function addBtnEvents(user){

    /*STATUS*/
    /*Open Status Button*/
    document.getElementById('statusOpen').addEventListener('click', ()=>{
        loadStatus(user.ip);

        loadStatusInterval = setInterval(()=>{
            loadStatus(user.ip);
        },1000);
    });

    /*Close Status Button*/
    document.getElementById('statusClose').addEventListener('click', ()=>{
        clearInterval(loadStatusInterval);
    });


    /*CONFIGURE*/

    /*ELEMENTS*/

    let areaTempThreshold = document.getElementById('areaTempThreshold');
    let slagTempThreshold = document.getElementById('slagTempThreshold');
    let areaTempThresholdDisplay = document.getElementById('areaTempThresholdDisplay');
    let slagTempThresholdDisplay = document.getElementById('slagTempThresholdDisplay');

    let slagPerc = document.getElementById('slagPerc');
    let totalSlagPerc = document.getElementById('totalSlagPerc');
    let slagPercDisplay = document.getElementById('slagPercDisplay');
    let totalSlagPercDisplay = document.getElementById('totalSlagPercDisplay');

    areaTempThreshold.value = areaMaxTemp;
    slagTempThreshold.value = targetMaxTemp;
    slagPerc.value = slagPercentage;
    totalSlagPerc.value = totalSlagPercentage;

    areaTempThresholdDisplay.innerHTML = `${areaMaxTemp} °C`;
    slagTempThresholdDisplay.innerHTML = `${targetMaxTemp} °C`;
    slagPercDisplay.innerHTML = `${slagPercentage} %`;
    totalSlagPercDisplay.innerHTML = `${totalSlagPercentage} %`;


    /*EVENTS*/

    areaTempThreshold.addEventListener('input',()=>{
        areaTempThresholdDisplay.innerHTML = `${areaTempThreshold.value} °C`;
        areaMaxTemp = Number(areaTempThreshold.value);
    });
    slagTempThreshold.addEventListener('input',()=>{
        slagTempThresholdDisplay.innerHTML = `${slagTempThreshold.value} °C`;
        targetMaxTemp = Number(slagTempThreshold.value);
    });

    slagPerc.addEventListener('input',()=>{
        slagPercDisplay.innerHTML = `${slagPerc.value} %`;
        slagPercentage = Number(slagPerc.value);
        updateChartLines(slagPercentage, totalSlagPercentage);
    });
    totalSlagPerc.addEventListener('input',()=>{
        totalSlagPercDisplay.innerHTML = `${totalSlagPerc.value} %`;
        totalSlagPercentage = Number(totalSlagPerc.value);
        updateChartLines(slagPercentage, totalSlagPercentage);
    });
}