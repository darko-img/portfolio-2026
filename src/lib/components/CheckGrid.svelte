<script lang="ts">
	import { onMount } from 'svelte';
	import { Tempus } from '$lib/animation/tempus';

	let gridEl: HTMLDivElement;
	let squares: HTMLDivElement[] = [];

	const size = 10;
	let phase = 0;

	// Geschwindigkeit
	let speed = 0.003;          // aktuelle Geschwindigkeit
	let targetSpeed = 0.003;    // Zielgeschwindigkeit für easing
	const normalSpeed = 0.003;
	const hoverSpeed = 0.001;  // langsamer beim Hover
	let unsubscribe: (() => void) | undefined;

	onMount(() => {
		// Grid squares erstellen
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				const square = document.createElement('div');
				square.dataset.x = String(x);
				square.dataset.y = String(y);
				square.className = 'w-full h-full';
				gridEl.appendChild(square);
				squares.push(square);
			}
		}

		// Tempus Loop
		unsubscribe = Tempus.add((_: number, deltaTime: number) => {
			// Smooth easing
			speed += (targetSpeed - speed) * 0.1;

			phase += speed * deltaTime;

			squares.forEach((sq) => {
				const x = Number(sq.dataset.x);
				const y = Number(sq.dataset.y);

				// Sinuswert für wackeln
				const value = Math.sin(phase + (x + y) * 0.5);
				const brightness = Math.floor((value + 1) * 127.5); // 0–255

				// Checkerboard Hell-Dunkel in grayscale
				if ((x + y) % 2 === 0) {
					sq.style.backgroundColor = `rgb(${brightness},${brightness},${brightness})`;
				} else {
					// leicht dunkler für das andere Feld
					const alt = Math.floor(brightness * 0.8);
					sq.style.backgroundColor = `rgb(${alt},${alt},${alt})`;
				}
			});
		});

		return () => unsubscribe?.();
	});
</script>

<div
	bind:this={gridEl}
	class="grid w-40 h-40 md:w-35 md:h-35 lg:w-50 lg:h-50 grid-cols-10 grid-rows-10"
	role="region"
	aria-label="Grayscale Checkerboard wackel grid"
	on:mouseenter={() => (targetSpeed = hoverSpeed)}
	on:mouseleave={() => (targetSpeed = normalSpeed)}
></div>
