const webcamVideo = document.getElementById('webcamVideo');


function getVideo () {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(function(stream) {
            webcamVideo.srcObject = stream;
        })
        .catch(function(err) {
            console.error(err);
        });
}

getVideo();