const webcamVideo = document.getElementById("webcamVideo");

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("./"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./"),
    faceapi.nets.faceRecognitionNet.loadFromUri("./"),
    faceapi.nets.faceExpressionNet.loadFromUri("./")
]).then(getVideo);

function getVideo () {
    navigator.mediaDevices.getUserMedia({video: {}})
        .then(function(stream) {
            webcamVideo.srcObject = stream;
        })
        .catch(function(err){
            console.error(err);
        })
}

getVideo();

webcamVideo.addEventListener('play', function(){
   console.log("I am playing");
   console.log(faceapi.nets);
   const canvas = faceapi.createCanvasFromMedia(webcamVideo);
   document.body.append(canvas);
const displaySize = { width: webcamVideo.width, height: webcamVideo.height };
faceapi.matchDimensions(canvas, displaySize);
   setInterval(async function (){
       const detections = await faceapi.detectAllFaces(webcamVideo, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
       const resizeDetections = faceapi.resizeResults(detections, displaySize);
       canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

       faceapi.draw.drawDetections(canvas, resizeDetections);
        console.log(detections);
   }, 100);
});