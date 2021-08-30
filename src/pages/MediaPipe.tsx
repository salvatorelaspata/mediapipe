import { Camera } from '@mediapipe/camera_utils';
import { FaceDetection, Results, ResultsListener } from '@mediapipe/face_detection';
import { drawLandmarks, drawRectangle } from '@mediapipe/drawing_utils'
import React, { useEffect, useRef } from 'react'
// import DeviceDetector from 'device-detector-js';

interface MediaPipeProp {

}
// Usage: testSupport({client?: string, os?: string}[])
// Client and os are regular expressions.
// See: https://cdn.jsdelivr.net/npm/device-detector-js@2.2.10/README.md for
// legal values for client and os

// const testSupport = (supportedDevices: { client?: string; os?: string; }[]) => {
//     debugger;
//     const deviceDetector = new DeviceDetector();
//     const detectedDevice = deviceDetector.parse(navigator.userAgent);

//     let isSupported = false;
//     for (const device of supportedDevices) {
//         if (device.client !== undefined) {
//             const re = new RegExp(`^${device.client}$`);
//             if (detectedDevice && detectedDevice.client && !re.test(detectedDevice.client.name)) {
//                 continue;
//             }
//         }
//         if (device.os !== undefined) {
//             const re = new RegExp(`^${device.os}$`);
//             if (detectedDevice && detectedDevice.os && !re.test(detectedDevice.os.name)) {
//                 continue;
//             }
//         }
//         isSupported = true;
//         break;
//     }
//     if (!isSupported) {
//         alert(`This demo, running on ${detectedDevice && detectedDevice.client && detectedDevice.client.name}/${detectedDevice && detectedDevice.os && detectedDevice.os.name}, ` +
//             `is not well supported at this time, continue at your own risk.`);
//     }
// }
// testSupport([
//     { client: 'Chrome' },
// ]);
const MediaPipe: React.FC<MediaPipeProp> = () => {
    const container = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLVideoElement>(null);
    const output = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const faceDetection = new FaceDetection({
            locateFile: (file) => {
                return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
            }
        });
        const containerRef = container.current;
        const inputRef = input.current;
        const outputRef = output.current;
        const canvasCtx = outputRef && outputRef.getContext('2d');
        faceDetection.setOptions({
            selfieMode: true,
            model: 'short',
            minDetectionConfidence: 0.5,
        });

        const _onResults: ResultsListener = (results: Results) => {
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

        faceDetection.onResults(_onResults);

        if (containerRef && inputRef && outputRef) {
            const camera = new Camera(inputRef, {
                onFrame: async () => {
                    await faceDetection.send({ image: inputRef });
                },
                width: 1280,
                height: 720
            });
            camera.start();
        }
    });

    return (
        <div className="container" ref={container}>
            <video className="input_video" ref={input} hidden></video>
            <canvas className="output_canvas" ref={output} width="1280px" height="720px"></canvas>
        </div>
    )
}

export default MediaPipe