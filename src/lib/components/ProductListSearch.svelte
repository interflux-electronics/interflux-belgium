<script lang="ts">
  import chain from '$lib/helpers/chain';
  import ProductRow from '$lib/components/ProductRow.svelte';
  import type { Product } from '$lib/types';

  interface Props {
    products: Product[];
    search: string;
  }

  let { products, search }: Props = $props();

  let productsSorted = $derived(chain(products).sortBy('statusRank', 'name'));
</script>

<ol class="product-search">
  {#each productsSorted as product (product.id)}
    <ProductRow {product} {search} />
  {/each}
</ol>
