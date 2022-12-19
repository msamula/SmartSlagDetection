import {refreshImage} from "./refreshImage";
import {updateChartLines} from "../Main/charts";
import {drawPoints, getCanvasInfo, loadCoordinates, mouseDown, removeMousedown} from "./drawRect";
import {changeJob} from "../../DataHandler/changeJob";
import {drawAOI} from "../Main/drawAOI";
import {jobUpdated} from "../Main/messages";

export let targetMaxTemp;               //changed to export bcs of getTiff
export let slagPercentage = 40;
export let totalSlagPercentage = 3.5;
export let targetTempChanged = false;

let heat, heatInput, vessel, vesselInput;
let jobValuesChanged = false;

let heatNo = 8729;
let vesselNo = 1;

export function targetTempUpdated(){
    targetTempChanged = false;
}

/*show "job updated" alarm*/
function showUpdated() {

    document.getElementById('configureClose').click();
    jobUpdated();
}

export function updateVesselHeat(){
    heatNo++;
    vesselNo++;
    vessel.innerHTML = `BOF Vessel: ${vesselNo}`;
    heat.innerHTML = `Heat #: ${heatNo}`;
    vesselInput.placeholder = vesselNo;
    heatInput.placeholder = heatNo;
}

export function addConfigEvents(user, jobName, coordinates, jobTempRanges, imageResolution, factor){

    loadCoordinates(coordinates[0]);

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

    vessel = document.getElementById('vessel');
    vesselInput = document.getElementById('vesselInput');
    heat = document.getElementById('heat');
    heatInput = document.getElementById('heatInput');

    vessel.innerHTML = `BOF Vessel: ${vesselNo}`;
    heat.innerHTML = `Heat #: ${heatNo}`;
    vesselInput.placeholder = vesselNo;
    heatInput.placeholder = heatNo;

    let areaMaxTemp = jobTempRanges[0][0];
    targetMaxTemp = jobTempRanges[1][0];

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
        jobValuesChanged = true;
    });
    slagTempThreshold.addEventListener('input',()=>{
        slagTempThresholdDisplay.innerHTML = `${slagTempThreshold.value} °C`;
        targetMaxTemp = Number(slagTempThreshold.value);
        jobValuesChanged = true;
        targetTempChanged = true;
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
    let saveAoiBtn = document.getElementById('saveAOIBtn');

    drawAoiBtn.addEventListener('click', ()=> {
        drawAoiBtn.disabled = true;
        saveAoiBtn.style.backgroundColor = '#dc3545';
        getCanvasInfo(imageResolution, factor);
        document.getElementById('drawAoiSvg').style.display = 'initial';
        document.getElementById('drawAOICanvas').addEventListener('mousedown', mouseDown)
    });

    saveAoiBtn.addEventListener('click',()=>{
        drawAoiBtn.innerHTML = '<img src="./media/rect_30.png" style="max-height: 20px;"> redraw Rectangle';
        drawAoiBtn.disabled = false;
        saveAoiBtn.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        removeMousedown();
        jobValuesChanged = true;
    });


    /*UPDATE JOB BUTTON*/

    document.getElementById('updateJobBtn').addEventListener('click', ()=>{

        if(jobValuesChanged){
            changeJob(user.ip, jobName, areaMaxTemp, targetMaxTemp);
            drawAOI( drawPoints, imageResolution);
            jobValuesChanged = false;
        }

        /*USERINTERFACE*/

        if(vesselInput.value !== ''){
            vesselNo = vesselInput.value;
            vessel.innerHTML = `BOF Vessel: ${vesselInput.value}`;
            vesselInput.placeholder = vesselInput.value;
            vesselInput.value = '';
        }

        if(heatInput.value !== ''){
            heatNo = heatInput.value;
            heat.innerHTML = `Heat #: ${heatInput.value}`;
            heatInput.placeholder = heatInput.value;
            heatInput.value = '';
        }

        showUpdated();
    });
}