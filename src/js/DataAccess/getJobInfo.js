import {token} from "./getToken";

export let job;

// temperature ranges from the areas of interest(aoi)
function getTempRanges(json){

    let result =[];

    for (let i = 0; i < json.rois.length; i++) {
        result.push( [Number((json.rois[i].attributes[2].value - 273.15).toFixed(0)), Number((json.rois[i].attributes[3].value - 273.15).toFixed(0))]);
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


//GET all coordinates and all thresholds from job
export function getJobInfo(ip, jobID){

    let results =[];

    let request = new XMLHttpRequest();

    request.onreadystatechange = function() {
        if(request.readyState === 4 && request.status === 200) {

            job = JSON.parse(request.response);

            results = [getThresholds(job), getCoordinates(job), getTempRanges(job), getImageResolution(job)];
        }
    };

    request.open('GET', `http://${ip}/api/jobs/${jobID}`, false);
    request.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    request.setRequestHeader('Accept', 'application/json');
    request.send(jobID);

    return results;
}