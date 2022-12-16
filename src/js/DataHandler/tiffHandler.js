import UTIF from './Helper/utif';
import {TiffData} from "./models";
import {getTiffData} from "../DataAccess/getTiff";
import {targetMaxTemp} from "../UserInterface/Configure/addConfigEvents";

let tiffData, canvas, ctx, tiffTagsLoaded = false, htmlElementsLoaded = false, targetTemp;

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

function pixelHandler(tiffData, img, imgWidth, imgHeight){

    if(!htmlElementsLoaded){
        getHtmlElements(imgWidth, imgHeight);
    }

    ctx.clearRect(0, 0, imgWidth, imgHeight);
    let canvasData = ctx.getImageData(0, 0, imgWidth, imgHeight);

    //if(targetTemp === undefined){
        targetTemp = tempToPixelValue(tiffData, (targetMaxTemp + 273.15));
    //}

    for (let y = 0; y < imgHeight; y++) {
        for (let x = 0; x < imgWidth; x++) {

            let pixelValue = calcPixelValue(img,x,y,imgWidth);

            if(pixelValue > targetTemp){
                drawPixel(canvasData, x,y, imgWidth);
            }
        }
    }

    ctx.putImageData(canvasData, 0, 0);
}


export function handleTiffData(tiff, ip) {

    let decoded = UTIF.decode(tiff);

    if(!tiffTagsLoaded){

        // get tiff tags
        let result1 = JSON.parse(decoded[0].t65104);
        let result2 = JSON.parse(decoded[0].t65105);

        tiffData = new TiffData(result1.calibParams[0].param.B,result1.calibParams[0].param.R,result1.calibParams[0].param.F,result1.calibParams[0].param.RBFOffset,result2.emissivity);

        tiffTagsLoaded = true;
    }


    UTIF.decodeImages(tiff, decoded)
    let Img16Bit = decoded[1].data;

    pixelHandler(tiffData, Img16Bit, decoded[0].width, decoded[0].height);

    getTiffData(ip);
}
///////////////////https://gist.github.com/vukicevic/8112515