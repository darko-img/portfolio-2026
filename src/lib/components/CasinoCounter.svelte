<script lang="ts">
  import { onMount } from "svelte";
  import { Tempus } from '$lib/animation/tempus'; // dein Ticker

  export let value: number = 0;       // aktuelle Zahl vom Firebase
  export let delayStep: number = 75;  // Verzögerung pro Ziffer
  export let duration: number = 800;  // Dauer der Animation
  export let pause: number = 300;     // Pause zwischen Loops

  let digits: string[] = [];
  let progress: number[] = [];

  function bounceEase(p: number) {
    return p < 0.5
      ? 4 * p * p * p
      : 1 - Math.pow(-2 * p + 2, 3) / 2;
  }

  $: digits = String(value).split("");      // reactive update
  $: progress = digits.map(() => 0);

  let lastValue = value;

  onMount(() => {
    Tempus.add((t: number) => {
      if (lastValue === value) return; // nur animieren, wenn sich Wert ändert
      lastValue = value;

      const cycle = duration + pause;
      digits.forEach((_, i) => {
        const timeOffset = (t + i * delayStep) % cycle;
        progress[i] = timeOffset <= duration ? timeOffset / duration : 0;
      });
    });
  });
</script>

<span class="inline-flex overflow-hidden text-lg">
  {#each digits as digit, i}
    <span class="relative inline-block overflow-hidden" style="width: 0.7em; height: 1em;">

      <!-- aktuelle Ziffer -->
      <span
        class="absolute inset-0 flex items-center justify-center"
        style="transform: translateY({-bounceEase(progress[i]) * 100}%); transition: transform 0s;"
      >
        {digit}
      </span>

      <!-- von unten rein -->
      <span
        class="absolute inset-0 flex items-center justify-center"
        style="transform: translateY({100 - bounceEase(progress[i]) * 100}%); transition: transform 0s;"
      >
        {digit}
      </span>

    </span>
  {/each}
</span>
