<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  export let text: string;
  export let delay = 0.05; // staggered initial animation

  const lines = text.split('\n');
  const finalStyle = 4; // am Ende soll jeder Buchstabe diesen Style haben

  // Buchstaben-Styles initialisieren
  let letterStyles: number[][] = lines.map(line =>
    Array.from(line).map(c => 1)
  );

  // Intervall-IDs speichern
  let intervals: ReturnType<typeof setTimeout>[][] = [];

  if (browser) {
    onMount(() => {
      lines.forEach((line, y) => {
        intervals[y] = [];
        Array.from(line).forEach((char, x) => {
          if (char !== ' ') {
            const offset = Math.random() * 500; // Startverzögerung
            intervals[y][x] = setTimeout(function glitch() {
              // Zufällig Style 1–3
              letterStyles[y][x] = 1 + Math.floor(Math.random() * 3);

              // Nächster Tick nach 20–100ms → sehr glitchy
              const nextDelay = 20 + Math.random() * 80;
              intervals[y][x] = setTimeout(glitch, nextDelay);
            }, offset);

            // End-Zustand nach 3 Sekunden → alle Buchstaben auf Style 4 setzen
            setTimeout(() => {
              clearTimeout(intervals[y][x]);
              letterStyles[y][x] = finalStyle;
            }, 3000 + Math.random() * 500); // kleine zufällige Variation
          }
        });
      });

      onDestroy(() => {
        intervals.forEach(row => row.forEach(i => clearTimeout(i)));
      });
    });
  }
</script>

<p class="pointer-events-none text-2xl uppercase md:text-5xl lg:text-7xl">
  {#each lines as line, y}
    {#each Array.from(line) as char, x}
      {#if char === ' '}
        <span>&nbsp;</span>
      {:else}
        <span
          class="inline-block letter {`text-style-${letterStyles[y][x]}`}"
          style="animation-delay: {x * delay}s"
        >{char}</span>
      {/if}
    {/each}
    <br />
  {/each}
</p>

<style>
  .letter {
    display: inline-block;
    transition: color 0.2s, background-color 0.2s, border-color 0.2s;
    padding: 0 3px;
    border-radius: 2px;
  }

  .text-style-1 { color: black; background-color: blue; border: 1px solid gray; }
  .text-style-2 { color: gray; background-color: black; border: 1px solid gray; }
  .text-style-3 { color: white; background-color: blue; border: 1px solid white; }
  .text-style-4 { color: black; background-color: white; border: 1px solid white; }
</style>
