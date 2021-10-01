import { useEffect } from 'react';
import './index.scss';

const loadingClassName = 'loading-active';
const Index = ({ children }) => {
	useEffect(() => {
		document.body.classList.add(loadingClassName);
		return () => {
			document.body.classList.remove(loadingClassName);
		};
	}, []);
	return (
		<div id='loading-spinner'>
			<div className='overlay'></div>
			<svg className='spinner-container' viewBox='0 0 44 44'>
				<circle className='path' cx='22' cy='22' r='20' fill='none' strokeWidth='4'></circle>
			</svg>
			<p>{children}</p>
		</div>
	);
};

export default Index;
