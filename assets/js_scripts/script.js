const webcamVideo = document.getElementById('webcamVideo');

function getVideo () {
    navigator.getUserMedia(
        { video: {} },
        stream => webcamVideo.srcObject = stream,
        err => console.error(err)
    )
}

getVideo();