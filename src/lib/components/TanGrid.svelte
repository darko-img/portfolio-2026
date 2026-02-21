<script lang="ts">
	import { onMount } from 'svelte';
	import { Tempus } from '$lib/animation/tempus';

	let gridEl: HTMLDivElement;
	let squares: HTMLDivElement[] = [];

	const size = 10;
	const center = { x: 4.5, y: 4.5 };
	let phase = 0;

	// Geschwindigkeit
	let speed = 0.003;           // aktuelle Geschwindigkeit
	let targetSpeed = 0.003;     // Zielgeschwindigkeit für easing
	const normalSpeed = 0.003;   // Normalgeschwindigkeit
	const slowmoSpeed = 0.0005;  // Slow-Mo beim Hover

	let unsubscribe: (() => void) | undefined;

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
			// Smooth easing: Geschwindigkeit anpassen
			speed += (targetSpeed - speed) * 0.1;

			phase += speed * deltaTime;

			squares.forEach((sq) => {
				const x = Number(sq.dataset.x) - center.x;
				const y = Number(sq.dataset.y) - center.y;

				let value = Math.tan((x + y) * 0.5 + phase);
				if (value > 3) value = 3;
				if (value < -3) value = -3;

				const normalized = (value + 3) / 6;
				const brightness = Math.floor(normalized * 255);

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
	aria-label="Animated tan grid"
	on:mouseenter={() => (targetSpeed = slowmoSpeed)}
	on:mouseleave={() => (targetSpeed = normalSpeed)}
></div>
