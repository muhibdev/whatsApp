import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './index.scss';
import { MEDIA_HONST } from '../../Configration/defaults';

import API from '../../Api';
import { useShallowEqualSelector } from '../../Hooks/Redux';

const Index = ({ toggle, modal, setModal }) => {
	const [users, setUsers] = useState([]);

	const contacts = useShallowEqualSelector(({ contacts }) => contacts.contacts);
	const user = useShallowEqualSelector(({ user }) => user);

	const avalableContacts = contacts ? contacts.map(({ user }) => user.username) : [];
	const [inputval, setInputval] = useState('');

	useEffect(() => {
		return () => {
			console.log('Running');
			setUsers([]);
			setInputval('');
		};
	}, [modal]);
	const closeModal = () => setModal(false);
	const findUser = async () => {
		try {
			const { data } = await API.get(`/user/find?search=${inputval}`);

			setUsers(() => {
				return (
					data.data.users.filter(({ _id }) => {
						if (_id === user._id) return false;
						if (contacts.some((contact) => contact.user._id === _id)) return false;
						return true;
					}) || []
				);
			});
		} catch (err) {
			console.log(err);
		}
	};

	const addContact = async (contact) => {
		window.socket && window.socket.emit('Add Contact', { contact });
	};

	return (
		<Modal className='add-contact-model' isOpen={modal} onRequestClose={closeModal} contentLabel='Add Contact'>
			<h1>Add New Contact</h1>
			<svg onClick={closeModal} width='24' height='24' id='close-btn' fill='currentColor' viewBox='0 0 329.269 329'>
				<path d='M194.8 164.77L323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0015.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0' />
			</svg>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					findUser();
				}}>
				<input
					value={inputval}
					onChange={(e) => {
						setInputval(e.target.value);
						findUser();
					}}
					placeholder='Search by name or @username'
					type='text'
				/>
				<div className='border'></div>
				<svg width='24' height='24'>
					<path
						fill='currentColor'
						d='M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z'></path>
				</svg>
			</form>
			<p>Find {users?.length} related Results</p>
			<ul>
				{!users?.length && (
					<li>
						<p>No results</p>
					</li>
				)}
				{users.map(({ avatar, name, about, _id, username }) => {
					if (_id === user._id) return '';
					return (
						<li key={_id}>
							<img src={`${MEDIA_HONST}${avatar}`} alt='' className='user_profile' />
							<div className='contact-details'>
								<h3 className='user_name'>{name}</h3>
								<p className='recent__chat'>{about}</p>
							</div>
							{
								<button
									onClick={(e) => {
										if (e.target.innerHTML === 'Added') {
											return;
										}
										e.target.innerHTML = 'Added';
										e.target.setAttribute('disabled', 'true');
										addContact(_id);
									}}>
									Add
								</button>
							}
						</li>
					);
				})}
			</ul>
		</Modal>
	);
};

export default Index;
