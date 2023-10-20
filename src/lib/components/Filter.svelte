<script lang="ts">
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
    import { get } from 'lodash';

  const date = new Date();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear()

  function firstDayInMonth(month : number, year : number) : string {
    month = month > 0 ? (month < 13 ? month : 12) : 1;
    month = Math.max(Math.min(month, 12), 1);
    return `${year > 1970 ? year : 1970}-${String(month).padStart(2,'0')}-01`
  }

  function updateSearchParams(key: string, value: string) {
    const searchParams = new URLSearchParams($page.url.searchParams);
    searchParams.set(key, value);
    goto(`?${searchParams.toString()}`)
  }
  
  let startDate = $page.url.searchParams.get('startDate') || firstDayInMonth(1,currentYear);
  let endDate = $page.url.searchParams.get('endDate') || firstDayInMonth(currentMonth,currentYear);

  updateSearchParams('startDate', startDate);
  updateSearchParams('endDate', endDate);

</script>

<h2 class="p-4">Filter</h2>
<hr />
<label class="label">
  <p>Start Date:</p>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
    <input type="date" bind:value={startDate} 
      on:change={() => {
        startDate = firstDayInMonth(new Date(startDate).getMonth() + 1, 
                                    new Date(startDate).getFullYear());
        updateSearchParams('startDate', startDate);
      }}/>
  </div>
</label>
<label class="label">
  <p>End Date:</p>
  <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
    <input type="date" bind:value={endDate} 
      on:change={() => {
        endDate = firstDayInMonth(new Date(endDate).getMonth() + 1, 
                                    new Date(endDate).getFullYear());
        updateSearchParams('endDate', endDate);
      }}/>
  </div>
</label>
