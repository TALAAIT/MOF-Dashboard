
<script lang="ts">
	import { page } from '$app/stores';

  import type { PageData } from '../$types';
	
  // Skeleton Features
	import { AppShell, AppBar, type DrawerSettings } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';

	// Local Features
  import Filter from '$lib/components/Filter.svelte';
  import Navigation from '$src/lib/components/Navigation.svelte';
	
  // Stylesheets
	import '$src/app.postcss';
    import { goto } from '$app/navigation';

  initializeStores();
  const drawerStore = getDrawerStore();

  const filterSettings : DrawerSettings = { id : 'filter' };
  const navigationSettings : DrawerSettings = { id : 'navigation' };


	function drawerOpen(settings : DrawerSettings) {
		return (() => drawerStore.open(settings));
	}
  export let data;


</script>

<Drawer>
  {#if $drawerStore.id === "filter"}  
    <Filter />
  {:else if $drawerStore.id === "navigation"}
    <Navigation data={data.accordionList} />
  {/if}
</Drawer>



<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
<AppBar> 
	<svelte:fragment slot="lead">
    <button type="button" class="btn-icon ">
      Button
    </button>
  </svelte:fragment>
	{$page.data.title}
	<svelte:fragment slot="trail">
    <button type="button" class="btn-icon" on:click={() => goto('/category')}>
      Home
    </button>
    <button type="button" class="btn-icon" on:click={drawerOpen(filterSettings)}>
      Filter
    </button>
    <button type="button" class="btn-icon " on:click={drawerOpen(navigationSettings)}>
      List
    </button>
  </svelte:fragment>
</AppBar>

<slot />
</AppShell>
<style>
</style>
