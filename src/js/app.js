// module imports

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';

import {User} from "./DataHandler/models";
import {getToken} from "./DataAccess/getToken";
import {getJobInfo} from "./DataAccess/getJobInfo";
import {getImage} from "./DataAccess/getImage";
import {getResults} from "./DataAccess/getResults";
import {loadUserInterface} from "./UserInterface/loadUserInterface";


//login data
const ipAddress = 'localhost:8080';         /* 'localhost:8080' '169.254.64.2' */
const clientID = 'irsxApp';
const clientSecret = 'MnrY2L86pEQr53!6';
const username = 'administrator';
const password = 'administrator';

const jobName = 'SlagDetection';            //job name
const resizeFactor = 2;                     //resize the camera image by factor



//--- MAIN PART ---

//create user
let user = new User(ipAddress,username,password,clientID,clientSecret);

//get token
getToken(user);

//specialJobInfo[0] = thresholds       specialJobInfo[1] = coordinates      specialJobInfo[2] = aoi temperature ranges     specialJobInfo[3] = cameraImage resolution
let specialJobInfo = getJobInfo(user.ip, jobName);

window.addEventListener('DOMContentLoaded', () => {

    //Userinterface
    loadUserInterface(user, jobName, specialJobInfo, resizeFactor);

    //get cameraImage
    getImage(user);

    //get data
    getResults(user.ip);

});