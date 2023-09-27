<!--
<script lang="ts" >
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
  import data from "$lib/assets/data.json";

  type Keys = keyof typeof data;

   

  const y_max = Math.max(...Object.values(data).map((val) => {
                              return Object.values(val).map((val) =>  
                                Math.max(...val['نفقة الشهر'])
                              );
                            }).map((v) => Math.max(...v)));


	let vis; // binding with div for visualization

	let xScale = d3.scaleBand();
	let yScale = d3.scaleLinear().domain([0, y_max]);
	let width;
	let height;
	const margin = {
		top: 30,
		right: 70,
		bottom: 70,
		left: Math.log(y_max)*3
	};
	
	onMount(() => {
		redraw("5");
		window.addEventListener('resize', () => redraw("5"));
	})


	function redraw(month : Keys){

		// empty vis div
		d3.select(vis).html(null); 

		// determine width & height of parent element and subtract the margin
		width = d3.select(vis).node().getBoundingClientRect().width - margin.left - margin.right;
		height = d3.select(vis).node().getBoundingClientRect().height - margin.top - margin.bottom;

		// init scales according to new width & height
    let x_vals : Array<string> = data[month].revenues['الموارد المالية العامة']; 
    let y_vals : Array<number> = data[month].revenues['نفقة الشهر'];

		xScale.domain(x_vals).range([0, width]);
		yScale.range([height, 0]);

		// create svg and create a group inside that is moved by means of margin
		const svg = d3.select(vis)
			.append('svg')
			.attr('width', width + margin.left + margin.right)
			.attr('height', height + margin.top + margin.bottom)
			.append('g')
			.attr('transform', `translate(${[margin.left, margin.top]})`)

		// draw x and y axes
		svg.append("g")
			.attr("transform", `translate(${[0, height]})`)
			.call(d3.axisBottom(xScale));
		svg.append("g")
        .attr("class", "myAxis")
    		.call(d3.axisLeft(yScale));


    let plot_data =  Object.fromEntries(x_vals.map((k, i) => [k, y_vals[i]]));
    console.log(plot_data);
    let u = svg.selectAll("rect").data(plot_data);

  }

	
</script>

<main>
	<div id="vis" bind:this={vis}></div>
</main>

<style>
	main {
		height: 100%;
		display: flex;
	}
	
	#vis {
		width: 100%;
		height: 100%;
		background-color: whitesmoke;
	}
	
	circle {
		fill: black;
		fill-opacity: 0.5;
	}
</style>
-->
<script lang="ts">
	import { scaleLinear, scaleBand } from 'd3'; 
  import data from "$lib/assets/data.json";
  type Month = keyof typeof data;

  type dataPoint = [string, number]; 

  let month : Month = "1"; 

	let xTicks : Array<string> = data[month].revenues['الموارد المالية العامة']; 
	let yTicks : Array<number> = data[month].revenues['نفقة الشهر'];	
  let points : Array<dataPoint> = xTicks.map((element, index) => {return [element,  yTicks[index]];});
	
  const padding = { top: 20, right: 15, bottom: 20, left: 25 };

	let width : number = 600;
	let height : number = 800;

	function formatMobile(tick : string|number) {
		return "'" + tick.toString().slice(-2);
	}

  function update() {
	  xTicks = data[month].revenues['الموارد المالية العامة']; 
	  yTicks = data[month].revenues['نفقة الشهر'];	
    points = xTicks.map((element, index) => {return [element,  yTicks[index]];});
  }

	$: xScale = scaleBand()
		.domain(xTicks)
		.range([padding.left, width - padding.right]);

	$: yScale = scaleLinear()
		.domain([0, Math.max(...yTicks)])
		.range([height - padding.bottom, padding.top]);

	$: innerWidth = width - (padding.left + padding.right);
	$: barWidth = innerWidth / xTicks.length;
</script>

<h2>revenues for {month}/2023</h2>

<div class="chart" bind:clientWidth={width} bind:clientHeight={height}>
	<svg>
		<!-- y axis -->
		<g class="axis y-axis">
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x2="100%" />
					<text y="-4">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g class="axis x-axis">
			{#each points as point}
				<g class="tick" transform="translate({xScale(point[0])},{height})">
					<text x={barWidth / 2} y="-4">{width > 380 ? point[0]: formatMobile(point[0])}</text>
				</g>
			{/each}
		</g>

		<g class="bars">
			{#each points as point}
				<rect
					x={xScale(point[0])}
					y={yScale(point[1])}
					width={barWidth - 4}
					height={yScale(0) - yScale(point[1])}
				/>
			{/each}
		</g>
	</svg>
</div>

<style>
	h2 {
		text-align: center;
	}

	.chart {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	svg {
		position: relative;
		width: 100%;
		height: 200px;
	}

	.tick {
		font-family: Helvetica, Arial;
		font-size: 0.725em;
		font-weight: 200;
	}

	.tick line {
		stroke: #e2e2e2;
		stroke-dasharray: 2;
	}

	.tick text {
		fill: #ccc;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.bars rect {
		fill: #a11;
		stroke: none;
		opacity: 0.65;
	}
</style>

