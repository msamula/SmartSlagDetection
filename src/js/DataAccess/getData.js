import {expireTime, token} from "./getToken";

function awaitNewToken(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getData(ip) {

    if(expireTime < 60.3){
        await awaitNewToken(500);
    }

    fetch(`http://${ip}/api/results`, {
        headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })
        .then((response) => response.json())
        .then((json) => {

            /*HARD CODED AOI_0_Result      json.results[1].value[0]-273.15*/
            /*HARD CODED AOI_1_Result      json.results[2].value[0]-273.15*/

            //start new request after the previous one is done
            getData(ip);

        })
        .catch(()=>{
            getData(ip);
        })
}