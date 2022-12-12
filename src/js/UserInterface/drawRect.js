let drawingEnabled = false;
let canvas, rect, bluePoint, redPoint;
let width, height, factor;
let start = {};

//coordinates for AOI
export let coordinates = [{x: 0, y: 0},{ x: 0, y: 0}, {x: 0, y: 0}, { x: 0, y: 0}];
export let drawPoints = [['RectLine',[0, 0],[0, 0], [0, 0], [0, 0]]];

//
export function getCanvasInfo(imageResolution, resizeFactor){
    width = imageResolution.width * resizeFactor;
    height = imageResolution.height * resizeFactor;
    factor = resizeFactor;
}

// get mouse position
function getMousePos(evt) {

    let rect = canvas.getBoundingClientRect(),
        scaleX = width / rect.width,
        scaleY = height / rect.height;

    return {
        x: (evt.clientX - rect.left) * scaleX,
        y: (evt.clientY - rect.top) * scaleY
    }
}

// mouse down event
export function mouseDown(e) {
    drawingEnabled = true;

    canvas = document.getElementById('drawAOICanvas');
    rect = document.getElementById("rect");
    bluePoint = document.getElementById('bluePoint');
    redPoint = document.getElementById('redPoint');

    start = getMousePos(e);

    canvas.addEventListener('mousemove', mouseMove);
    canvas.addEventListener('mouseup', mouseUp);
}

//mouse move event
function mouseMove(e) {

    let { x, y } = getMousePos(e);

    let xStart = Math.min(start.x, x);
    let yStart = Math.min(start.y, y);

    let xEnd = Math.max(start.x, x);
    let yEnd = Math.max(start.y, y);

    let width  = Math.abs(x - start.x);
    let height  = Math.abs(y - start.y);

    drawPoints = [['RectLine',[Number((xStart/factor).toFixed(0)), Number((yStart/factor).toFixed(0))],[Number((xEnd/factor).toFixed(0)), Number((yStart/factor).toFixed(0))], [Number((xEnd/factor).toFixed(0)), Number((yEnd/factor).toFixed(0))], [Number((xStart/factor).toFixed(0)), Number((yEnd/factor).toFixed(0))]]];
    coordinates = [{x: Number((xStart/factor).toFixed(0)), y: Number((yStart/factor).toFixed(0))},{ x: Number((xEnd/factor).toFixed(0)), y: Number((yStart/factor).toFixed(0))}, {x: Number((xEnd/factor).toFixed(0)), y: Number((yEnd/factor).toFixed(0))}, { x: Number((xStart/factor).toFixed(0)), y: Number((yEnd/factor).toFixed(0))}];

    rect.setAttribute('x', `${xStart}`);
    rect.setAttribute('y', `${yStart}`);
    rect.setAttribute('width', `${width}`);
    rect.setAttribute('height', `${height}`);

    bluePoint.setAttribute('cx', `${start.x}`);
    bluePoint.setAttribute('cy', `${start.y}`);
    redPoint.setAttribute('cx', `${x}`);
    redPoint.setAttribute('cy', `${y}`);
}


//  removeEventListener

function mouseUp(){
    canvas.removeEventListener('mousemove', mouseMove);
    canvas.removeEventListener('mouseup', mouseUp);
}

export function removeMousedown(){
    if(drawingEnabled){

        canvas.removeEventListener('mousedown', mouseDown);
    }
}