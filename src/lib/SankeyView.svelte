<script lang="ts">
  import { LayerCake, Svg } from 'layercake';
  import Sankey from '$lib/components/Sankey.svelte';
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
    width: 100%;
    height: 600px;
  }
</style>

<div class="chart-container">
  <LayerCake
    debug={true}
    {data}
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
