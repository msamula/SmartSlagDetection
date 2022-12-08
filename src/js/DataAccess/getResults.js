import {expireTime, token} from "./getToken";
import {handleResults} from "../UserInterface/resultsHandler";

function awaitNewToken(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getResults(ip) {

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
        getResults(ip);

    })
    .catch(()=>{
        getResults(ip);
    })
}