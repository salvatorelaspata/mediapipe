import React, { useRef } from 'react'
import testSupport from '../hook/testSupport';
import useWindowSize from '../hook/useWindowSize';
// import FaceDetection from '../components/mediapipe/FaceDetection';
import FaceMesh from '../components/mediapipe/FaceMesh';
// import SelfieSegmentation from '../components/mediapipe/SelfieSegmentation';
import { Size } from '../types/mediapipe';
// import Hands from '../components/mediapipe/Hands';

interface MediaPipeProp {

}
testSupport([
    { client: 'Chrome' },
]);

const MediaPipe: React.FC<MediaPipeProp> = () => {

    const input = useRef<HTMLVideoElement>(null);
    const size: Size = useWindowSize();

    return (
        <div className="container">
            <video className="input_video" ref={input} hidden></video>
            {/* <Hands input={input} size={size} /> */}
            {/* <FaceDetection input={input} size={size} /> */}
            <FaceMesh input={input} size={size} />
            {/* <SelfieSegmentation input={input} size={size} /> */}

        </div>
    )
}

export default MediaPipe