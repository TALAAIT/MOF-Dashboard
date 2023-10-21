
<script lang="ts">
	import { page } from '$app/stores';

	// Skeleton Features
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';

  initializeStores();

  const drawerStore = getDrawerStore();
	// Local Features
  import Filter from '$lib/components/Filter.svelte';

	// Stylesheets
	import '$src/app.postcss';

	function drawerOpen(): void {
		drawerStore.open({});
	}

	// Reactive Properties
	$: classesSidebarLeft = $page.url.pathname === '/' ? 'w-0' : 'w-0 lg:w-64';
</script>

<Drawer>
<Filter />
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
    <button type="button" class="btn-icon" >
      Home
    </button>
    <button type="button" class="btn-icon" on:click={drawerOpen}>
      Filter
    </button>
    <button type="button" class="btn-icon ">
      List
    </button>
  </svelte:fragment>
</AppBar>

<slot />
</AppShell>
<style>
</style>
