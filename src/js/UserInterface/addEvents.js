import {loadStatus} from "./loadStatus";

let loadStatusInterval;

export function addBtnEvents(user){

    /*Status Button*/
    document.getElementById('statusOpen').addEventListener('click', ()=>{
        loadStatusInterval = setInterval(()=>{
            loadStatus(user.ip);
        },1000);
    });

    /*Status Close Button*/
    document.getElementById('statusClose').addEventListener('click', ()=>{
        clearInterval(loadStatusInterval);
    });



}