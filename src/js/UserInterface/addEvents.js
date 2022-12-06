import {loadStatus} from "./loadStatus";
import {updateChartLines} from "./charts";

let loadStatusInterval;

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
    /*Slag Thresholds*/
    let slagPerc = document.getElementById('slagPerc');
    let totalSlagPerc = document.getElementById('totalSlagPerc');
    let slagPercDisplay = document.getElementById('slagPercDisplay');
    let totalSlagPercDisplay = document.getElementById('totalSlagPercDisplay');

    slagPerc.value = slagPercentage;
    totalSlagPerc.value = totalSlagPercentage;

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