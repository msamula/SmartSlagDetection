import {awaitNewToken, checkToken, expireTime, token} from "./getToken";
import {handleTiffData} from "../DataHandler/tiffHandler";

//get the camera image as tiff
export async function getTiffData(user){

//used when getImage is activated (can be ignored or deleted)
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

    // work with tiff image
    if (response.status === 200) {
        handleTiffData(await response.arrayBuffer(), user);
    }

    // if no response call function again
    if (response.status !== 200) {

        getTiffData(user);
    }
}