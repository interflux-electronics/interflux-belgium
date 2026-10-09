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

{#if products.length > 0}
  {#if expanded}
    <ol class="demoted" class:expanded class:hidden={!expanded}>
      {#each products as product (product.id)}
        <ProductRow {product} />
      {/each}
    </ol>

    <Button
      label={m.show_less()}
      theme="product-list-expander"
      icon="arrow-up"
      iconPosition="right"
      onClick={() => (expanded = false)}
    />
  {:else}
    <Button
      label={m.show_all()}
      theme="product-list-expander"
      icon="arrow-down"
      iconPosition="right"
      onClick={() => (expanded = true)}
    />
  {/if}
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  ol {
    display: flex;
    flex-direction: column;
    &.hidden {
      // avoid display: none so <ResponsiveImage> JS can use offsetWidth
      overflow: hidden;
      height: 0;
    }
    &.expanded {
      overflow: visible;
      height: auto;
    }
  }
</style>
