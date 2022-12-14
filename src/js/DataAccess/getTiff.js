import {token} from "./getToken";
import {handleTiffData} from "../DataHandler/tiffHandler";

export function getTiffData(ip){

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'GET', `http://${ip}/api/images/live`, true); // false for synchronous request
    xmlHttp.setRequestHeader('accept', 'image/tiff');
    xmlHttp.setRequestHeader('Authorization', `Bearer ${token.accessToken}`);
    xmlHttp.responseType = 'arraybuffer';

    xmlHttp.onload = function () {
        handleTiffData(xmlHttp.response, ip);
    }

    xmlHttp.send( null );
}