import StatusListItem from '../../Components/StatusListItem';
import AddStatus from '../../Components/StatusListItem/AddStatus';

import './index.scss';

import { useShallowEqualSelector } from '../../Hooks/Redux';

const Index = () => {
	// const contacts = useShallowEqualSelector(({ contacts }) =>
	// 	contacts.contacts.filter((contact) => contact.status.length !== 0)
	// );

	return (
		<div id='status'>
			{/* <AddStatus />
			<p className='recent-updates divider'>Recent updates</p>
			{contacts.map((user) => (
				<StatusListItem key={user._id} data={user} />
			))}
			<p className='viewed-updates divider'>Viewed updates</p>
			{contacts.map((user) => (
				<StatusListItem key={user._id} data={user} />
			))}
			<p className='muted-updates divider'>
				<span>Muted updates</span>
				<span></span>
			</p>
			{contacts.map((user) => (
				<StatusListItem key={user._id} data={user} />
			))} */}
		</div>
	);
};

export default Index;
