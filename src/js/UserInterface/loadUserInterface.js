import {resizeImage} from "./resizeImage";
import {addBtnEvents} from "./addEvents";
import {loadInfo} from "./loadInfo";
import {createCharts} from "./charts";
import {drawAOI} from "./drawAOI";
import {loadHtmlElements} from "./loadHtmlElements";

//specialJobInfo[0] = thresholds       specialJobInfo[1] = coordinates      specialJobInfo[2] = aoi temperature ranges     specialJobInfo[3] = cameraImage resolution

export function loadUserInterface(user, jobName, specialJobInfo, resizeFactor){
    loadHtmlElements();
    resizeImage(specialJobInfo[3].width, resizeFactor);
    addBtnEvents(user, jobName, specialJobInfo[2], specialJobInfo[3], resizeFactor);
    loadInfo(user.ip);
    createCharts();
    drawAOI(specialJobInfo[1], specialJobInfo[3].width, specialJobInfo[3].height);
}

