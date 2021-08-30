import { useEffect } from 'react';
import { Results, ResultsListener, SelfieSegmentation } from '@mediapipe/selfie_segmentation';

const selfieSegmentation = new SelfieSegmentation({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation/${file}`;
    }
});

const useSelfieSegmentation = (canvasCtx: CanvasRenderingContext2D | null, outputRef: HTMLCanvasElement | null) => {
    console.log('useSelfieSegmentation')
    useEffect(() => {
        console.log('useSelfieSegmentation:useEffect')
        const onResults: ResultsListener = (results: Results) => {
            if (canvasCtx && outputRef) {
                canvasCtx.save();
                canvasCtx.clearRect(0, 0, outputRef.width, outputRef.height);
                canvasCtx.drawImage(results.segmentationMask, 0, 0,
                    outputRef.width, outputRef.height);

                // Only overwrite existing pixels.
                canvasCtx.globalCompositeOperation = 'source-out';// 'source-out';
                canvasCtx.fillStyle = '#00FF00';
                canvasCtx.fillRect(0, 0, outputRef.width, outputRef.height);

                // Only overwrite missing pixels.
                canvasCtx.globalCompositeOperation = 'destination-atop';
                canvasCtx.drawImage(
                    results.image, 0, 0, outputRef.width, outputRef.height);

                canvasCtx.restore();
            }
        }


        selfieSegmentation.setOptions({
            modelSelection: 1,
        });
        selfieSegmentation.onResults(onResults);
    });

    return [selfieSegmentation]
}

export default useSelfieSegmentation;