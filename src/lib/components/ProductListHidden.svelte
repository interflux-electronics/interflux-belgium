<script lang="ts">
  import ProductRow from '$lib/components/ProductRow.svelte';
  import Button from '$lib/components/Button.svelte';
  import { m } from '$lib/paraglide/messages';
  import type { Product } from '$lib/types';

  interface Props {
    products: Product[];
  }

  let { products }: Props = $props();

  let expanded = $state(false);
</script>

{#if products}
  <ol class="featured">
    {#each products as product (product.id)}
      <ProductRow {product} />
    {/each}
  </ol>
{/if}

{#if products}
  <ol class="hidden" class:expanded>
    {#each products as product (product.id)}
      <ProductRow {product} />
    {/each}
  </ol>
  {#if expanded}
    <Button
      label={m.show_only_recommended_products()}
      icon="arrow-up"
      theme="secondary medium grey-border blue-focus icon-right"
      onClick={() => (expanded = false)}
    />
  {:else}
    <Button
      text={m.show_all()}
      icon="arrow-down"
      theme="secondary medium grey-border blue-focus icon-right"
      onClick={() => (expanded = true)}
      class="expand"
    />
  {/if}
{/if}
