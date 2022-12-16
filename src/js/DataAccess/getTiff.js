import {expireTime, token} from "./getToken";
import {handleTiffData} from "../DataHandler/tiffHandler";

export async function getTiffData(ip){

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