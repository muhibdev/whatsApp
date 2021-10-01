import './index.scss';

const index = () => {
	return (
		<div className='security-msg'>
			<svg width='10' height='12'>
				<path
					d='M5.008 1.6a2.593 2.593 0 012.586 2.427l.005.164v1.271h.158c.585 0 1.059.48 1.059 1.07v3.351c0 .59-.474 1.07-1.059 1.07h-5.5c-.582 0-1.057-.48-1.057-1.07V6.531c0-.59.474-1.069 1.058-1.069h.158V4.191a2.594 2.594 0 012.429-2.586l.163-.005zm0 1.248c-.696 0-1.272.534-1.337 1.214l-.006.129-.002 1.271H6.35l.001-1.271c0-.653-.47-1.2-1.088-1.319l-.126-.018-.129-.006z'
					fill='currentColor'
				/>
			</svg>
			Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen to them.
			Click to learn more.
		</div>
	);
};

export default index;
