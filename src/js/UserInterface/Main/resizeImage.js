//set custom.css -> root -> '--width' to resize the camera image by factor

export function resizeImage(imageWidth, factor){

    document.documentElement.style.setProperty('--width', `${imageWidth * factor}px`);
}