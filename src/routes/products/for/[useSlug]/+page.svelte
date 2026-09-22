<script lang="ts">
  import ProductList from '$lib/components/ProductList.svelte';
  import capitalize from '$lib/helpers/capitalize';
  import type { PageProps } from './$types';
  import type { Use, Product, GroupBy } from '$lib/types';

  let { data }: PageProps = $props();

  let use: Use = $derived(data.use);
  let products: Product[] = $derived(use.products || []);
  let title = $derived(capitalize(use.text) || '?');
  let groupBy: GroupBy = 'mainFamilyForUse';
</script>

<ProductList {title} {products} {groupBy} />
