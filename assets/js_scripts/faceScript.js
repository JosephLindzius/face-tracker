const imageUpload = document.getElementById("imageUpload");

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./')
]).then(beginScript);

function loadLabelsPictures () {
    const labels = ["Joseph"];
    const descriptions = [];
    return Promise.all(labels.map(async function (label) {
        for (let i = 0; i < 4; i++) {
            console.log(i);
            console.log('https://raw.githubusercontent.com/JosephLindzius/face-tracker/master/assets/images/' + label + '/' + 'j' + i + '.jpg' );
            const image = await faceapi.fetchImage('https://raw.githubusercontent.com/JosephLindzius/face-tracker/master/assets/images/' + label + '/' + 'j' + i + '.jpg' );
            const detections = await faceapi.detectSingleFace(image).withFaceLandmarks().withFaceDescriptor();
            console.log(detections);
            if (detections !== undefined)
                descriptions.push(detections.descriptor);
        }
        console.log(new faceapi.LabeledFaceDescriptors(label, descriptions));
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
    }))
}

async function beginScript () {
    document.body.append('Loaded');
    const wrapper = document.createElement('div');
    wrapper.addClassName = "wrapper";
    wrapper.style.position = "absolute";
    document.body.append(wrapper);
     const labeledDescriptors = await loadLabelsPictures();
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
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
        const results = resizeDetections.map(d => faceMatcher.findBestMatch(d.descriptor));
        results.forEach(function (result, i){
            const box = resizeDetections[i].detection.box;
            const drawBox = new faceapi.draw.DrawBox(box, {label: result});
            console.log(drawBox);
            drawBox.draw(canvas);
        });
        console.log(await loadLabelsPictures());




    })
}
