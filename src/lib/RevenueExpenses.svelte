<script lang="ts">
  import { LayerCake, Svg } from 'layercake';

  import Sankey from '$lib/Sankey.svelte';

  export let data;
  
</script>

<style>
	/*
		The wrapper div needs to have an explicit width and height in CSS.
		It can also be a flexbox child or CSS grid element.
		The point being it needs dimensions since the <LayerCake> element will
		expand to fill it.
	*/
  .chart-container {
    margin: 10px;
    display: flex;
    height: 85%;
  }
</style>

<div class="chart-container">
  <LayerCake
	  {data}
  >
    <Svg>
      <Sankey
				colorNodes={d => '#00bbff'}
        colorLinks={d => '#00bbff'}
			/>
    </Svg>
  </LayerCake>
</div>

