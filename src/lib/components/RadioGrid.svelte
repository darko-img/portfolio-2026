<script lang="ts">
	import { onMount } from 'svelte';
	import { Tempus } from '$lib/animation/tempus';

	let gridEl: HTMLDivElement;
	let squares: HTMLDivElement[] = [];

	const size = 10;
	const center = { x: 4.5, y: 4.5 };
	let phase = 0;
	let unsubscribe: (() => void) | undefined;

	// Geschwindigkeit
	let speed = 0.003;          // aktuelle Geschwindigkeit
	let targetSpeed = 0.003;    // Zielgeschwindigkeit für easing
	const normalSpeed = 0.003;  // normale Geschwindigkeit
	const hoverSpeed = 0.02;  // langsamer beim Hover (Slow-Mo)

	onMount(() => {
		// Squares erstellen
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				const square = document.createElement('div');
				const dist = Math.hypot(center.x - x, center.y - y);
				square.dataset.dist = String(dist);
				square.className = 'w-full h-full';
				gridEl.appendChild(square);
				squares.push(square);
			}
		}

		// Tempus Loop
		unsubscribe = Tempus.add((_: number, deltaTime: number) => {
			// Smooth easing der Geschwindigkeit
			speed += (targetSpeed - speed) * 0.1;

			phase += speed * deltaTime;

			squares.forEach((sq) => {
				const dist = Number(sq.dataset.dist);
				const brightness = Math.floor(127.5 * (1 + Math.sin(phase - dist)));
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
	aria-label="Radio animated grid"
	on:mouseenter={() => (targetSpeed = hoverSpeed)}
	on:mouseleave={() => (targetSpeed = normalSpeed)}
></div>
