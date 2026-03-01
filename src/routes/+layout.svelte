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

		const lenis = new Lenis({
			duration: isMobile ? 1.6 : 0.8,
			easing: (t: number) => 1 - Math.pow(1 - t, 4)
		});

		let rafId: number;

		function raf(time: number) {
			lenis.raf(time);

			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);

		// global verfügbar
		// @ts-ignore
		window.lenis = lenis;

		// === Tempus nur für Animationen ===
		if (!(window as any).__tempus_started) {
			(window as any).__tempus_started = true;
			Tempus.restart();
			console.log('Tempus restarted globally');
		}

		return () => {
			cancelAnimationFrame(rafId);
			lenis.destroy();
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
