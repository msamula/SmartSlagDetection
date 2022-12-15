// load once all repetitive html elements for getImage.js and resultsViewer.js

export let cameraImage, alarm, dateTime, tapTemp, slagDisplay, totalSlagDisplay;

export function loadHtmlElements(){

    cameraImage = document.getElementById('img');
    alarm = document.getElementById('alarm');
    dateTime = document.getElementById('dateTime');
    tapTemp = document.getElementById('tapTemp');
    slagDisplay = document.getElementById('slag');
    totalSlagDisplay = document.getElementById('totalSlag');
}