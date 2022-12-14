import {resizeImage} from "./Main/resizeImage";
import {addStatusEvents} from "./Status/addStatusEvents";
import {createCharts} from "./Main/charts";
import {drawAOI} from "./Main/drawAOI";
import {loadHtmlElements} from "./Main/loadHtmlElements";
import {addConfigEvents} from "./Configure/addConfigEvents";

//specialJobInfo[0] = thresholds       specialJobInfo[1] = coordinates      specialJobInfo[2] = aoi temperature ranges     specialJobInfo[3] = cameraImage resolution

export function loadUserInterface(user, jobName, specialJobInfo, resizeFactor){
    loadHtmlElements();
    resizeImage(specialJobInfo[3], resizeFactor);

    createCharts();
    drawAOI(specialJobInfo[1], specialJobInfo[3]);

    addStatusEvents(user);
    addConfigEvents(user, jobName, specialJobInfo[1], specialJobInfo[2], specialJobInfo[3], resizeFactor);
}

