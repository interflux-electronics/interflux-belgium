<script>
  import { page } from '$app/state'; // or '$app/stores' if on older version
</script>

<div class="error-page">
  <h1>{page.status} – {page.error?.message ?? 'Something went wrong'}</h1>

  {#if page.status === 404}
    <p>The documents you're looking for could not be found.</p>
  {:else if page.status === 400}
    <p>Bad request – please check your input and try again.</p>
  {:else}
    <p>{page.error?.message}</p>
  {/if}

  <a href="/documents">Try reloading</a>
  <a href="/">Back to home</a>
</div>

<style>
  .error-page {
    text-align: center;
    padding: 4rem 1rem;
  }
</style>
