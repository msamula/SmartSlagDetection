import {Token} from "../DataHandler/models";

//TOKEN and token-expire-time used by other functions
export let token, expireTime;


//get token function
export function getToken(user)
{
    let url = `http://${user.ip}/api/oauth/token?client_id=${user.clientID}&client_secret=${user.clientSecret}&grant_type=password&username=${user.username}&password=${user.password}`;

    let xmlHttp = new XMLHttpRequest();

    xmlHttp.open('POST', url, false);
    xmlHttp.setRequestHeader('accept', 'application/json');

    xmlHttp.onreadystatechange = function() {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {

            let response = JSON.parse(xmlHttp.responseText);
            token = new Token(response['access_token'],response['token_type'],response['expires_in'],response['scope'],response['refresh_token'],response['iat'],response['exp']);
        }
    }

    xmlHttp.send();
}

//Refresh token function
async function refreshToken(user,refreshToken){
    let url = `http://${user.ip}/api/oauth/token?client_id=${user.clientID}&client_secret=${user.clientSecret}&grant_type=refresh_token&refresh_token=${refreshToken}`;

    let response =await fetch(url,{
        method: 'POST',
        headers: {
            'accept': 'application/json',
        }
    });

    let json = await response.json();

    token = await new Token(json['access_token'],json['token_type'],json['expires_in'],json['scope'],json['refresh_token'],json['iat'],json['exp']);
}


//check if token is expired
export async function checkToken(user){
    let dateNow = new Date();
    expireTime = (token.exp*1000 - dateNow)/1000;

    if(expireTime <= 60){
        await refreshToken(user, token.refreshToken);
    }
}