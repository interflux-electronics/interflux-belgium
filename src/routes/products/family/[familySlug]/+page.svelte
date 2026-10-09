<script lang="ts">
  import ProductList from '$lib/components/ProductList.svelte';
  import capitalize from '$lib/helpers/capitalize';
  import type { PageProps } from './$types';
  import type { Product, GroupBy, ProductFamily } from '$lib/types';

  let { data }: PageProps = $props();
  let products: Product[] = $derived(data.products);
  let family: ProductFamily = $derived(data.family);
  let title = $derived(`${capitalize(family.namePlural)}`);
  let groupBy: GroupBy = $derived.by(() => {
    if (['soldering-fluxes', 'auxiliaries'].includes(family.id)) {
      return 'subFamily';
    }

    if (['solder-pastes', 'solder-wires', 'solder-alloys'].includes(family.id)) {
      return 'alloy';
    }

    return 'none';
  });
</script>

<ProductList {title} {products} {groupBy} {family} />
