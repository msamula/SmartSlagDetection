// draw all aoi from the job

export function drawAOI(coordinatesArray, width, height){
    let canvas = document.getElementById('aoi');

    canvas.width = width;
    canvas.height = height;

    let ctx = canvas.getContext('2d');

    if(coordinatesArray.length > 0){
        for (let i = 0; i < coordinatesArray.length; i++) {
            if(coordinatesArray[i][0] === 'Polygon' ||  coordinatesArray[i][0] === 'Line' ||  coordinatesArray[i][0] === 'Rect' ||  coordinatesArray[i][0] === 'RectLine'){
                ctx.beginPath();
                ctx.moveTo(coordinatesArray[i][1][0], coordinatesArray[i][1][1]);
                for (let j = 2; j < coordinatesArray[i].length; j++) {
                    ctx.lineTo(coordinatesArray[i][j][0], coordinatesArray[i][j][1]);
                }
                ctx.closePath();
                ctx.lineWidth   = 2;
                ctx.strokeStyle = 'rgba(61, 168, 245, 0.8)';
                ctx.fillStyle   = 'rgba(61, 168, 245, 0.2)';
                ctx.stroke();
                ctx.fill();
            }

            if(coordinatesArray[i][0] === 'PolyLine'){
                ctx.beginPath();
                ctx.moveTo(coordinatesArray[i][1][0], coordinatesArray[i][1][1]);
                for (let j = 2; j < coordinatesArray[i].length; j++) {
                    ctx.lineTo(coordinatesArray[i][j][0], coordinatesArray[i][j][1]);
                }
                ctx.lineWidth   = 2;
                ctx.strokeStyle = 'rgba(61, 168, 245, 0.8)';
                ctx.stroke();
            }

            if(coordinatesArray[i][0] === 'Ellipse' ||  coordinatesArray[i][0] === 'EllipseLine'){
                let width  = (Math.abs(coordinatesArray[i][1][0] - coordinatesArray[i][2][0])/2);
                let height = (Math.abs(coordinatesArray[i][2][1] - coordinatesArray[i][3][1])/2);
                let x = coordinatesArray[i][1][0] + width;
                let y = coordinatesArray[i][2][1] + height;

                ctx.beginPath();
                ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI, false);
                ctx.stroke();

                if(coordinatesArray[i][0] === 'Ellipse'){
                    ctx.fillStyle = 'rgba(61, 168, 245, 0.2)';
                    ctx.fill();
                }

            }
        }
    }
}