//STEP ZERO

const webcamVideo = document.getElementById('webcamVideo');
//STEP THREE
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("../../assets/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("../../assets/models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("../../assets/models"),
    faceapi.nets.faceExpressionNet.loadFromUri("../../assets/models")
]).then(getVideo);


//STEP ONE
function getVideo () {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(function(stream) {
            webcamVideo.srcObject = stream;
        })
        .catch(function(err) {
            console.error("err");
        });
}
//STEP TWO
webcamVideo.addEventListener('play', function(){
    alert("I am playing!");
    //STEP FIVE
    const canvas = faceapi.createCanvasFromMedia(webcamVideo);
    document.body.append(canvas);
    const DISPLAY_SIZE = { width: webcamVideo.width, height: webcamVideo.height };
    //STEP FOUR
    setInterval(async function () {
        const detections = await faceapi.detectAllFaces(webcamVideo,
            new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        console.log(detections);
    }, 100)
});



