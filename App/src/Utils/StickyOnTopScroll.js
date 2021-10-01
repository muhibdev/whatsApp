const useStickyOnTopScroll = (ref, className = 'sticky-active') => {
	let lastScrool = 0;
	window.addEventListener('scroll', () => {
		if (!ref.current) return;
		if (document.body.getBoundingClientRect().top > lastScrool) {
			ref.current.classList.add(className);
		} else {
			ref.current.classList.remove(className);
		}
		lastScrool = document.body.getBoundingClientRect().top;
	});
};

export default useStickyOnTopScroll;
