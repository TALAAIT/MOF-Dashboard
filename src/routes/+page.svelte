<script lang="ts">
    import RevenueExpenses from "$lib/RevenueExpenses.svelte";
    export let form;

    let data = form?.data;
    let date = new Date()
    export let startDate : string = `${date.getFullYear()}-01-01` ;
    export let endDate : string = `${date.toISOString().split('T')[0]}`;
    endDate = endDate.slice(0,endDate.length -2) + '01';
    let formElement;
</script>

<h1>Svelte + D3.js</h1>
{#if form?.error}
	<p class="error">{form.error}</p>
{/if}
<form method="POST" bind:this={formElement}>
<label>
Start date:
<input name="startDate" type="date" value={form?.startDate ?? startDate} on:change={() => formElement.requestSubmit()}>
</label>
<label>
End date:
<input name="endDate" type="date" value={form?.endDate ?? endDate} on:change={() => formElement.requestSubmit()}>
</label>
</form>
<RevenueExpenses {data} />
<style>
  form {
    display: flex;
  }
  label {
    padding-inline: 0.5rem;
  }
  .error {
    color: red;
  }
</style>
