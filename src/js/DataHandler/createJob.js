import{job} from "../DataAccess/getJobInfo";
import {token} from "../DataAccess/getToken";
import {coordinates} from "../UserInterface/drawRect";

function uploadJob(ip, job){
    fetch(`http://${ip}/api/jobs`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(job)})
}

function activateJob(ip, jobName){
    fetch(`http://${ip}/api/jobs/activate`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`,
            'Content-Type': 'application/json'
        },
        body: `${jobName}`
    });
}

export function createJob(ip, jobName, areaMaxTemp, targetMaxTemp){
    let changedJob = job;

    changedJob.rois[0].points = coordinates;
    changedJob.rois[1].points = coordinates;

    changedJob.rois[0].attributes[1].value = `{"emissivity":{"enabled":true,"value":0.92},"evaluationRange":{"enabled":true,"max":1973.15,"min":${areaMaxTemp + 273.15}}}`;
    changedJob.rois[0].attributes[2].value = `${areaMaxTemp + 273.15}`;

    changedJob.rois[1].attributes[1].value = `{"emissivity":{"enabled":true,"value":0.92},"evaluationRange":{"enabled":true,"max":1973.15,"min":${targetMaxTemp + 273.15}}}`;
    changedJob.rois[1].attributes[2].value = `${targetMaxTemp + 273.15}`;

    //changedJob.visualization.colormap === 'jet' ? changedJob.visualization.colormap = 'greyscale' : changedJob.visualization.colormap = 'jet';

    uploadJob(ip, changedJob);
    activateJob(ip, jobName);
}