/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';

import './index.scss';

const Index = () => {
	const webcamRef = useRef(null);
	const [imgSrc, setImgSrc] = useState(null);

	const capture = useCallback(() => {
		const img = webcamRef.current.getScreenshot();
		setImgSrc(img);
	}, [webcamRef]);

	return (
		<div id='camera'>
			<div className='video'>
				<Webcam audio={false} ref={webcamRef} />
				<div className='capture-cantroll'>
					<button className='capture-btn' onClick={capture}>
						capture
					</button>
				</div>
			</div>
			{imgSrc ? (
				<div className='result'>
					<canvas></canvas>
					<img src={imgSrc} alt='img' />
				</div>
			) : (
				''
			)}
		</div>
	);
};

export default Index;
