import { useEffect } from 'react';
import { FaceDetection, Results, ResultsListener } from '@mediapipe/face_detection';
import { drawLandmarks, drawRectangle } from '@mediapipe/drawing_utils';

const faceDetection = new FaceDetection({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
    }
});

const useDetection = (canvasCtx: CanvasRenderingContext2D | null, outputRef: HTMLCanvasElement | null) => {
    console.log('useDetection')
    useEffect(() => {
        console.log('useDetection:useEffect')
        const _onResultsFaceDetection: ResultsListener = (results: Results) => {
            if (canvasCtx && outputRef) {
                // Draw the overlays.
                canvasCtx.save();
                canvasCtx.clearRect(0, 0, outputRef.width, outputRef.height);
                canvasCtx.drawImage(
                    results.image, 0, 0, outputRef.width, outputRef.height);
                if (results.detections.length > 0) {
                    drawRectangle(
                        canvasCtx, results.detections[0].boundingBox,
                        { color: 'blue', lineWidth: 4, fillColor: '#00000000' });
                    drawLandmarks(canvasCtx, results.detections[0].landmarks, {
                        color: 'red',
                        radius: 5,
                    });
                }
                canvasCtx.restore();
            }
        }

        faceDetection.setOptions({
            selfieMode: true,
            model: 'short',
            minDetectionConfidence: 0.5,
        });
        faceDetection.onResults(_onResultsFaceDetection);
    });

    return [faceDetection]
}

export default useDetection;