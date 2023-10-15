<script lang="ts">

</script>

<style>
  /*
    The wrapper div needs to have an explicit width and height in CSS.
    It can also be a flexbox child or CSS grid element.
    The point being it needs dimensions since the <LayerCake> element will
    expand to fill it.
  */
  .chart-container {
    width: 100%;
    height: 700px;
  }
</style>

<div class="chart-container">
  <LayerCake
    debug={true}
    data={data}
  >
    <Svg>
      <Sankey
        colorNodes={d => '#18AAB4'}
        colorLinks={d => '#15C67A'}
        colorText={d => '#05747E'}
      />
    </Svg>
  </LayerCake>
</div>
<script lang="ts">
  import { getContext } from 'svelte';
  import * as Sankey from 'd3-sankey';
  import Text from "$lib/components/Text.svelte";
  import { LayerCake, Svg } from 'layercake';
  import Sankey from '$lib/components/Sankey.svelte';
  import { sankey, sankeyRight } from 'd3-sankey';

  export let data;
  const { data, width, height } = getContext('LayerCake');
  


  /** @type {Function} [colorNodes=d => '#333'] - A function to return a color for each node. */
  export let colorNodes = d => '#333';

  /** @type {Function} [colorText=d => '#263238'] - A function to return a color for each text label. */
  export let colorText = d => '#263238';

  export let nodeCallback = () => console.log('node pressed');
  export let linkCallback = () => console.log('link pressed');
  export let textCallback = () => console.log('text pressed');

  /** @type {Number} [nodeWidth=5] - The width of each node, in pixels, passed to [`sankey.nodeWidth`](https://github.com/d3/d3-sankey#sankey_nodeWidth). */
  export let nodeWidth : number = 25;

  /** @type {Number} [nodePadding=10] - The padding between nodes, passed to [`sankey.nodePadding`](https://github.com/d3/d3-sankey#sankey_nodePadding). */
  export let nodePadding : number = 25;

  export let textPadding : number = 5;

  /** @type {Function} [nodeId=d => d.id] - The ID field accessor, passed to [`sankey.nodeId`](https://github.com/d3/d3-sankey#sankey_nodeId). */
  export let nodeId = d => d.id;

  export let locale = "ar"  

  /** @type {Function} [nodeAlign=d3.sankeyLeft] - An alignment function to position the Sankey blocks. See the [d3-sankey documentation](https://github.com/d3/d3-sankey#alignments) for more. */
  export let nodeAlign = Sankey.sankeyLeft;

  const formatter = Intl.NumberFormat(locale, {notation: "compact"});


  $: sankey = Sankey.sankey()
    .nodeAlign(nodeAlign)
    .nodeWidth(nodeWidth)
    .nodePadding(nodePadding)
    .nodeId(nodeId)
    .size([$width, $height])

  $: sankeyData = sankey($data);


  $: fontSize = $width <= 320 ? 8 : 12;
</script>


<g class="sankey-layer">
  <g class='rect-group'>
    {#each sankeyData.nodes as d, i}
      <rect
        x={d.x0 < $width / 2 ? d.x0 + 3 : d.x0 - 3}
        y={d.y0 - 10/2}
        rx = 10
        height={d.y1 - d.y0 > 15 ? d.y1 - d.y0 + 10 : 20}
        width={d.x1 - d.x0}
        fill={colorNodes(d)}
        on:click={nodeCallback()}
        />
       <Text  x={d.x0 < $width / 4 ? d.x1 + textPadding: d.x0 - textPadding }
              y={(d.y1 + d.y0) / 2}
              {fontSize}
              fillColor={colorText(d)}
              width={$width}
              text={[d.id, formatter.format(d.value)]}
              />
    {/each}
  </g>
</g>

<style>
  path {
    stroke-opacity: 0.4;
  }
  path:hover {
    stroke-opacity: 0.2;
  }
  rect:hover {
    fill-opacity: 0.6;
  }
</style>
