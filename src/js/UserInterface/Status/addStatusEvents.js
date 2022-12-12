import {loadStatus} from "./loadStatus";

export function addStatusEvents(user){

    let loadStatusInterval;

    /*Open Status Button*/
    document.getElementById('statusOpen').addEventListener('click', ()=>{
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