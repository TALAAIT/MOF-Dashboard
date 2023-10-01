<script lang="ts">
  export let text : Array<string> = [];
  export let x : number = 0;
  export let y : number = 0;
  export let fillColor : string = "#ffffff";
  export let width : number = 0;
  export let fontSize : number = 0;
  export let direction = "rtl";
  let textAnchor : string;
  if (direction === "rtl") {
    textAnchor =  x < width / 3 ? 'end' : 'start';
  } else {
    textAnchor =  x < width / 3 ? 'start' : 'end';    
  }
</script>

{#each text as t, i}
<text
    x={x}
    y={y + fontSize * i}
    style="fill: {fillColor};
         font-size: {fontSize}px;
         text-anchor: {textAnchor};
         "
    direction = {direction}
    >
   {t}
</text>
{/each}

