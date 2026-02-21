<script lang="ts">
	import { onMount } from 'svelte';
	import { Tempus } from '$lib/animation/tempus';

	let gridEl: HTMLDivElement;
	let squares: HTMLDivElement[] = [];

	const size = 10;

	// Geschwindigkeit
	let speed = 0.003;         // aktuelle Geschwindigkeit
	let targetSpeed = 0.003;   // Zielgeschwindigkeit für easing
	const normalSpeed = 0.003;
	const hoverSpeed = 0.03;   // schneller beim Hover
	let unsubscribe: (() => void) | undefined;

	// 5 Helligkeitsstufen
	const levels = [30, 90, 150, 200, 255];

	onMount(() => {
		// Squares erstellen
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				const square = document.createElement('div');
				square.className = 'w-full h-full';
				gridEl.appendChild(square);
				squares.push(square);
			}
		}

		// Tempus Loop
		unsubscribe = Tempus.add((_: number, deltaTime: number) => {
			// Smooth easing: Geschwindigkeit anpassen
			speed += (targetSpeed - speed) * 0.1;

			const factor = deltaTime * speed;
			squares.forEach((sq) => {
				if (Math.random() < factor) {
					// Zufällige Helligkeitsstufe wählen
					const brightness = levels[Math.floor(Math.random() * levels.length)];
					sq.style.backgroundColor = `rgb(${brightness},${brightness},${brightness})`;
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
	aria-label="Random grid"
	on:mouseenter={() => (targetSpeed = hoverSpeed)}
	on:mouseleave={() => (targetSpeed = normalSpeed)}
></div>
