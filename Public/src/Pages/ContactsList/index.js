import { useState } from 'react';

import { getAllContacts } from '../../Redux/Contacts/actions';
import useFatchAction from '../../Hooks/useFatchAction';
import { useShallowEqualSelector } from '../../Hooks/Redux';

import Contact from '../../Layout/Contact';
import ContactListItem from '../../Components/ContactListItem';
import AddContact from '../../Components/AddContact';
import Loading from '../../Components/Loading';

import './index.scss';

const Index = () => {
	const [modal, setModal] = useState(false);
	const contacts = useShallowEqualSelector(({ contacts }) => contacts.contacts);

	const { loading } = useFatchAction(getAllContacts, {
		isLoading: contacts.length,
	});

	const toggle = () => setModal(!modal);
	return (
		<>
			{loading && <Loading />}
			<AddContact toggle={toggle} modal={modal} setModal={setModal} />
			<Contact contactLength={contacts.length} />
			<ul id='contact-list'>
				<li id='new-contact-btn' onClick={() => setModal(true)}>
					<div className='contact-details'>
						<div className='icon'>
							<svg width='22' height='22' fill='currentColor' viewBox='0 0 612 612'>
								<path d='M269.272 310.198c86.177-.005 117.184-86.291 125.301-157.169C404.572 65.715 363.282 0 269.272 0 175.274 0 133.963 65.71 143.97 153.029c8.125 70.878 39.123 157.175 125.302 157.169z' />
								<path d='M457.707 346.115c2.773 0 5.528.083 8.264.235-4.101-5.85-8.848-11.01-14.403-15.158-16.559-12.359-38.005-16.414-56.964-23.864-9.229-3.625-17.493-7.226-25.251-11.326-26.184 28.715-60.329 43.736-100.091 43.74-39.749 0-73.891-15.021-100.072-43.74-7.758 4.101-16.024 7.701-25.251 11.326-18.959 7.451-40.404 11.505-56.964 23.864-28.638 21.375-36.039 69.46-41.854 102.26-4.799 27.076-8.023 54.707-8.964 82.209-.729 21.303 9.789 24.29 27.611 30.721 22.315 8.048 45.356 14.023 68.552 18.921 44.797 9.46 90.973 16.729 136.95 17.054 22.278-.159 44.601-1.956 66.792-4.833-16.431-23.807-26.068-52.645-26.068-83.695.001-81.451 66.264-147.714 147.713-147.714z' />
								<path d='M457.707 375.658c-65.262 0-118.171 52.909-118.171 118.171S392.444 612 457.707 612s118.172-52.909 118.172-118.171c-.001-65.263-52.91-118.171-118.172-118.171zm51.7 138.445h-31.425v31.424c0 11.198-9.077 20.276-20.274 20.276-11.198 0-20.276-9.078-20.276-20.276v-31.424h-31.424c-11.198 0-20.276-9.077-20.276-20.276 0-11.198 9.077-20.276 20.276-20.276h31.424v-31.424c0-11.198 9.078-20.276 20.276-20.276s20.274 9.078 20.274 20.276v31.424h31.425c11.198 0 20.276 9.078 20.276 20.276-.001 11.2-9.077 20.276-20.276 20.276z' />
							</svg>
						</div>
						<h3 className='title'>Add new Contact</h3>
					</div>
				</li>
				{contacts.map((user) => (
					<ContactListItem key={user._id} data={user} />
				))}
			</ul>
		</>
	);
};

export default Index;
