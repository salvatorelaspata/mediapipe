import React, { useEffect, useRef } from 'react'
import { Camera } from '@mediapipe/camera_utils';
import testSupport from '../../hook/testSupport';
import useSelfieSegmentation from '../../hook/useSelfieSegmentation';
import { FaceProp } from '../../types/mediapipe';

testSupport([
    { client: 'Chrome' },
]);

const SelfieSegmentation: React.FC<FaceProp> = ({ size, input }) => {
    const output = useRef<HTMLCanvasElement>(null);
    const outputRef = output.current;
    const canvasCtx = outputRef && outputRef.getContext('2d');

    const [selfieSegmentation] = useSelfieSegmentation(canvasCtx, outputRef);

    useEffect(() => {
        const inputRef = input.current;

        if (inputRef && size && size.width) {
            const camera = new Camera(inputRef, {
                onFrame: async () => {
                    await selfieSegmentation.send({ image: inputRef });
                },
                width: size.width / 2,
                height: size.width / 2 / 1.777777777777778
            });
            camera.start();
        }
    });

    return <canvas ref={output} width={size && size.width && size.width / 2} height={size && size.width && size.width / 2 / 1.777777777777778}></canvas>

}

export default SelfieSegmentation