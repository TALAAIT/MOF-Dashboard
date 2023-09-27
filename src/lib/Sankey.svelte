<!--
	@component
	Generates an SVG Sankey chart using [d3-sankey](https://github.com/d3/d3-sankey).
 -->
<script>
	import { getContext } from 'svelte';
	import * as Sankey from 'd3-sankey';
    import { style } from 'd3';
	const { data, width, height } = getContext('LayerCake');

  const formatter = Intl.NumberFormat('ar', {notation : 'compact'}); 
	/** @type {Function} [colorLinks=d => 'rgba(0, 0, 0)'] – A function to return a color for the links. */
	export let colorLinks = d => 'rgba(0, 0, 0, .2)';

	/** @type {Function} [colorNodes=d => '#333'] – A function to return a color for each node. */
	export let colorNodes = d => '#333';

	/** @type {Function} [colorText=d => '#263238'] – A function to return a color for each text label. */
	export let colorText = d => '#263238';

	/** @type {Number} [nodeWidth=5] – The width of each node, in pixels, passed to [`sankey.nodeWidth`](https://github.com/d3/d3-sankey#sankey_nodeWidth). */
	export let nodeWidth = 30;

	/** @type {Number} [nodePadding=10] – The padding between nodes, passed to [`sankey.nodePadding`](https://github.com/d3/d3-sankey#sankey_nodePadding). */
	export let nodePadding = 10;

	/** @type {Function} [linkSort=null] – How to sort the links, passed to [`sankey.linkSort`](https://github.com/d3/d3-sankey#sankey_linkSort). */
	export let linkSort = null;

	/** @type {Function} [nodeId=d => d.id] – The ID field accessor, passed to [`sankey.nodeId`](https://github.com/d3/d3-sankey#sankey_nodeId). */
	export let nodeId = d => d.id;

	/** @type {Function} [nodeAlign=d3.sankeyLeft] – An alignment function to position the Sankey blocks. See the [d3-sankey documentation](https://github.com/d3/d3-sankey#alignments) for more. */
	export let nodeAlign = Sankey.sankeyLeft;

  let hovering = false;

	$: sankey = Sankey.sankey()
		.nodeAlign(nodeAlign)
		.nodeWidth(nodeWidth)
		.nodePadding(nodePadding)
		.nodeId(nodeId)
		.size([$width, $height])
		.linkSort(linkSort);

	$: sankeyData = sankey($data);

	$: link = Sankey.sankeyLinkHorizontal();

	$: fontSize = $width <= 320 ? 8 : 12;


  $: nodePadding = fontSize * 3
</script>


<g class="sankey-layer">
	<g class='link-group'>
		{#each sankeyData.links as d}
			<path
				d={link(d)}
        fill="none"
				stroke={colorLinks(d)}
				stroke-width={d.width} 
        />
		{/each}
	</g>
	<g class='rect-group'>
		{#each sankeyData.nodes as d, i}
		{console.log(d)}
			<rect
				x={d.x0}
				y={d.y0}
				height={d.y1 - d.y0}
				width={d.x1 - d.x0}
				fill={colorNodes(d)} 
        on:click={() => {sankeyData = sankey(d.newData);}}
        />:
			<text
				x={d.x0 < $width / 4 ? d.x1: d.x0}
				y={(d.y1 + d.y0) / 2}
        dx = {d.x0 < $width / 4 ? d.id.length : -d.id.length } 
				dy="{(fontSize / 2) - 2}"
        direction="rtl"
				style="fill: {colorText(d)};
							font-size: {fontSize}px;
							text-anchor: {d.x0 < $width / 4 ? 'end' : 'start'};">
				<tspan> {d.id}  </tspan>
        <tspan 
				x={d.x0 < $width / 4 ? d.x1: d.x0}
        y={(d.y1 + d.y0)/ 2 + fontSize * 1.5 }
        dx = {d.x0 < $width / 4 ? d.id.length : -d.id.length } 
        > {formatter.format(d.value)} </tspan>
			</text>
		{/each}
	</g>
</g>

<style>
	text {
		pointer-events: none;
    
	}
  rect {
    fill-opacity: 0.8;
  }
  rect:hover {
    fill-opacity: 1;
  }
  path {
    stroke-opacity: 0.2;
  }
  path:hover {
    stroke-opacity: 0.4;
  }
</style>
