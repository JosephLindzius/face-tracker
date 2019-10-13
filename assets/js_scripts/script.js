//STEP ZERO

const webcamVideo = document.getElementById('webcamVideo');
//STEP THREE
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("../models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("../models"),
    faceapi.nets.faceRecognitionNet.loadFromUri("../models"),
    faceapi.nets.faceExpressionNet.loadFromUri("../models")
]).then(getVideo);


//STEP ONE
function getVideo () {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(function(stream) {
            webcamVideo.srcObject = stream;
        })
        .catch(function(error) {
            console.error(error);
        });
}
//STEP TWO
webcamVideo.addEventListener('play', function(){
    console.log("I am playing!");
    //STEP FIVE
    const canvas = faceapi.createCanvasFromMedia(webcamVideo);
    document.body.append(canvas);
    const displaySize = { width: webcamVideo.width, height: webcamVideo.height };
    faceapi.matchDimensions(canvas, displaySize);
    //STEP FOUR
    setInterval(async function () {
        const detections = await faceapi.detectAllFaces(webcamVideo, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        const resizeDetections = faceapi.resizeResults(detections, displaySize);
        faceapi.draw.drawDetections(canvas, resizeDetections);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        console.log(detections);
    }, 100)
});

console.log(faceapi.nets);



