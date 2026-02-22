<script lang="ts">
	import { videos } from '$lib/data/videos';
	import { scrollProgress } from '$lib/stores/scroll';
	import { onMount } from 'svelte';

	import VideoCard from '$lib/components/VideoCard.svelte';

	import ArrowSwap from '$lib/components/ArrowSwap.svelte';

	import RadioGrid from '$lib/components/RadioGrid.svelte';
	import SineGrid from '$lib/components/SineGrid.svelte';
	import RandomGrid from '$lib/components/RandomGrid.svelte';

	import RiveBackground from '$lib/components/RiveBackground.svelte';
	import RiveAuge from '$lib/components/RiveAuge.svelte';

	import CasinoText from '$lib/components/CasinoText.svelte';

	import DarekGif from '$lib/components/DarekGif.svelte';

	const frames = [
		'/images/darek-1.jpg',
		'/images/darek-2.jpg',
		'/images/darek-3.jpg',
		'/images/darek-4.jpg',
		'/images/darek-5.jpg'
	];

	const links = [
		{ label: 'github', href: 'https://github.com/darko-img' },
		{ label: 'instagram', href: 'https://www.instagram.com/91daro' },
		{ label: 'linkedin', href: 'https://www.linkedin.com/in/darekimg/' }
	];

	let berlinTime = '';

	function updateBerlinTime() {
		berlinTime = new Date()
			.toLocaleString('de-DE', {
				timeZone: 'Europe/Berlin',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			})
			.toUpperCase();
	}

	onMount(() => {
		updateBerlinTime();
		const interval = setInterval(updateBerlinTime, 1000);

		return () => clearInterval(interval);
	});
</script>

<!-- Partikel -->
<!-- Partikel -->
<!-- Partikel -->
<div class="fixed inset-0 max-w-full">
	<div class="pointer-events-none z-0 group-hover:pointer-events-auto lg:pointer-events-auto">
		<RiveBackground />
	</div>
</div>

<section id="start"></section>

<header id="header" class="sticky top-0 z-100 w-full bg-[var(--color-bg)] px-1 py-1">
	<div class="mx-auto flex max-w-full items-center justify-between">
		<div class="h-5 w-16 overflow-hidden bg-gray-200">
			<div
				class="h-full origin-left bg-[var(--color-progress)] transition-transform duration-200 ease-linear"
				style="transform: scaleX({$scrollProgress / 100})"
			></div>
		</div>

		<nav class="flex gap-3 text-lg uppercase">
      <a href="#start" class="px-2">Start</a>
			<a href="#galerie" class="px-2">Galerie</a>
			<a href="#info" class="px-2">Info</a>
		</nav>
	</div>
</header>

