import {resizeImage} from "./Helper/resizeImage";
import {addBtnEvents} from "./addEvents";
import {loadInfo} from "./loadInfo";
import {createCharts} from "./charts";
import {drawAOI} from "./drawAOI";
import {loadHtmlElements} from "./loadHtmlElements";


export function loadUserInterface(user, jobName, specialJobInfo, resizeFactor){
    loadHtmlElements();
    resizeImage(specialJobInfo[3].width, resizeFactor);
    addBtnEvents(user, jobName, specialJobInfo[2], specialJobInfo[3], resizeFactor);
    loadInfo(user.ip);
    createCharts();
    drawAOI(specialJobInfo[1], specialJobInfo[3].width, specialJobInfo[3].height);
}

