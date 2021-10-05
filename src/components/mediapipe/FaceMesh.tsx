import React, { useEffect, useRef } from 'react'
import { Camera } from '@mediapipe/camera_utils';
import testSupport from '../../hook/testSupport';
import useMesh from '../../hook/useMesh';
import { FaceProp } from '../../types/mediapipe';

testSupport([
    { client: 'Chrome' },
]);

const FaceMesh: React.FC<FaceProp> = ({ size, input }) => {
    const output = useRef<HTMLCanvasElement>(null);
    const outputRef = output.current;
    const canvasCtx = outputRef && outputRef.getContext('2d');

    const [faceMesh] = useMesh(canvasCtx, outputRef);

    useEffect(() => {
        const inputRef = input.current;

        if (inputRef && size && size.width) {
            const camera = new Camera(inputRef, {
                onFrame: async () => {
                    await faceMesh.send({ image: inputRef });
                },
                width: size.width / 2,
                height: size.width / 2 / 1.777777777777778
            });
            camera.start();
        }
    });

    return <canvas ref={output} width={size && size.width && size.width / 2} height={size && size.width && size.width / 2 / 1.777777777777778}></canvas>

}

export default FaceMesh