<script lang="ts">
  import { page } from '$app/state';
  import { m } from '$lib/paraglide/messages';
  import ProductList from '$lib/components/ProductList.svelte';
  import type { PageProps } from './$types';
  import type { Product, GroupBy } from '$lib/types';

  let { data }: PageProps = $props();
  let search = $derived(page.url.searchParams.get('search') ?? undefined);
  let title = $derived(search ? m.results_for({ query: search }) : m.all_products());
  let products: Product[] = $derived(data.products);
  let groupBy: GroupBy = $derived(search ? 'none' : 'mainFamily');
</script>

<ProductList {title} {products} {groupBy} {search} />
