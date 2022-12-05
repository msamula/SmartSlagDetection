import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/custom.css';

import {User} from "./DataHandler/models";
import {getToken} from "./DataAccess/getToken";
import {getJobInfo} from "./DataAccess/getJobInfo";
import {getImage} from "./DataAccess/getImage";
import {drawAOI} from "./UserInterface/drawAOI";
import {loadInfo} from "./UserInterface/loadInfo";
import {addBtnEvents} from "./UserInterface/addEvents";
import {getData} from "./DataAccess/getData";
import {createCharts} from "./UserInterface/charts";


//login data
const ipAddress = 'localhost:8080';         /* 'localhost:8080' '169.254.64.2' */
const clientID = 'irsxApp';
const clientSecret = 'MnrY2L86pEQr53!6';
const username = 'administrator';
const password = 'administrator';
const jobName = 'SlagDetection';

const sequenzWidth = 320;                   //HARD CODED
const sequenzHeight = 240;                  //HARD CODED


//--- MAIN PART ---

//create user
let user = new User(ipAddress,username,password,clientID,clientSecret);

//get token
getToken(user.ip,user.clientID,user.clientSecret,user.username,user.password);

//get Job Info
let job = getJobInfo(user.ip, jobName);

window.addEventListener('DOMContentLoaded', () => {

    //Userinterface
    addBtnEvents(user);
    loadInfo(user.ip);
    createCharts();

    //draw AOI
    drawAOI(job[1], sequenzWidth, sequenzHeight);

    //get image
    getImage(user);

    //get data
    getData(user.ip);

});