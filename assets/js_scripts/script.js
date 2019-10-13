const video = document.getElementById('video');

function getVideo () {
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

getVideo();