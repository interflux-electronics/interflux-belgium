<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import ProductList from '$lib/components/ProductList.svelte';
  import type { PageProps } from './$types';
  import type { Product, GroupBy } from '$lib/types';

  let { data }: PageProps = $props();
  let title = m.all_products();
  let products: Product[] = $derived(data.products);
  let groupBy: GroupBy = 'mainFamily';
</script>

<ProductList {title} {products} {groupBy} />
