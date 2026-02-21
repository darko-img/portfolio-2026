<script lang="ts">
  import { onMount } from "svelte";
  import { Tempus } from '$lib/animation/tempus'; // zentraler Ticker

  export let text: string = "";
  export let delayStep: number = 75;    // Verzögerung pro Buchstabe
  export let duration: number = 1000;   // Animationsdauer
  export let pause: number = 1500;      // Pause zwischen Loops

  let progress: number[] = [];

  function bounceEase(p: number) {
    return p < 0.5
      ? 4 * p * p * p
      : 1 - Math.pow(-2 * p + 2, 3) / 2;
  }

  onMount(() => {
    progress = text.split("").map(() => 0);

    Tempus.add((t: number) => {
      const cycle = duration + pause;

      text.split("").forEach((_, i) => {
        const timeOffset = (t + i * delayStep) % cycle;
        progress[i] = timeOffset <= duration ? timeOffset / duration : 0;
      });
    });
  });
</script>

<span class="inline-flex overflow-hidden">
  {#each text.split("") as letter, i}
    <span class="relative inline-block overflow-hidden" style="height: 1em; width: 0.65em;">

      <!-- sichtbar -->
      <span
        class="absolute inset-0 flex items-center justify-center"
        style="
          transform: translateY({-bounceEase(progress[i]) * 100}%);
          transition: transform 0s;
        "
      >
        {letter}
      </span>

      <!-- von unten rein -->
      <span
        class="absolute inset-0 flex items-center justify-center"
        style="
          transform: translateY({100 - bounceEase(progress[i]) * 100}%);
          transition: transform 0s;
        "
      >
        {letter}
      </span>

    </span>
  {/each}
</span>
