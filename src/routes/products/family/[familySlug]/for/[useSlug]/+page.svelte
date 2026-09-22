<script lang="ts">
  import ProductList from '$lib/components/ProductList.svelte';
  import capitalize from '$lib/helpers/capitalize';
  import type { PageProps } from './$types';
  import type { Product, Use, GroupBy, ProductFamily } from '$lib/types';

  let { data }: PageProps = $props();
  let products: Product[] = $derived(data.products);
  let family: ProductFamily = $derived(data.family);
  let use: Use = $derived(data.use);
  let title = $derived(`${capitalize(family.namePlural)} for ${use.text}`);
  let groupBy: GroupBy = 'mainFamilyForUse';
</script>

<ProductList {title} {products} {groupBy} {use} />
