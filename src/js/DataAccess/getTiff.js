import {awaitNewToken, checkToken, expireTime, token} from "./getToken";
import {handleTiffData} from "../DataHandler/tiffHandler";

export async function getTiffData(user){

/*    if(expireTime > (token.expireSec*0.9)-0.3){
        await awaitNewToken(500);
    }*/

    await checkToken(user);

    let response = await fetch(`http://${user.ip}/api/images/live`, {
        headers: {
            'accept': 'image/tiff',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })


    if (response.status === 200) {
        handleTiffData(await response.arrayBuffer(), user);
    }
    if (response.status !== 200) {
        getTiffData(user);
    }
}