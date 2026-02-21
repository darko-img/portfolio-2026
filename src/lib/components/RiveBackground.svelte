<script lang="ts">
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;
	let rive: any;

	onMount(async () => {
		const pkg = await import('@rive-app/canvas');
		const { Rive, Layout, Fit } = pkg;

		rive = new Rive({
			src: '/ClickMagic.riv',
			canvas: canvasEl,
			autoplay: true,
			artboard: 'ClickMagic',
			stateMachines: 'ClickMagic',
			layout: new Layout({
				fit: Fit.Contain,
			}),
			onLoad: () => {
				rive.resizeDrawingSurfaceToCanvas();
			}
		});
	});
</script>

<canvas bind:this={canvasEl} class="w-full h-full"></canvas>
