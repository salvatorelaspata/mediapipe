import { useEffect } from 'react';
import { Hands, HAND_CONNECTIONS, Results, ResultsListener } from '@mediapipe/hands';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';

const hands = new Hands({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }
});

const useHands = (canvasCtx: CanvasRenderingContext2D | null, outputRef: HTMLCanvasElement | null) => {
    console.log('useHands')
    useEffect(() => {
        console.log('useHands:useEffect')
        const onResults: ResultsListener = (results: Results) => {

            if (canvasCtx && outputRef) {
                canvasCtx.save();
                canvasCtx.clearRect(0, 0, outputRef.width, outputRef.height);
                canvasCtx.drawImage(
                    results.image, 0, 0, outputRef.width, outputRef.height);
                if (results.multiHandLandmarks) {
                    console.log(results.multiHandedness)

                    console.log(results.multiHandLandmarks)
                    for (const landmarks of results.multiHandLandmarks) {
                        drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                            { color: '#00FF00', lineWidth: 5 });
                        drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
                    }
                }
                canvasCtx.restore();
            }
        }


        hands.setOptions({
            maxNumHands: 2,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        });
        hands.onResults(onResults);
    });

    return [hands]
}

export default useHands;