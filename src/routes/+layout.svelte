<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.png';
	import { onMount, onDestroy, tick } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Lenis from 'lenis';
	import { scrollProgress } from '$lib/stores/scroll';
	import Tempus from 'tempus';

	let { children } = $props();

	let lenis: Lenis;
	let rafId: number;
	let displayedProgress = 0;

	function startRAF() {
		function raf(time: number) {
			lenis.raf(time);

			const target = Math.min(
				(lenis.scroll / lenis.limit) * 100,
				100
			);

			const diff = target - displayedProgress;

			if (Math.abs(diff) > 0.05) {
				displayedProgress += diff * 0.2;
				scrollProgress.set(displayedProgress);
			} else if (Math.abs(diff) > 0.001) {
				displayedProgress = target;
				scrollProgress.set(displayedProgress);
			}

			rafId = requestAnimationFrame(raf);
		}

		rafId = requestAnimationFrame(raf);
	}

	onMount(() => {
		if (!browser) return; // 💥 SSR-Schutz

		lenis = new Lenis({
			duration: 0.8,
			easing: (t: number) => 1 - Math.pow(1 - t, 4),
			autoResize: true
		});

		startRAF();

		afterNavigate(async () => {
			await tick();
			lenis.resize();
		});

		// @ts-ignore
		window.lenis = lenis;

		if (!(window as any).__tempus_started) {
			(window as any).__tempus_started = true;
			Tempus.restart();
		}
	});

	onDestroy(() => {
		// 💥 SSR-Schutz auch hier
		if (!browser) return;

		cancelAnimationFrame(rafId);
		lenis?.destroy();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
