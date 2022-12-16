import {token} from "./getToken";
import {showError} from "../UserInterface/Main/messages";

export let completeJob;

// temperature ranges from the areas of interest(aoi)
function getTempRanges(json){

    let result =[];

    for (let i = 0; i < json.rois.length; i++) {

        let evalRangeStart, evalRangeEnd;

        for (let j = 0; j < json.rois[i].attributes.length; j++) {

            if(json.rois[i].attributes[j].key === 'evalRangeStart'){
                evalRangeStart = Number((json.rois[i].attributes[j].value - 273.15).toFixed(0));
            }

            if(json.rois[i].attributes[j].key === 'evalRangeEnd'){
                evalRangeEnd = Number((json.rois[i].attributes[j].value - 273.15).toFixed(0));
            }
        }

        result.push([evalRangeStart, evalRangeEnd]);
    }

    return result;
}


// image resolution
function getImageResolution(json){

    return json.visualization.image.resolution;
}


// coordinates for the area of interest(aoi) from job
function getCoordinates(json) {

    let roisCount = json.rois.length;

    let result = [];

    for (let i = 0; i < roisCount; i++) {

        let pointsCount = json.rois[i].points.length;
        let output = [];
        output.push(json.rois[i].aoiType);
        for (let j = 0; j < pointsCount; j++) {
            output.push([json.rois[i].points[j].x, json.rois[i].points[j].y]);
        }
        result.push(output);
    }

    return result;
}


// thresholds from job
function getThresholds(json) {

    let thresholdsCount = json.thresholds.length;

    let result = [];

    for (let i = 0; i < thresholdsCount; i++) {
        result.push(json.thresholds[i].value);
    }
    return result;
}


// get completeJob and return specialJobInfo
export function getJobInfo(ip, jobID){

    let results =[];

    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200) {

            completeJob = JSON.parse(request.response);

            results = [getThresholds(completeJob), getCoordinates(completeJob), getTempRanges(completeJob), getImageResolution(completeJob)];

        }

        if(request.readyState === 4 && request.status !== 200) {
            showError('Job not found!', 'Please make sure the job called "SlagDetection" is loaded.');
        }
    };

    request.open('GET', `http://${ip}/api/jobs/${jobID}`, false);
    request.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    request.setRequestHeader('Accept', 'application/json');
    request.send(jobID);

    return results;
}