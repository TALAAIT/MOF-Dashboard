<script>
  import { LayerCake, ScaledSvg, Html } from 'layercake';
  import { scaleBand } from 'd3-scale';

  import Bar from '$lib/components/Bar.svelte';
  import AxisX from '$lib/components/AxisX.html.svelte';
  import AxisY from '$lib/components/AxisY.html.svelte';
  import { hoverData } from '$lib/stores';
    import Tooltip from './components/Tooltip.svelte';
  
  export let data;

  console.log({data});
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
    height: 250px;
  }
</style>

<div class="chart-container m-10"
  on:mouseleave={()=>hoverData.set(null)}>
  <LayerCake
    ssr={true}
    percentRange={true}
    x='value'
    y='month'
    yScale={scaleBand().paddingInner(0.05).round(true)}
    yDomain={data.map(d => d.month)}
    xDomain={[0, null]}
    data={data}
  >
    <Html>
      <AxisX
        gridlines={true}
        baseline={true}
        snapTicks={true}
      />
      <AxisY gridlines={false}/>
    </Html>
    <ScaledSvg>
      <Bar/>
    </ScaledSvg>
  </LayerCake>
</div>
{#if $hoverData}
  <Tooltip data={$hoverData} />
{/if}
