import {token} from "./getToken";
//import {checkToken} from "../DataHandler/checkToken";


//get the camera image

export async function getImage(user)
{
    let image = document.getElementById('img');

    //await checkToken(user);

    let response = await fetch(`http://${user.ip}/api/images/live`, {
        headers: {
            'accept': 'image/bmp',
            'Authorization': `Bearer ${token.accessToken}`
        }
    })

    if (response.status === 200) {
        let blob = await response.blob();
        image.src = URL.createObjectURL(blob);

        image.onload = () => {
            URL.revokeObjectURL(image.src);
        }

        //start new request after the previous one is done
        getImage(user);
    }
}