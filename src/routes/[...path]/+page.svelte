<script lang="ts">
    import SankeyView from "$lib/SankeyView.svelte";
    export let data;
</script>
<main>
<SankeyView data={data.data} />
</main>
<style>
</style>
