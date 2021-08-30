import { useEffect } from 'react';
import { FaceMesh, Results, ResultsListener, FACEMESH_FACE_OVAL, FACEMESH_LEFT_EYE, FACEMESH_LEFT_EYEBROW, FACEMESH_LIPS, FACEMESH_RIGHT_EYE, FACEMESH_RIGHT_EYEBROW, FACEMESH_TESSELATION } from '@mediapipe/face_mesh';
import { drawConnectors } from '@mediapipe/drawing_utils';

const faceMesh = new FaceMesh({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    }
});

const useMesh = (canvasCtx: CanvasRenderingContext2D | null, outputRef: HTMLCanvasElement | null) => {
    console.log('useDetection')
    useEffect(() => {
        console.log('useDetection:useEffect')
        const onResultsFaceMesh: ResultsListener = (results: Results) => {
            if (canvasCtx && outputRef) {
                canvasCtx.save();
                canvasCtx.clearRect(0, 0, outputRef.width, outputRef.height);
                canvasCtx.drawImage(
                    results.image, 0, 0, outputRef.width, outputRef.height);
                if (results.multiFaceLandmarks) {
                    for (const landmarks of results.multiFaceLandmarks) {
                        drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION,
                            { color: '#C0C0C070', lineWidth: 1 });
                        drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYE, { color: '#FF3030' });
                        drawConnectors(canvasCtx, landmarks, FACEMESH_RIGHT_EYEBROW, { color: '#FF3030' });
                        drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYE, { color: '#30FF30' });
                        drawConnectors(canvasCtx, landmarks, FACEMESH_LEFT_EYEBROW, { color: '#30FF30' });
                        drawConnectors(canvasCtx, landmarks, FACEMESH_FACE_OVAL, { color: '#E0E0E0' });
                        drawConnectors(canvasCtx, landmarks, FACEMESH_LIPS, { color: '#E0E0E0' });
                    }
                }
                canvasCtx.restore();
            }
        }

        faceMesh.setOptions({
            maxNumFaces: 3,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        faceMesh.onResults(onResultsFaceMesh);
    })
    return [faceMesh]
}

export default useMesh;