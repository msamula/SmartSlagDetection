import {expireTime, token} from "./getToken";
import {handleResults} from "../DataHandler/resultsHandler";

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

            handleResults(json);

            //start new request after the previous one is done
            getData(ip);

        })
        .catch(()=>{
            getData(ip);
        })
}