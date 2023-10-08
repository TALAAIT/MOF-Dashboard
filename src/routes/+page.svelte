<script lang="ts">
  import RevenueExpenses from '$lib/RevenueExpenses.svelte';
  import HomePage from '$lib/HomePage.svelte';
  import Scrolly from '$lib/components/Scrolly.svelte';
  let views = [HomePage, RevenueExpenses]
  export let data;
  $: sankeyData = data.data;
</script>
<main>
<RevenueExpenses data={sankeyData} />
</main>
<style>
</style>
