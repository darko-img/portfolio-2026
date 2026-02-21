<script lang="ts">
	import { onMount } from 'svelte';

	let canvasEl: HTMLCanvasElement;
	let rive: any;

	onMount(async () => {
		const pkg = await import('@rive-app/canvas');
		const { Rive, Layout, Fit, Alignment } = pkg;

		rive = new Rive({
			src: '/auge.riv',
			canvas: canvasEl,
			autoplay: true,
			artboard: 'auge',
			stateMachines: 'State Machine Auge',
			layout: new Layout({
				fit: Fit.Contain,
				alignment: Alignment.Center
			}),
			onLoad: () => {
				rive.resizeDrawingSurfaceToCanvas();
			}
		});
	});
</script>

<canvas bind:this={canvasEl} class="h-180 w-180"></canvas>
