<script lang="ts">
  export let data : { month : number
                      value: number};
	let posY = 0;
  let posX = 0;
	
	function handleMouseMove(event) {
		requestAnimationFrame(()=> posY = event.pageY + event.movementY); 
		requestAnimationFrame(()=> posX = event.pageX + event.movementX); 
	}
</script>
<svelte:body  on:mousemove={handleMouseMove}></svelte:body>

<div class="tooltip pt-6 bg-white border-2 border-gray-950" style="position: absolute; 
  top: {posY}px; left:{posX}px">
<p dir="rtl">الشهر: {data.month}</p>
<p dir="rtl">القيمة: {data.value} دل</p>
</div>

