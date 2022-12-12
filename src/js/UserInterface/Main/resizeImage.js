//set custom.css -> root -> '--width' to resize the camera image by factor

export function resizeImage(imageResolution, factor){

    document.documentElement.style.setProperty('--width', `${imageResolution.width * factor}px`);
}