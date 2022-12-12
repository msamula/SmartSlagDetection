export function refreshImage(imageResolution) {

    let image = document.getElementById('img');
    let canvas = document.getElementById('drawAOICanvas');
    canvas.width= imageResolution.width;
    canvas.height= imageResolution.height;
    let ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(image, 1, 1);


    //check if image is loaded. if not load again.
    let canvasData = ctx.getImageData(0, 0, imageResolution.width, imageResolution.height);

    if(canvasData.data[70000] === 0){
        setTimeout(()=>{
            refreshImage(imageResolution);
        },50);
    }
}
