import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ImageUploading from 'react-images-uploading';
import { withRouter } from 'react-router';
import slugify from 'react-slugify';

import './index.scss';

import { DEFAULT_AVATAR_URL } from '../../Configration/defaults';
import Paths from '../../Configration/Paths';
import { useActions, useShallowEqualSelector } from '../../Hooks/Redux';

import { createAccount, setLoading } from '../../Redux/User/actions';
import Api from '../../Api';
import Loading from '../../Components/Loading';

const Index = ({ history }) => {
	const [CreateAccount, SetLoading] = useActions([createAccount, setLoading]);
	const user = useShallowEqualSelector(({ user }) => user);

	const [avatar, setAvatar] = useState();
	const [userNmae, setUserNmae] = useState('');
	const [pin, setPin] = useState('');

	const [validUsername, setValidUsername] = useState(true);
	const [findedUserName, setFindedUserName] = useState('');

	const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (!user.username) return;
	}, [user]);

	const onUserChangeHandler = (e) => {
		const useranme = slugify(e.target.value);
		setUserNmae(useranme);
		if (useranme.length <= 4) return setValidUsername(true);
		checkUserNameAvalable(useranme);
	};

	const checkUserNameAvalable = async (username) => {
		try {
			const { data } = await Api.get(`/user/available?username=${username}`);
			setFindedUserName(username);
			setValidUsername(!data.data.avalable);
		} catch (e) {
			console.log(e);
		}
	};

	const onFormSubmitHandler = async (e) => {
		try {
			e.preventDefault();
			if (!validUsername) return;
			SetLoading(true);
			const forData = new FormData();
			if (avatar && avatar[0]) {
				forData.append('avatar', avatar[0].file, avatar[0].file.name);
			}
			forData.set('username', userNmae);
			forData.set('name', userNmae);
			forData.set('pin', pin);

			await CreateAccount(forData);
			history.push(Paths.ChatsList);
		} catch (e) {
			console.log(e);
			SetLoading(false);
			setValidUsername(false);
		}
	};
	const usernameLengthValidationCalss = userNmae.length >= 4 || userNmae.length === 0 ? '' : 'username-length-error';
	const validUsernameCalss = validUsername ? '' : 'username-exist';
	const pinLengthValidationCalss = pin.length >= 4 || pin.length === 0 ? '' : 'pin-length-error';
	return (
		<>
			{user.loading && <Loading>Creating Account Please Wait...</Loading>}
			<div id='sign' className={`${usernameLengthValidationCalss} ${validUsernameCalss} ${pinLengthValidationCalss}`}>
				<div className='header'>
					<h2>Create your account</h2>
					<Link className='login-btn' to={Paths.LogIn}>
						Log-in
					</Link>
				</div>
				<p className='info'>
					You can find and edit info in your <b>setting</b>
				</p>
				<form onSubmit={onFormSubmitHandler}>
					<ImageUploading value={avatar} onChange={(list) => setAvatar(list)} maxNumber='1'>
						{({ imageList, onImageUpload, onImageUpdate, isDragging, dragProps }) => {
							return (
								<div
									className={`${isDragging ? 'upload' : ''} avatar`}
									onClick={(e) => (avatar ? onImageUpdate(e) : onImageUpload(e))}
									{...dragProps}>
									{imageList[0] ? <img src={imageList[0].dataURL} alt='' /> : <img src={DEFAULT_AVATAR_URL} alt='' />}
									<svg width='20' height='20' fill='currentColor' id='upload' viewBox='0 0 489.4 489.4'>
										<path d='M382.4 422.75H277.4v-106.1h34.7c8.8 0 14-10 8.8-17.2l-67.5-93.4c-4.3-6-13.2-6-17.5 0l-67.5 93.4c-5.2 7.2-.1 17.2 8.8 17.2h34.7v106.1H94.3c-52.5-2.9-94.3-52-94.3-105.2 0-36.7 19.9-68.7 49.4-86-2.7-7.3-4.1-15.1-4.1-23.3 0-37.5 30.3-67.8 67.8-67.8 8.1 0 15.9 1.4 23.2 4.1 21.7-46 68.5-77.9 122.9-77.9 70.4.1 128.4 54 135 122.7 54.1 9.3 95.2 59.4 95.2 116.1 0 60.6-47.2 113.1-107 117.3z' />
									</svg>
									<svg id='camera' width='20' height='20' fill='currentColor' viewBox='0 0 471.04 471.04'>
										<path
											fill='currentColor'
											d='M414.72 112.64h-49.152l-27.136-40.96c-10.24-15.36-28.16-24.576-46.592-24.576H179.2c-18.432 0-36.352 9.216-46.592 24.576l-27.136 40.96H56.32A56.158 56.158 0 000 168.96v198.656a56.158 56.158 0 0056.32 56.32h358.4a56.158 56.158 0 0056.32-56.32V168.96a56.158 56.158 0 00-56.32-56.32zm-179.2 265.216c-70.144 0-126.976-56.832-126.976-126.976s56.832-126.464 126.976-126.464 126.976 56.832 126.976 126.976c0 69.632-56.832 126.464-126.976 126.464zM407.552 192h-22.528c-9.216-.512-16.384-8.192-15.872-17.408.512-8.704 7.168-15.36 15.872-15.872h20.48c9.216-.512 16.896 6.656 17.408 15.872.512 9.216-6.144 16.896-15.36 17.408z'></path>
										<path
											fill='currentColor'
											d='M235.52 180.736c-38.912 0-70.656 31.744-70.656 70.656s31.744 70.144 70.656 70.144 70.656-31.744 70.656-70.656c0-38.912-31.744-70.144-70.656-70.144z'></path>
									</svg>
								</div>
							);
						}}
					</ImageUploading>
					<div className='input-container'>
						<svg width='20' height='20' fill='currentColor' viewBox='0 0 512 512'>
							<path d='M256 0c-74.439 0-135 60.561-135 135s60.561 135 135 135 135-60.561 135-135S330.439 0 256 0zM423.966 358.195C387.006 320.667 338.009 300 286 300h-60c-52.008 0-101.006 20.667-137.966 58.195C51.255 395.539 31 444.833 31 497c0 8.284 6.716 15 15 15h420c8.284 0 15-6.716 15-15 0-52.167-20.255-101.461-57.034-138.805z' />
						</svg>
						<div>
							<p className='input-info username-has'>@{findedUserName} username already exist</p>
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
					<div className='input-container'>
						<svg width='20' height='20' fill='currentColor' viewBox='0 0 24 24'>
							<path d='M18.75 9H18V6c0-3.309-2.691-6-6-6S6 2.691 6 6v3h-.75A2.253 2.253 0 003 11.25v10.5C3 22.991 4.01 24 5.25 24h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5C21 10.009 19.99 9 18.75 9zM8 6c0-2.206 1.794-4 4-4s4 1.794 4 4v3H8zm5 10.722V19a1 1 0 11-2 0v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z' />
						</svg>
						<div>
							<p className='input-info pin-length'>pin must be 4 character or more</p>
							<input
								value={pin}
								type={showPassword ? 'text' : 'password'}
								onChange={(e) => setPin(e.target.value)}
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
					<button disabled={!validUsername}>Create account</button>
				</form>

				<p className='info-msg'>
					Already have account click<Link to={Paths.LogIn}>here to Log-in</Link>
				</p>
			</div>
		</>
	);
};

export default withRouter(Index);
