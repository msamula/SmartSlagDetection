import UTIF from './Helper/utif';
import {TiffData} from "./models";
import {getTiffData} from "../DataAccess/getTiff";
import {targetMaxTemp, targetTempChanged, targetTempUpdated} from "../UserInterface/Configure/addConfigEvents";
import {cameraImage} from "../UserInterface/Main/loadHtmlElements";

let tiffData, canvas, ctx, tiffTagsLoaded = false, htmlElementsLoaded = false, targetTemp, bitmapData, initialChange = true;

function getHtmlElements(imgWidth, imgHeight){

    canvas = document.getElementById('slagCanvas');
    canvas.width  = imgWidth;
    canvas.height = imgHeight;

    ctx = canvas.getContext("2d", {willReadFrequently: true});

    htmlElementsLoaded = true;
}

function calcPixelValue(img, x, y, imgWidth) {
    let rX = x * 2;                                     //erster und zweiter array-eintrag ergeben zusammen den ersten pixel von 16 bit bzw 2 byte
    let rY = (imgWidth * y) * 2;

    let pixel =  [img[rX + rY], img[rX + rY + 1]];     // erster und zweiter array-eintrag

    return pixel[0] | pixel[1] << 8;                   //BitVerschiebung

    /*    The left shift operator (<<) shifts the first operand the specified number of bits to the left.*/
}

function pixelToTemp(tiffData,pixelValue) {
    return tiffData.B/(Math.log((tiffData.R/(pixelValue-tiffData.RBFOffset))+tiffData.F));
}

function tempToPixelValue(tiffData, tempKelvin){
    for (let i = 704; i < Infinity; i++) {          //Pixelwert von 704 = 0 Kelvin
        if(tempKelvin<pixelToTemp(tiffData,i)){
            return i-1;
        }
    }
}

function drawPixel (canvasData, x, y, imgWidth) {

    let index = (x + y * imgWidth) * 4;

    canvasData.data[index]      = 255;
    canvasData.data[index + 1]  =  34;
    canvasData.data[index + 2]  =   0;
    canvasData.data[index + 3]  = 255;
}

function conv(size) {
    return String.fromCharCode(size&0xff, (size>>8)&0xff, (size>>16)&0xff, (size>>24)&0xff);
}

function createDataForBitmap(arr, width, height){

    let offset = 54 + Math.pow(2, 8)*4 ;

    //BMP Header
    bitmapData  = 'BM';                               // ID field
    bitmapData += conv(offset + arr.length);     // BMP size
    bitmapData += conv(0);                       // unused
    bitmapData += conv(offset);                      // pixel data offset

    //DIB Header
    bitmapData += conv(40);                      // DIB header length
    bitmapData += conv(width);                       // image width
    bitmapData += conv(height);                       // image height
    bitmapData += String.fromCharCode(1, 0);       // colour panes
    bitmapData += String.fromCharCode(8, 0);      // bits per pixel
    bitmapData += conv(0);                        // compression method
    bitmapData += conv(arr.length);                   // size of the raw data
    bitmapData += conv(0);                       // horizontal print resolution
    bitmapData += conv(0);                       // vertical print resolution
    bitmapData += conv(0);                       // colour palette, 0 == 2^n
    bitmapData += conv(0);                       // important colours

    //Grayscale tables for bit depths
    bitmapData += conv(0);
    for (let i = 1; i < 256; i++)  {
        bitmapData += conv(i + i*256 + i*65536);
    }

}

function arrayToBitmap(arr) {

    //https://gist.github.com/vukicevic/8112515

    let data = bitmapData;

    //arr.reverse();

    //Pixel data
    data += String.fromCharCode.apply(String, arr);

    //Image element
    cameraImage.src = 'data:image/bmp;base64,' + btoa(data);

    cameraImage.onload = () => {
        URL.revokeObjectURL(cameraImage.src);
    }
}

function pixelHandler(tiffData, Img8Bit, Img16Bit, imgWidth, imgHeight){

    if(!htmlElementsLoaded){
        getHtmlElements(imgWidth, imgHeight);
        createDataForBitmap( Img8Bit,imgWidth, imgHeight)
    }

    ctx.clearRect(0, 0, imgWidth, imgHeight);
    let canvasData = ctx.getImageData(0, 0, imgWidth, imgHeight);

    if(targetTempChanged || initialChange === true){
        targetTemp = tempToPixelValue(tiffData, (targetMaxTemp + 273.15));
        targetTempUpdated();
        initialChange = false;
    }

    for (let y = 0; y < imgHeight; y++) {
        for (let x = 0; x < imgWidth; x++) {

            let pixelValue = calcPixelValue(Img16Bit,x,y,imgWidth);

            if(pixelValue > targetTemp){
                drawPixel(canvasData, x,y, imgWidth);
            }
        }
    }

    ctx.putImageData(canvasData, 0, 0);
}


export function handleTiffData(tiff, user) {

    let decoded = UTIF.decode(tiff);

    if(!tiffTagsLoaded){

        // get tiff tags
        let result1 = JSON.parse(decoded[0].t65104);
        let result2 = JSON.parse(decoded[0].t65105);

        tiffData = new TiffData(result1.calibParams[0].param.B,result1.calibParams[0].param.R,result1.calibParams[0].param.F,result1.calibParams[0].param.RBFOffset,result2.emissivity);

        tiffTagsLoaded = true;
    }


    UTIF.decodeImages(tiff, decoded)
    let Img8Bit  = decoded[0].data;
    let Img16Bit = decoded[1].data;


    pixelHandler(tiffData, Img8Bit, Img16Bit, decoded[0].width, decoded[0].height);
    arrayToBitmap(Img8Bit);

    getTiffData(user);
}



