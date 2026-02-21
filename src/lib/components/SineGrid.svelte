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
	const hoverSpeed = 0.05;    // schneller beim Hover
	let unsubscribe: (() => void) | undefined;

	onMount(() => {
		// Squares erstellen
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				const square = document.createElement('div');
				square.dataset.x = String(x);
				square.className = 'w-full h-full';
				gridEl.appendChild(square);
				squares.push(square);
			}
		}

		// Tempus Loop
		unsubscribe = Tempus.add((_: number, deltaTime: number) => {
			// Smooth easing: Geschwindigkeit langsam anpassen
			speed += (targetSpeed - speed) * 0.1;

			phase += speed * deltaTime;

			squares.forEach((sq) => {
				const x = Number(sq.dataset.x);

				// Sinus-Helligkeit für mehr Kontrast
				const sineValue = Math.pow((Math.sin(phase + x * 0.6) + 1) / 2, 0.5);
				// ^0.5 → macht dunkle Bereiche dunkler, helle heller

				const brightness = Math.floor(sineValue * 255); // 0–255 für maximalen Kontrast

				sq.style.backgroundColor = `rgb(${brightness},${brightness},${brightness})`;
			});
		});

		return () => unsubscribe?.();
	});
</script>

<div
	bind:this={gridEl}
	class="grid w-40 h-40 md:w-35 md:h-35 lg:w-50 lg:h-50 grid-cols-10 grid-rows-10"
	role="region"
	aria-label="Sinus grid"
	on:mouseenter={() => (targetSpeed = hoverSpeed)}
	on:mouseleave={() => (targetSpeed = normalSpeed)}
></div>
