import {token} from "../DataAccess/getToken";

export function loadInfo(ip){

    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open( 'GET', `http://${ip}/api/device/info`, false); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'application/json');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    xmlHttp.send( null );

    let deviceInfo = JSON.parse(xmlHttp.responseText);

    document.getElementById('friendlyName').innerHTML =`${deviceInfo.friendlyName}`;
    document.getElementById('activePackage').innerHTML =`${deviceInfo.activePackage}`;
    document.getElementById('modelName').innerHTML =`${deviceInfo.modelName}`;
    document.getElementById('serialNumber').innerHTML =`${deviceInfo.serialNumber}`;
    document.getElementById('partNumber').innerHTML =`${deviceInfo.partNumber}`;
    document.getElementById('deviceVers').innerHTML =`${deviceInfo.deviceVersion}`;
    document.getElementById('firmware').innerHTML =`${deviceInfo.firmwareVersion}`;
    document.getElementById('macAddress').innerHTML =`${deviceInfo.mac}`;
    document.getElementById('ipMode').innerHTML =`${deviceInfo.linkSpeed} Mbit`;
    document.getElementById('hostName').innerHTML =`${deviceInfo.hostName}`;
    document.getElementById('ipAddress').innerHTML =`${deviceInfo.ipv4}`;
}