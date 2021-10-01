import { withRouter } from 'react-router-dom';

import './index.scss';

const Index = ({ children, title = 'Settings', history }) => {
	return (
		<>
			<header>
				<button onClick={history.goBack}>back</button>
				<h2>{title}</h2>
			</header>
			{children}
		</>
	);
};

export default withRouter(Index);
