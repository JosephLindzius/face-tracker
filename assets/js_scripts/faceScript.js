const imageUpload = document.getElementById("imageUpload");

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./')
]).then(beginScript);

function beginScript () {
    document.body.append('Loaded');
    const wrapper = document.createElement('div');
    wrapper.addClassName = "wrapper";
    wrapper.style.position = "absolute";
    document.body.append(wrapper);
    imageUpload.addEventListener('change', async function () {
        const image = await faceapi.bufferToImage(imageUpload.files[0]);
        wrapper.append(image);
        const canvas = faceapi.createCanvasFromMedia(image);
        wrapper.append(canvas);
        const displaySize = { width: image.width, height: image.height };
        faceapi.matchDimensions(canvas, displaySize);
        const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors();
        wrapper.append("faces found:" + detections.length);
        //displays to perfect size
        const resizeDetections = faceapi.resizeResults(detections, displaySize);
        resizeDetections.forEach(function (detection) {
            const box = detection.detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, {label: "face found"});
            drawBox.draw(canvas);
        });

function loadLabelsPictures () {
    const labels = ["Joseph"];
    return Promise.all(labels.map(async function () {
        for (let i = 1; i <= 3; i++) {
            const img = await faceapi.fetchImage()
        }
    }))
}



    })
}