<section id="wrapper">

	<section
		id="intro"
		class="pointer-events-none flex h-screen max-w-full justify-center px-4 py-5 lg:pointer-events-auto"
	>
		<div class="z-0">
			<RiveAuge />
		</div>

		<p
			class="pointer-events-none absolute right-0 bottom-0 z-90 px-4 py-5 text-right text-base leading-none uppercase"
		>
			<CasinoText text="willkommen" />
		</p>
	</section>

	<!-- galerie -->
	<!-- galerie -->
	<!-- galerie -->
	<section id="galerie" class="mx-auto max-w-full px-4 py-5">
		<!-- galerie title -->
		<p class="mt-5 max-w-5xl text-sm uppercase">[output 2017–25]</p>
		<!-- galerie kategorien -->
		<div class="mt-1 max-w-5xl uppercase">
			<ul class="inline-flex list-none gap-1 text-sm uppercase">
				<li>[motion design]</li>
				<li>[sound design]</li>
				<li>[3d]</li>
			</ul>
		</div>

		<!-- video loop -->
		<div class="z-3 mt-1 grid cursor-pointer gap-1 sm:grid-cols-2 lg:grid-cols-3">
			{#each videos as video, i}
				<div class={i >= 9 ? 'hidden sm:block' : ''}>
					<VideoCard {video} />
				</div>
			{/each}
		</div>
	</section>

	<!-- info -->
	<!-- info -->
	<!-- info -->
	<section id="info" class="mx-auto max-w-full px-4 py-5">
		<p class="mt-5 max-w-5xl text-sm uppercase">[info]</p>
		<!-- info hero text -->
		<p class="pointer-events-none max-w-5xl text-2xl uppercase md:text-5xl lg:text-7xl">
			An der Schnittstelle von Design und Technologie, erstelle ich dynamische Komponenten für die
			digitale Welt.
		</p>

		<!-- info grid -->
		<div class="mx-auto mt-10 max-w-full text-justify md:mt-20 lg:mt-25">
			<div class="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-20 lg:grid-cols-3 lg:gap-30">
				<div class="spacer flex flex-col items-center gap-5 text-sm">
					<div class="pointer-events-none z-3 cursor-pointer lg:pointer-events-auto">
						<RandomGrid />
					</div>
					<p class="text-center">[ID]<br />Dariusz Tomaszewski</p>
				</div>

				<div class="spacer flex flex-col items-center gap-5 text-sm">
					<div class="pointer-events-none z-3 cursor-pointer lg:pointer-events-auto">
						<SineGrid />
					</div>
					<p class="text-center">
						[DNS]<br />Grafikdesigner mit Fokus auf<br />Motion- und Web Design.
					</p>
				</div>

				<div class="spacer flex flex-col items-center gap-5 text-sm">
					<div class="pointer-events-none z-3 cursor-pointer lg:pointer-events-auto">
						<RadioGrid />
					</div>
					<p class="text-center">[POSITION]<br />52.5343°N, 13.2002°E<br />(Berlin, Germany)</p>
				</div>
			</div>
		</div>

		<!-- === kontakt ===  -->
		<!-- === kontakt ===  -->
		<!-- === kontakt ===  -->
		<div class="mt-20 max-w-full md:mt-15 lg:mt-35">
			<div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3 md:gap-0 lg:grid-cols-3 lg:gap-0">
				<div class="max-w-5xl">
					<ul class="list-none space-y-1 text-3xl md:text-2xl lg:text-3xl">
						<li class="pointer-events-none flex items-center text-[var(--color-off)]">
							Hallo Welt 👾
						</li>
						<li class="flex items-center">
							<a href="mailto:hi@daro.dev" class="group z-3 flex items-center">
								<span>hi@daro.dev</span>
								<ArrowSwap />
							</a>
						</li>
					</ul>
				</div>

				<div class="pointer-events-none h-[55px]">
					<DarekGif {frames} frameDuration={120} />
				</div>

				<!-- contact -->
				<!-- contact -->
				<!-- contact -->
				<div class="flex max-w-5xl">
					<ul class="z-3 max-w-5xl space-y-1">
						{#each links as link}
							<li>
								<a
									href={link.href}
									target="_blank"
									rel="noopener noreferrer"
									class="group flex inline-flex cursor-pointer items-center text-3xl md:text-2xl lg:text-3xl"
								>
									<span>{link.label}</span>
									<ArrowSwap />
								</a>
							</li>
						{/each}
					</ul>
				</div>

				<div class="spacer"></div>
			</div>
		</div>

		<p class="mx-auto mt-5 mb-10 max-w-sm text-center text-xs md:mt-15 md:max-w-xl lg:mt-20">
			Für generelle Anfragen – oder wenn du wissen willst, wo es den besten Burger in Berlin gibt –
			bin ich jederzeit per <span>
				<a
					href="mailto:hi@daro.dev"
					class="relative z-3 cursor-pointer underline underline-offset-2">E-mail</a
				>
			</span> erreichbar.
		</p>

		<footer class="mx-auto flex max-w-full items-center justify-between uppercase">
			<a href="#start" class="z-3 text-xs uppercase">nach oben</a>
			<div class="pointer-events-none text-xs uppercase">
				{berlinTime} CET
			</div>
		</footer>
	</section>

</section>

<style>
</style>
