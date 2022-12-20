import {token} from "../../DataAccess/getToken";

export function loadStatus(ip){

    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open( 'GET', `http://${ip}/api/device/status`, false); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'application/json');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    xmlHttp.send( null );

    let deviceStatus = JSON.parse(xmlHttp.responseText);

    document.getElementById('gevActive').innerHTML =`${deviceStatus.servers[0].numActive}`;
    document.getElementById('gevConnections').innerHTML =`${deviceStatus.servers[0].numConnections}`;
    document.getElementById('httpActive').innerHTML =`${deviceStatus.servers[1].numActive}`;
    document.getElementById('httpConnections').innerHTML =`${deviceStatus.servers[1].numConnections}`;
    document.getElementById('masterActive').innerHTML =`${deviceStatus.servers[2].numActive}`;
    document.getElementById('masterConnections').innerHTML =`${deviceStatus.servers[2].numConnections}`;
    document.getElementById('slaveActive').innerHTML =`${deviceStatus.servers[3].numActive}`;
    document.getElementById('slaveConnections').innerHTML =`${deviceStatus.servers[3].numConnections}`;

    document.getElementById('mainboardTemp').innerHTML =`${(deviceStatus.temperatures[0].temperature - 273.15).toFixed(2)}°C`;
    document.getElementById('minTemp').innerHTML =`${(deviceStatus.temperatures[2].temperature - 273.15).toFixed(2)}°C`;
    document.getElementById('maxTemp').innerHTML =`${(deviceStatus.temperatures[1].temperature - 273.15).toFixed(2)}°C`;
}