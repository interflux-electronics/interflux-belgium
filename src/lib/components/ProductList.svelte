<script lang="ts">
  import ProductListSearch from '$lib/components/ProductListSearch.svelte';
  import ProductListFeatured from '$lib/components/ProductListFeatured.svelte';
  import ProductListHidden from '$lib/components/ProductListHidden.svelte';
  import Shimmer from '$lib/components/Shimmer.svelte';
  import chain from '$lib/helpers/chain';
  import { m } from '$lib/paraglide/messages';
  import type { Product, ProductFamily, Use } from '$lib/types';

  interface Props {
    title: string;
    products: Product[];
    groupBy: 'mainFamily' | 'subFamily' | 'use' | 'mainFamilyForUse' | 'none';
    search?: string;
    loading?: boolean;
    use?: Use;
  }

  let { title, products, groupBy, search, loading = false, use }: Props = $props();

  let groups = $derived.by(() => {
    // For `/products` path, where we show all products, group by main family
    if (groupBy === 'mainFamily') {
      const mainFamilies = chain(products).mapBy('mainFamily').uniqBy('id').sortBy('rank');

      return mainFamilies.map((family: ProductFamily) => {
        const subset = chain(products)
          .filterBy('mainFamily.id', family.id)
          .sortBy('rankAmongFamily');

        // TODO: rankAmongMainFamily

        return {
          title: family.label,
          featured: subset.filterBy('isFeatured').toArray(),
          hidden: subset.filterBy('isHidden').toArray()
        };
      });
    }

    // For soldering fluxes
    // For auxiliaries
    if (groupBy === 'subFamily') {
      const subFamilies = chain(products)
        .filterBy('subFamily.id')
        .mapBy('subFamily')
        .uniqBy('id')
        .sortBy('rank');

      // This approach catches all products with no subFamilies and sorts them
      // to the bottom in category called "Others" until sub family is assigned.
      const groups = [...subFamilies, undefined];

      return groups.map((family) => {
        const id = family ? family.id : null;
        const subset = family
          ? chain(products).filterBy('subFamily.id', id)
          : chain(products).rejectBy('subFamily.id');

        const title = family ? family.label : m.other();

        // TODO: rankAmongSubFamily

        return {
          title,
          featured: subset.filterBy('isFeatured').sortBy('rankAmongFamily').toArray(),
          hidden: subset.filterBy('isHidden').sortBy('rankAmongFamily').toArray()
        };
      });
    }

    // For solder pastes
    // For solder wires
    // For solder alloys
    if (groupBy === 'use') {
      const uses = chain(products).mapBy('uses').flat().uniqBy('id').sortBy('rank');

      return uses.map((use: Use) => {
        const rank = 'rankAmongProducts';
        const productUses = use.productUses.filter((pu) => {
          return products.find((p) => p.id === pu.product.id);
        });
        const ranked = chain(productUses).filterBy(rank).sortBy(rank);
        const rankless = chain(productUses).rejectBy(rank);
        const sorted = [...ranked, ...rankless];
        const subset = chain(sorted).mapBy('product');
        const title = use.forLabel; // TODO

        // TODO: override the avatar with avatar set on use

        // let rows = $derived.by(() => {
        //   if (!productUses) {
        //     return products.map((product) => {
        //       return { product };
        //     });
        //   }

        //   return products.map((product) => {
        //     const productUse = productUses.findBy('product.id', product.get('id'));
        //     const alternativeAvatar =
        //       productUse && productUse.showAlternativeAvatar && productUse.image
        //         ? productUse.image
        //         : null;

        //     return { product, alternativeAvatar };
        //   });
        // });

        return {
          title,
          featured: subset.filterBy('isFeatured').toArray(),
          hidden: subset.filterBy('isHidden').toArray()
        };
      });
    }

    // For processes (uses)
    if (groupBy === 'mainFamilyForUse') {
      const mainFamilies = chain(products).mapBy('mainFamily').uniqBy('id');

      return mainFamilies.map((family) => {
        const subset = chain(products).filterBy('mainFamily.id', family.get('id'));
        const title = m.family_for_use({ family: family.label, use: use.name }); // TODO: review

        return {
          title,
          featured: subset.filterBy('isFeatured').toArray(),
          hidden: subset.filterBy('isHidden').toArray()
        };
      });
    }

    // For fluxing systems and search
    if (groupBy === 'none') {
      console.log(products);
      return [
        {
          title: null,
          featured: products.filter((p) => ['new', 'popular', 'recommended'].includes(p.status)),
          hidden: products.filter((p) => ['outdated', 'discontinued'].includes(p.status))
        }
      ];
    }

    // For spotting issues
    return [
      {
        title: '?',
        products: []
      }
    ];
  });
</script>

<div class="product-list">
  <h1>{title}</h1>
  {#if loading}
    <Shimmer shape="row" />
  {:else if search}
    <ProductListSearch {products} {search} />
  {:else}
    {#each groups as group (group.title)}
      <section>
        {#if group.title}
          <h2>{group.title}</h2>
        {/if}

        <ProductListFeatured products={group.featured} />
        <ProductListHidden products={group.hidden} />
      </section>
    {/each}
  {/if}
</div>

<style lang="scss">
  @use '$lib/styles/components' as *;

  .product-list {
    h1 {
      font-family: var(--extra-bold);
      line-height: 160%;
      border-bottom: 1px solid var(--grey-1);
      color: var(--blue-3);
      @include widescreen {
        font-size: 36px;
        padding: 50px 60px;
      }
      @include desktop {
        font-size: vw(36px);
        padding: vw(50px) vw(60px);
      }
      @include tablet {
        text-align: center;
        font-size: 4vw;
        padding: 9vw 5vw;
      }
      @include mobile {
        text-align: center;
        font-size: 7vw;
        padding: 16vw 10vw;
      }
    }
    h2 {
      font-family: var(--light);
      line-height: 160%;
      color: var(--grey-7);
      box-sizing: border-box;
      @include widescreen {
        font-size: 30px;
        padding: 50px 60px;
      }
      @include desktop {
        font-size: vw(30px);
        padding: vw(50px) vw(60px);
      }
      @include tablet {
        font-size: 4vw;
        text-align: center;
        width: 100%;
        padding: 9vw 5vw;
      }
      @include mobile {
        font-size: 7vw;
        text-align: center;
        width: 100%;
        padding: 16vw 10vw;
      }
      & + p {
        margin-top: 20px;
      }
      &.with-arrow {
        display: flex;
        gap: 20px;
        svg {
          width: 12px;
          height: auto;
          [fill] {
            fill: var(--blue-0);
          }
        }
      }
    }
    ol.hidden {
      // avoid display: none so <ResponsiveImage> JS can use offsetWidth
      overflow: hidden;
      height: 0;
      &.expanded {
        overflow: visible;
        height: auto;
      }
      & + .button.secondary.grey-border {
        width: 100%;
        height: 50px;
        border-radius: 0;
        border: 1px solid var(--grey-1);
        border-left: 0;
        border-right: 0;
        margin-top: -1px;
        transition: box-shadow 150ms ease-out;
        &:hover,
        &:focus {
          z-index: 1;
          outline: 0;
          @include widescreen {
            box-shadow:
              0 0 0 2px var(--blue-0),
              0 0 12px RGBA(0, 0, 0, 0.1);
          }
          @include desktop {
            box-shadow:
              0 0 0 2px var(--blue-0),
              0 0 12px RGBA(0, 0, 0, 0.1);
          }
        }
      }
    }
    ol {
      display: flex;
      flex-direction: column;
      li {
        &.hide {
          display: none;
        }
      }
    }
  }
</style>
