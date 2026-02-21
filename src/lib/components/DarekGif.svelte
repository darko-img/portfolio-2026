<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { Tempus } from '$lib/animation/tempus';

  export let frames: string[];       // Array deiner Bilder
  export let frameDuration = 100;    // ms pro Frame

  let currentFrame = 0;
  let lastTime = 0;
  let active = true; // Flag, um Loop zu deaktivieren

  const loop = (time: number) => {
    if (!active) return; // stoppt Loop beim Destroy

    if (!lastTime) lastTime = time;
    const delta = time - lastTime;

    if (delta >= frameDuration) {
      currentFrame = (currentFrame + 1) % frames.length;
      lastTime = time;
    }
  };

  onMount(() => {
    Tempus.add(loop);

    // Cleanup beim Unmount
    onDestroy(() => {
      active = false;
    });
  });
</script>

<img src="{frames[currentFrame]}" alt="Animation" />
