import {checkToken, token} from "./getToken";
import {cameraImage} from "../UserInterface/Main/loadHtmlElements";


//get the camera image

export async function getImage(user) {

    await checkToken(user);

    let response = await fetch(`http://${user.ip}/api/images/live`, {
        headers: {
            'accept': 'image/bmp',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })
    .catch(()=>{
        getImage(user);
    })

    if (response.status === 200) {
        let blob = await response.blob();
        cameraImage.src = URL.createObjectURL(blob);

        cameraImage.onload = () => {
            URL.revokeObjectURL(cameraImage.src);
        }

        //start new request after the previous one is done
        getImage(user);
    }
}