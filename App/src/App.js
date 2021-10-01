import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Container } from 'react-bootstrap';

import Paths from './Configration/Paths';

import MainWrapper from './Layout/MainWrapper';
import ProtectPage from './Components/ProtectPage';

import mainTabs from './Pages/mainTabs';
import Camera from './Pages/Camera';
import ContactsList from './Pages/ContactsList';
import Settings from './Pages/Settings';
import Chat from './Pages/Chat';
import Call from './Pages/Call';
import ConversationDetails from './Pages/ConversationDetails';

import SignUp from './Pages/SignUp';
import Login from './Pages/Login';

import './Fonts/style.css';
import './App.scss';
import './PageTransiion.scss';
import 'react-virtualized/styles.css';

const Routes = [
	{ path: Paths.ChatsList, Component: mainTabs, isProtected: true },
	{ path: Paths.Camera, Component: Camera, isProtected: true },
	{ path: Paths.ContactsList, Component: ContactsList, isProtected: true },
	{ path: Paths.Settings, Component: Settings, isProtected: true },
	{ path: Paths.Chat + '/:id', Component: Chat, isProtected: true },
	{ path: Paths.Chat + '/:id' + Paths.Call, Component: Call, isProtected: true },
	{ path: Paths.Chat + '/:id' + Paths.ConversationDetails, Component: ConversationDetails, isProtected: true },
	{ path: Paths.SignUp, Component: SignUp, isProtected: false },
	{ path: Paths.LogIn, Component: Login, isProtected: false },
];

const App = () => {
	return (
		<Router>
			<Switch>
				<Container>
					{Routes.map(({ path, Component, isProtected }) => (
						<Route protected={isProtected} key={path} exact path={path}>
							{({ match }) => (
								<CSSTransition in={match != null} timeout={500} classNames='page' unmountOnExit>
									<div className='page'>
										<ProtectPage isProtected={isProtected}>
											<MainWrapper>
												<Component />
											</MainWrapper>
										</ProtectPage>
									</div>
								</CSSTransition>
							)}
						</Route>
					))}

					{/* <Redirect to='/' /> */}
				</Container>
			</Switch>
		</Router>
	);
};

export default App;
