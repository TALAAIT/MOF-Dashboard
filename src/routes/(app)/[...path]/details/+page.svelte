<script lang="ts">
    import Chart from "$src/lib/Chart.svelte";
    export let data;
</script>
<div class="visuals">
<Chart data={data.data} />
</div>
<style>
  .visuals {
    height: 100%;
  }
</style>
