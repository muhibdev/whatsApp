import { Link } from 'react-router-dom';
import './index.scss';

import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

const Index = ({ menuItems, children }) => {
	const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(menuItems.length);

	return (
		<div className='dropDown'>
			<button className='dropdown-btn' {...buttonProps}>
				{children}
			</button>
			<div className={`menu ${isOpen ? 'visible' : ''}`} role='menu'>
				{itemProps.map((item, i) => (
					<Link to={menuItems[i].link} {...item}>
						{menuItems[i].text}
					</Link>
				))}
			</div>
		</div>
	);
};

export default Index;
