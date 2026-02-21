export function lazyVideo(node: HTMLVideoElement, src: string) {
	let hasLoaded = false;

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					if (!hasLoaded) {
						node.src = src;
						hasLoaded = true;
					}
					node.play().catch(() => {});
				} else {
					node.pause();
				}
			});
		},
		{ threshold: 0.4 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
