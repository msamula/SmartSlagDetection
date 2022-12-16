import {awaitNewToken, expireTime, token} from "./getToken";
import {handleTiffData} from "../DataHandler/tiffHandler";

export async function getTiffData(ip){

    if(expireTime > (token.expireSec*0.1)-0.3){
        await awaitNewToken(500);
    }

    let response = await fetch(`http://${ip}/api/images/live`, {
        headers: {
            'accept': 'image/tiff',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })


    if (response.status === 200) {
        handleTiffData(await response.arrayBuffer(), ip);
    }
    if (response.status !== 200) {
        getTiffData(ip);
    }
}