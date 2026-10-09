<script lang="ts">
  import ProductRow from '$lib/components/ProductRow.svelte';
  import type { Product } from '$lib/types';

  interface Props {
    products: Product[];
  }

  let { products }: Props = $props();
</script>

{#if products}
  <ol class="promoted">
    {#each products as product (product.id)}
      <ProductRow {product} />
    {/each}
  </ol>
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  ol {
    display: flex;
    flex-direction: column;
  }
</style>
