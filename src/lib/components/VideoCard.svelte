<script lang="ts">
	import type { Video } from '$lib/data/videos';
	import { lazyVideo } from '$lib/actions/lazyVideo';

	export let video: Video;

	let isLoaded = false;
</script>

<div class="relative overflow-hidden">
	{#if video.previewUrl && video.videoUrl}
		<a href={video.videoUrl} target="_blank" rel="noopener noreferrer" class="block cursor-pointer">
			{#if !isLoaded}
				<div class="absolute inset-0 animate-pulse bg-gray-200"></div>
			{/if}

			<video
				use:lazyVideo={video.previewUrl}
				class="h-100 w-full object-cover transition-opacity duration-500"
				class:opacity-0={!isLoaded}
				class:opacity-100={isLoaded}
				muted
				loop
				playsinline
				preload="none"
				on:loadeddata={() => (isLoaded = true)}
			>
			</video>
		</a>
	{:else}
		<div class="flex h-100 w-full animate-pulse items-center justify-center bg-gray-200"></div>
	{/if}
</div>
