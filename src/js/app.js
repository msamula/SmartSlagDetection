// module imports

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';

import {getImage} from "./DataAccess/getImage";

import {User} from "./DataHandler/models";
import {getToken} from "./DataAccess/getToken";
import {getJobInfo} from "./DataAccess/getJobInfo";
import {getResults} from "./DataAccess/getResults";
import {loadUserInterface} from "./UserInterface/loadUserInterface";
import {getTiffData} from "./DataAccess/getTiff";
import {activateJob} from "./DataHandler/changeJob";


//login data
const ipAddress = 'localhost:8080';          /* 'localhost:8080' '169.254.64.2' */
const clientID = 'irsxApp';
const clientSecret = 'MnrY2L86pEQr53!6';
const username = 'administrator';
const password = 'administrator';

const jobName = 'SlagDetection';            //job name
const resizeFactor = 2;                     //resize the camera image by factor



//--- MAIN PART ---

//create user
let user = new User(ipAddress,username,password,clientID,clientSecret);

window.addEventListener('DOMContentLoaded', () => {

    //get token
    getToken(user);

    //activate Slag Detection Job
    activateJob(user.ip, jobName);

    //specialJobInfo[0] = thresholds       specialJobInfo[1] = coordinates      specialJobInfo[2] = aoi temperature ranges     specialJobInfo[3] = cameraImage resolution
    let specialJobInfo = getJobInfo(user.ip, jobName);

    //Userinterface
    loadUserInterface(user, jobName, specialJobInfo, resizeFactor);

    //get cameraImage as bitmap
    //getImage(user);

    //color slag
    getTiffData(user);

    //get data
    getResults(user.ip);

});