import CallListItem from '../../Components/CallListItem';

import './index.scss';

const call = {
	user: {
		name: 'Muhib',
		username: 'muhib-21',
		img: 'https://google-ui-muhibdev.netlify.app/assets/profile.jpg',
		about: 'I am a software developer',
		'last-seen': 'online' | 'today at 6:11am',
	},
	type: 'call',
	call: {
		time: Date.now(),
		direction: 'outgoing',
		error: 'missed',
	},
};

const Calls = Array.from({ length: 50 }, () => call);

const CallsList = () => {
	return (
		<ul id='calls'>
			{Calls.map((call) => (
				<CallListItem data={call} />
			))}
		</ul>
	);
};

export default CallsList;
