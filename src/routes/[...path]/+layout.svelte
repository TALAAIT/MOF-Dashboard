<script>
  import { page } from '$app/stores'
</script>
<header>
 {$page.data.title}
</header>
<slot />
<style>
header {
  background-color: aqua;
  margin-bottom: 1%;
}
</style>
