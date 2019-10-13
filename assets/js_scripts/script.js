const webcamVideo = document.getElementById('webcamVideo');

Promise.all([
   faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./models"),
    faceapi.nets.faceExpressionNet.loadFromUri("./models")
]).then(getVideo);

function getVideo () {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(function(stream) {
            webcamVideo.srcObject = stream;
        })
        .catch(function(err) {
            console.error("err");
        });
}

webcamVideo.addEventListener('play', function(){
    alert("I am playing!");
    setInterval(async function () {
        const detections = await faceapi.detectAllFaces(webcamVideo,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        console.log(detections);
    }, 100)
});



