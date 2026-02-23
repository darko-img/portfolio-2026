<script lang="ts">
  import { onMount } from 'svelte';

  let canvasEl: HTMLCanvasElement;
  let rive: any;
  let isSmall = false;

  const updateSize = () => {
    isSmall = window.innerWidth <= 375;
    rive?.resizeDrawingSurfaceToCanvas(); // Canvas wird angepasst
  };

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

    updateSize();
    window.addEventListener("resize", updateSize);
  });
</script>

<canvas
  bind:this={canvasEl}
  class={isSmall ? "w-[580px] h-[580px]" : "w-[750px] h-[750px]"}
></canvas>
