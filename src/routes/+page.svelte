<script lang="ts">
	import '@carbon/charts-svelte/styles.css'
	import { AlluvialChart } from '@carbon/charts-svelte'
  export let data;
</script>


<AlluvialChart
  data = {data.data}
  options = {data.options}
  />
<style>
</style>
