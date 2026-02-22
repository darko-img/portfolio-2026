<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Tempus } from '$lib/animation/tempus';

  export let frames: string[];
  export let frameDuration = 100;

  let currentFrame = 0;
  let lastTime = 0;

  let unsubscribe: (() => void) | undefined;

  const loop = (time: number) => {
    if (!lastTime) lastTime = time;

    const delta = time - lastTime;

    if (delta >= frameDuration) {
      currentFrame = (currentFrame + 1) % frames.length;
      lastTime = time;
    }
  };

  onMount(() => {
    unsubscribe = Tempus.add(loop);
  });

  onDestroy(() => {
    unsubscribe?.();
  });
</script>

<img src="{frames[currentFrame]}" alt="Animation" />
