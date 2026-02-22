<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { scrollProgress } from '$lib/stores/scroll';
	import Tempus from 'tempus';

	let { children } = $props();

	onMount(() => {
		// === Lenis Scroll (eigener RAF) ===
		const lenis = new Lenis({
			lerp: 0.08,
			wheelMultiplier: 1,
			touchMultiplier: 1
		});

		let rafId: number;

		function raf(time: number) {
			lenis.raf(time);

			// optional leicht throttlen
			const progress = Math.min((lenis.scroll / lenis.limit) * 100, 100);

			scrollProgress.set(progress);

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
