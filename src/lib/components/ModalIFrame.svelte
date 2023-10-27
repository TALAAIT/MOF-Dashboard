<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;


	const modalStore = getModalStore();

  export let url = $modalStore[0].meta.url;

	// Base Classes
	const cBase = 'card p-4 w-modal h-modal shadow-xl space-y-4';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase} grid">
    <iframe src={url} title={url}>
    </iframe>
    <a href={url}><button>See More</button></a>
	</div>
{/if}
