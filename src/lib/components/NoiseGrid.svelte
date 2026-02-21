<script lang="ts">
	import { onMount } from 'svelte';
	import { Tempus } from '$lib/animation/tempus';

	let gridEl: HTMLDivElement;
	let squares: HTMLDivElement[] = [];

	const size = 50; // mehr Blöcke für Noise
	let phase = 0;

	// Geschwindigkeit
	let speed = 0.03;
	let targetSpeed = 0.03;
	const normalSpeed = 0.03;
	const hoverSpeed = 0.005; // langsamer beim Hover
	let unsubscribe: (() => void) | undefined;

	const scale = 0.5; // Detailgrad des Noise

	onMount(() => {
		// Squares erstellen
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

				// Pseudo-Noise Wert
				const n = Math.sin(x * scale + phase) * Math.cos(y * scale + phase);

				const brightness = Math.floor((n + 1) * 127.5); // 0–255
				sq.style.backgroundColor = `rgb(${brightness},${brightness},${brightness})`;
			});
		});

		return () => unsubscribe?.();
	});
</script>

<div
	bind:this={gridEl}
	class="grid w-40 h-40 md:w-35 md:h-35 lg:w-50 lg:h-50 grid-cols-20 grid-rows-20"
	role="region"
	aria-label="2D Noise grid"
	on:mouseenter={() => (targetSpeed = hoverSpeed)}
	on:mouseleave={() => (targetSpeed = normalSpeed)}
></div>
