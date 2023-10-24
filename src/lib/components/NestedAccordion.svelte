<script lang="ts">
  import { Accordion, AccordionItem, getDrawerStore} from '@skeletonlabs/skeleton';
  import { page } from '$app/stores';

  const drawerStore = getDrawerStore();

  type Item = {
    name : string
    type : string
    parent : string
  };
  let searchParams = $page.url.searchParams.toString();
  export let data : Item[];
  export let root : string;
  function getPath(target : string) : string {
    let  parentItem = data.filter(v => v.type === target);
    if (parentItem.length === 0) {
      return '/category';
    }
    let parent = parentItem[0].parent;
    return `${getPath(parent)}/${target}`;
  }
  console.log(data.map(d => d.type));
</script>

<Accordion disabled={!data.map(d => d.parent).includes(root)}>
  {#each data.filter(v => v.parent === root) as slot }
    <AccordionItem id={slot.type}>
      <svelte:fragment slot="summary">
        <a href={getPath(slot.type) + '?' + searchParams}
          on:click={drawerStore.close}>
          {slot.name}
        </a>
      </svelte:fragment>
      <svelte:fragment slot="content" >
        <svelte:self {data} root={slot.type} />
      </svelte:fragment>`
    </AccordionItem>
  {/each}
</Accordion>
<style>
</style>
