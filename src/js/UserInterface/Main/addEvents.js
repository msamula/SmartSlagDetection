import {loadStatus} from "../Status/loadStatus";
import {updateChartLines} from "./charts";
import {createJob} from "../../DataHandler/createJob";
import {refreshImage} from "../Configure/refreshImage";
import {drawPoints, getCanvasInfo, mouseDown, removeMousedown} from "../Configure/drawRect";
import {drawAOI} from "./drawAOI";


export let slagPercentage = 40;
export let totalSlagPercentage = 2;

export function addBtnEvents(user, jobName, jobTempRanges, imageResolution, factor){


    /*STATUS*///////////////////////////////////////////////////////////////////////////////////////////////////////////

    let loadStatusInterval;

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



    /*CONFIGURE*////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById('configBtn').addEventListener('click', ()=>{
        refreshImage(imageResolution);
    });

    /*ELEMENTS*/

    let areaTempThreshold = document.getElementById('areaTempThreshold');
    let slagTempThreshold = document.getElementById('slagTempThreshold');
    let areaTempThresholdDisplay = document.getElementById('areaTempThresholdDisplay');
    let slagTempThresholdDisplay = document.getElementById('slagTempThresholdDisplay');

    let slagPerc = document.getElementById('slagPerc');
    let totalSlagPerc = document.getElementById('totalSlagPerc');
    let slagPercDisplay = document.getElementById('slagPercDisplay');
    let totalSlagPercDisplay = document.getElementById('totalSlagPercDisplay');

    let areaMaxTemp = jobTempRanges[0][0];
    let targetMaxTemp = jobTempRanges[1][0];

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

    /*AOI*//////////////////////////////////////////////////////////////////////////////////////////////////////////////

    document.getElementById('refreshImage').addEventListener('click', ()=>{
        refreshImage(imageResolution);
    });

    let drawAoiBtn = document.getElementById('drawAOIBtn');

    drawAoiBtn.addEventListener('click', ()=> {
        drawAoiBtn.disabled = true;
        getCanvasInfo(imageResolution, factor);
        document.getElementById('drawAoiSvg').style.display = 'initial';
        document.getElementById('drawAOICanvas').addEventListener('mousedown', mouseDown)
    });

    document.getElementById('saveAOIBtn').addEventListener('click',()=>{
        drawAoiBtn.innerHTML = '<img src="./media/rect_30.png" style="max-height: 20px;"> redraw Rectangle';
        drawAoiBtn.disabled = false;
        removeMousedown();
    });


    /*UPDATE JOB BUTTON*/

    document.getElementById('updateJobBtn').addEventListener('click', ()=>{

        createJob(user.ip, jobName, areaMaxTemp, targetMaxTemp);
        drawAOI( drawPoints, imageResolution.width, imageResolution.height);


        /*USERINTERFACE*/

        let vessel = document.getElementById('vessel');
        let vesselInput = document.getElementById('vesselInput');
        let heat = document.getElementById('heat');
        let heatInput = document.getElementById('heatInput');

        vessel.innerHTML = `BOF Vessel: ${vesselInput.value}`;
        vesselInput.placeholder = vesselInput.value;
        vesselInput.value = '';

        heat.innerHTML = `Heat #: ${heatInput.value}`;
        heatInput.placeholder = heatInput.value;
        heatInput.value = '';


        /*BUTTONEVENTS*/

        document.getElementById('configureClose').click();
        document.getElementById('dataUpdated').setAttribute('style', 'display:flex !important');
        setTimeout(()=>{
            document.getElementById('dataUpdated').setAttribute('style', 'display:none !important');
        }, 1800);
    });
}