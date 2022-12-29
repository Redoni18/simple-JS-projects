const videoElement = document.getElementById('video')
const buttonElement = document.getElementById('button')
const secondButtonElement = document.getElementById('second_button')
// Promp to select media stream, pass to video element, play

async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch(error) {
        console.log(error)
    }
}

buttonElement.addEventListener('click', async () => {
    //disable button
    buttonElement.disabled = true;
    //start pic in pic
    await videoElement.requestPictureInPicture();
    //enable button
    buttonElement.disabled = false;
})




selectMediaStream();