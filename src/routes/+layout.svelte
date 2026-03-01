<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { scrollProgress } from '$lib/stores/scroll';
	import Tempus from 'tempus';

	let { children } = $props();

	onMount(() => {
		const isMobile = window.innerWidth < 768;

		let rafId: number;
		let lenis: Lenis | null = null;

		/* ================================
		   MOBILE → Native Scroll
		================================ */
		if (isMobile) {
			const handleScroll = () => {
				const scrollTop = window.scrollY;
				const docHeight =
					document.documentElement.scrollHeight - window.innerHeight;

				const progress =
					docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

				scrollProgress.set(progress);
			};

			window.addEventListener('scroll', handleScroll, { passive: true });
			handleScroll(); // initial

			return () => {
				window.removeEventListener('scroll', handleScroll);
			};
		}

		/* ================================
		   DESKTOP → Lenis
		================================ */
		lenis = new Lenis({
			duration: 0.8,
			easing: (t: number) => 1 - Math.pow(1 - t, 4)
		});

		function raf(time: number) {
			lenis!.raf(time);

			const progress = Math.min(
				(lenis!.scroll / lenis!.limit) * 100,
				100
			);

			scrollProgress.set(progress);

			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		// optional global
		// @ts-ignore
		window.lenis = lenis;

		/* ================================
		   Tempus nur einmal global
		================================ */
		if (!(window as any).__tempus_started) {
			(window as any).__tempus_started = true;
			Tempus.restart();
		}

		return () => {
			cancelAnimationFrame(rafId);
			lenis?.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
