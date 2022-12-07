export function resizeImage(imageWidth, factor){
    document.documentElement.style.setProperty('--width', `${imageWidth * factor}px`);
}