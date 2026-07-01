<script lang="ts">
  import ProductRow from '$lib/components/ProductRow.svelte';
  import type { Product } from '$lib/types';

  interface Props {
    products: Product[];
  }

  let { products }: Props = $props();
</script>

{#if products}
  <ol class="featured">
    {#each products as product (product.id)}
      <ProductRow {product} />
    {/each}
  </ol>
{/if}
