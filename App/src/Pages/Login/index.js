import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import slugify from 'react-slugify';

import '../SignUp/index.scss';
import './index.scss';

import Paths from '../../Configration/Paths';
import { useActions, useShallowEqualSelector } from '../../Hooks/Redux';

import { logIn, setLoading } from '../../Redux/User/actions';
import Loading from '../../Components/Loading';

const Index = ({ history }) => {
	const [LogIn, SetLoading] = useActions([logIn, setLoading]);
	const user = useShallowEqualSelector(({ user }) => user);

	const [userNmae, setUserNmae] = useState('');
	const [pin, setPin] = useState('');
	const [validCridiancials, setValidCridiancials] = useState(true);

	const [showPassword, setShowPassword] = useState(false);

	const onUserChangeHandler = (e) => {
		const useranme = slugify(e.target.value);
		setUserNmae(useranme);
		setValidCridiancials(true);
	};

	useEffect(() => {
		if (!user.username) return;
	}, [user]);

	const onFormSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			SetLoading(true);
			await LogIn({
				username: userNmae,
				pin,
			});
			history.push(Paths.ChatsList);
		} catch (e) {
			setValidCridiancials(false);
			SetLoading(false);
		}
	};

	const usernameLengthValidationCalss = userNmae.length >= 4 || userNmae.length === 0 ? '' : 'username-length-error';
	const pinLengthValidationCalss = pin.length >= 4 || pin.length === 0 ? '' : 'pin-length-error';
	const validCridiancialsCalss = validCridiancials ? '' : 'invalid-criediancials';

	return (
		<>
			{user.loading && <Loading>Checking Cridiancials Please Wait...</Loading>}
			<div
				id='log-in'
				className={`${usernameLengthValidationCalss} ${validCridiancialsCalss}  ${pinLengthValidationCalss}`}>
				<div className='header'>
					<h2>Login to your account</h2>
					<Link className='login-btn' to={Paths.SignUp}>
						Create account
					</Link>
				</div>
				<p className='info'>
					we save all of your data in <b>encrypted</b> form
				</p>
				<form onSubmit={onFormSubmitHandler}>
					<div className='avatar'>
						<img src={'http://localhost:3001/media/whatsapp/hero.png'} alt='' />
					</div>
					<div className='input-container'>
						<svg width='20' height='20' fill='currentColor' viewBox='0 0 512 512'>
							<path d='M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z' />
						</svg>
						<div>
							<p className='input-info invalid'>Please Provide Valid Usernaem or Pin</p>
							<p className='input-info username-length'>username must be 4 character or more</p>
							<input
								value={userNmae}
								onChange={onUserChangeHandler}
								required
								minLength='4'
								type='text'
								placeholder='User Name'
							/>
							<div className='border'></div>
						</div>
					</div>
					<div className='input-container invalid'>
						<svg width='20' height='20' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M18.75 9H18V6c0-3.309-2.691-6-6-6S6 2.691 6 6v3h-.75A2.253 2.253 0 003 11.25v10.5C3 22.991 4.01 24 5.25 24h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5C21 10.009 19.99 9 18.75 9zM8 6c0-2.206 1.794-4 4-4s4 1.794 4 4v3H8zm5 10.722V19a1 1 0 11-2 0v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z' />
						</svg>
						<div>
							<p className='input-info invalid'>Please Provide Valid Usernaem or Pin</p>
							<p className='input-info pin-length'>pin must be 4 character or more</p>
							<input
								value={pin}
								type={showPassword ? 'text' : 'password'}
								onChange={(e) => {
									setPin(e.target.value);
									setValidCridiancials(true);
								}}
								required
								minLength='4'
								placeholder='Pin'
							/>
							<svg
								onClick={() => setShowPassword(!showPassword)}
								width='20'
								height='20'
								fill='currentColor'
								id='eye'
								viewBox='0 0 512 512'>
								<path d='M508.177 245.995C503.607 240.897 393.682 121 256 121S8.394 240.897 3.823 245.995a15.002 15.002 0 000 20.01C8.394 271.103 118.32 391 256 391s247.606-119.897 252.177-124.995a15.004 15.004 0 000-20.01zM256 361c-57.891 0-105-47.109-105-105s47.109-105 105-105 105 47.109 105 105-47.109 105-105 105z' />
								<path d='M271 226c0-15.09 7.491-28.365 18.887-36.53C279.661 184.235 268.255 181 256 181c-41.353 0-75 33.647-75 75s33.647 75 75 75c37.024 0 67.668-27.034 73.722-62.358C299.516 278.367 271 255.522 271 226z' />
							</svg>
							<div className='border'></div>
						</div>
					</div>
					<button>Log-in</button>
				</form>

				<p className='info-msg'>
					Don't have account click<Link to={Paths.SignUp}>here to Create one</Link>
				</p>
			</div>
		</>
	);
};

export default withRouter(Index);
