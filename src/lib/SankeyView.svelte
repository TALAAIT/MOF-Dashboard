<script lang="ts">
  import { LayerCake, Svg } from 'layercake';
  import {rootNode, startDate} from '$lib/stores';
  import {PrismaClient} from '@prisma/client/edge'
  import type {TableName} from '$lib/prisma';

  import Sankey from '$lib/components/Sankey.svelte';
  import { sankey, sankeyRight } from 'd3-sankey';

  export let data;

  const prisma = new PrismaClient();

  function nextNode(name : string) : void {
  }
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
