<script lang="ts">
  import { onMount } from 'svelte';
  import { Rive } from '@rive-app/canvas';

  export let src: string;
  export let autoplay: boolean = true;
  let canvasElement: HTMLCanvasElement;

  let rive: Rive | null = null;

  onMount(() => {
    rive = new Rive({
      src,
      canvas: canvasElement,
      autoplay,
    });

    return () => {
      rive?.stop(); // sicher prüfen, ob rive != null
    };
  });
</script>

<canvas bind:this={canvasElement}></canvas>

<style>
  canvas {
    width: 100%;
    height: auto;
  }
</style>
