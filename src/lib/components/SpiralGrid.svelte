<script lang="ts">
	import { onMount } from 'svelte';
	import { Tempus } from '$lib/animation/tempus';

	let gridEl: HTMLDivElement;
	let squares: HTMLDivElement[] = [];

	const size = 10;
	const center = (size - 1) / 2;
	let phase = 0;
	let speed = 0.003;        // aktuelle Geschwindigkeit
	let targetSpeed = 0.003;  // Zielgeschwindigkeit für easing
	const normalSpeed = 0.003;
	const hoverSpeed = 0.009; // Slow-Mo beim Hover
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

				const dx = x - center;
				const dy = y - center;
				const r = Math.sqrt(dx * dx + dy * dy);        // Radius
				const theta = Math.atan2(dy, dx);             // Winkel

				// Spiralform: Phase + Radius - Winkel
				const value = Math.sin(phase + r - theta);

				const brightness = Math.floor((value + 1) * 127.5); // 0–255
				sq.style.backgroundColor = `rgb(${brightness},${brightness},${brightness})`;
			});
		});

		return () => unsubscribe?.();
	});
</script>

<!-- <div
	bind:this={gridEl}
	class="grid w-40 h-40 md:w-35 md:h-35 lg:w-50 lg:h-50 grid-cols-10 grid-rows-10"
	role="region"
	aria-label="Spiral Grid"
	on:mouseenter={() => (targetSpeed = hoverSpeed)}
	on:mouseleave={() => (targetSpeed = normalSpeed)}
></div> -->

<div
	bind:this={gridEl}
	class="grid w-7 h-7 grid-cols-10 grid-rows-10"
	role="region"
	aria-label="Spiral Grid"
	on:mouseenter={() => (targetSpeed = hoverSpeed)}
	on:mouseleave={() => (targetSpeed = normalSpeed)}
></div>
