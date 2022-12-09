export function refreshImage(imageResolution) {
    let image = document.getElementById('img');
    let canvas = document.getElementById('drawAOICanvas');
    canvas.width= imageResolution.width;
    canvas.height= imageResolution.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(image, 1, 1);
}