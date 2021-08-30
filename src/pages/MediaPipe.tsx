import React, { useEffect, useRef } from 'react'
import { Camera } from '@mediapipe/camera_utils';
import testSupport from '../hook/testSupport';
import useDetection from '../hook/useDetection';
import useMesh from '../hook/useMesh';
import useWindowSize, { Size } from '../hook/useWindowSize';
import useSelfieSegmentation from '../hook/useSelfieSegmentation';

interface MediaPipeProp {

}
testSupport([
    { client: 'Chrome' },
]);

const MediaPipe: React.FC<MediaPipeProp> = () => {
    console.log('MediaPipe')
    const container = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLVideoElement>(null);
    const output = useRef<HTMLCanvasElement>(null);
    const outputRef = output.current;
    const outputMesh = useRef<HTMLCanvasElement>(null);
    const outputMeshRef = outputMesh.current;

    const outputSelfieSegm = useRef<HTMLCanvasElement>(null);
    const outputSelfieSegmRef = outputSelfieSegm.current;

    const canvasCtx = outputRef && outputRef.getContext('2d');
    const canvasMeshCtx = outputMeshRef && outputMeshRef.getContext('2d');
    const canvasSelfieSegmCtx = outputSelfieSegmRef && outputSelfieSegmRef.getContext('2d');

    const size: Size = useWindowSize();
    const [faceDetection] = useDetection(canvasCtx, outputRef);
    const [faceMesh] = useMesh(canvasMeshCtx, outputMeshRef);
    const [selfieSegmentation] = useSelfieSegmentation(canvasSelfieSegmCtx, outputSelfieSegmRef);

    useEffect(() => {
        console.log('MediaPipe:useEffect')
        const inputRef = input.current;

        if (inputRef && size && size.width) {
            const camera = new Camera(inputRef, {
                onFrame: async () => {
                    await faceDetection.send({ image: inputRef });
                    await faceMesh.send({ image: inputRef });
                    await selfieSegmentation.send({ image: inputRef });
                },
                width: size.width / 2,
                height: size.width / 2 / 1.777777777777778
            });
            camera.start();
        }
    });

    return (
        <div className="container" ref={container}>
            <video className="input_video" ref={input} hidden></video>
            <canvas ref={output} width={size && size.width && size.width / 2} height={size && size.width && size.width / 2 / 1.777777777777778}></canvas>
            <canvas ref={outputMesh} width={size && size.width && size.width / 2 - 30} height={size && size.width && size.width / 2 / 1.777777777777778}></canvas>
            <canvas ref={outputSelfieSegm} width={size && size.width && size.width} height={size && size.width && size.width / 1.777777777777778}></canvas>
        </div>
    )
}

export default MediaPipe