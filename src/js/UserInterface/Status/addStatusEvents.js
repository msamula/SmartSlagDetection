import {loadStatus} from "./loadStatus";
import {loadInfo} from "./loadInfo";

/*BUTTON EVENTS FOR STATUS*/
export function addStatusEvents(user){

    let loadStatusInterval;

    /*Open Status Button*/
    document.getElementById('statusOpen').addEventListener('click', ()=>{
        loadInfo(user.ip);
        loadStatus(user.ip);

        loadStatusInterval = setInterval(()=>{
            loadStatus(user.ip);
        },1000);
    });

    /*Close Status Button*/
    document.getElementById('statusClose').addEventListener('click', ()=>{
        clearInterval(loadStatusInterval);
    });
}