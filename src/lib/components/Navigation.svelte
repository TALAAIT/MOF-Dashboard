<script lang="ts">
  import NestedAccordion from "./NestedAccordion.svelte";
  export let data;
</script>

<NestedAccordion {data} root='category' />
<style>
</style>
