<script lang="ts">
  import ProductListSearch from '$lib/components/ProductListSearch.svelte';
  import ProductListPromoted from '$lib/components/ProductListPromoted.svelte';
  import ProductListDemoted from '$lib/components/ProductListDemoted.svelte';
  import chain from '$lib/helpers/chain';
  import capitalize from '$lib/helpers/capitalize';
  import { m } from '$lib/paraglide/messages';
  import type { Product, ProductFamily, GroupBy, Use } from '$lib/types';

  interface Props {
    title: string;
    products: Product[];
    groupBy: GroupBy;
    search?: string | undefined;
    family?: ProductFamily;
    use?: Use;
  }

  let { title, products, groupBy, search, family, use }: Props = $props();

  function filterFeatured(products: Product[]) {
    return products?.filter((p) => ['new', 'popular', 'promoted'].includes(p.status));
  }

  function filterHidden(products: Product[]) {
    return products?.filter((p) => ['demoted', 'replaced', 'discontinued'].includes(p.status));
  }

  interface Group {
    id: string;
    title?: string;
    featured: Product[];
    hidden: Product[];
  }

  let groups: Group[] = $derived.by(() => {
    // For all products page
    if (groupBy === 'mainFamily') {
      const mainFamilies = chain(products).mapBy('mainFamily').uniqBy('id').sortBy('rank');

      return mainFamilies.map((family: ProductFamily) => {
        const subset = chain(products)
          .filterBy('mainFamily.id', family.id)
          .sortBy('rankAmongFamily')
          .toArray();

        const group: Group = {
          id: family.id,
          title: capitalize(family.namePlural) || '?',
          featured: filterFeatured(subset),
          hidden: filterHidden(subset)
        };

        return group;
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
        const sorted = subset.sortBy('rankAmongFamily').toArray();

        const group: Group = {
          id: family?.id,
          title: family ? capitalize(family.namePlural) : m.other(),
          featured: filterFeatured(sorted),
          hidden: filterHidden(sorted)
        };

        return group;
      });
    }

    // For solder pastes
    // For solder wires
    // For solder alloys
    if (groupBy === 'alloy') {
      const alloys =
        family?.id === 'solder-wires'
          ? ['lead-free-soldering', 'low-melting-point-soldering', 'lead-based-soldering']
          : ['low-melting-point-soldering', 'lead-free-soldering', 'lead-based-soldering'];

      const uses = chain(products).mapBy('uses').flat().uniqBy('id');
      const sorted = alloys.map((alloy) => uses.findBy('id', alloy));

      return sorted.map((use: Use) => {
        const subset = chain(use.productUses)
          .sortBy('rankAmongProducts')
          .filterBy('product')
          .toArray()
          .map((productUse) => {
            const product = productUse.product;
            const overrides = {};

            // Products can be given a ranking order unique to one of their Uses.
            // That ranking lives on the relation in-between model called ProductUse.
            // Here below we print that rank onto the Product for sorting.
            overrides.rankAmongProducts = productUse.rankAmongProducts;

            // Products have their main avatar image. However, when shown under the context of one of
            // their Uses, that avatar can be overriden to better fit the Use. For example DP 5505
            // solder paste is shown with green lid under "Lead-free soldering" and with blue lid
            // under "Lead-based soldering".
            // Here below we override that avatar.
            if (productUse.showAlternativeAvatar) {
              if (productUse.image) {
                const img = productUse.image;

                overrides.avatarPath = img.path;
                overrides.avatarVariations = img.variations;
                overrides.avatarAlt = img.alt;
              }
            }

            return { ...product, ...overrides };
          });

        const group: Group = {
          id: use.id,
          title: `For ${use.text}`, // TODO: translate
          featured: filterFeatured(subset),
          hidden: filterHidden(subset)
        };

        return group;
      });
    }

    // For use routes
    // For use & family routes
    if (groupBy === 'mainFamilyForUse') {
      const mainFamilies = chain(products).mapBy('mainFamily').uniqBy('id').sortBy('rank');

      return mainFamilies.map((mainFamily) => {
        const subset = chain(products).filterBy('mainFamily', mainFamily).toArray();

        // Hide the title when on products/family/[familySlug]/for/[useSlug]
        // Because the <h1> will be identical to the <h2>
        const title =
          use && family ? undefined : `${capitalize(mainFamily.namePlural)} for ${use?.text}`;

        const group: Group = {
          id: mainFamily.id,
          title,
          featured: filterFeatured(subset),
          hidden: filterHidden(subset)
        };

        return group;
      });
    }

    // No grouping
    // For fluxing systems
    // For search search
    const extended = products.map((product) => {
      const statusRank = [
        'new',
        'popular',
        'promoted',
        'demoted',
        'replaced',
        'discontinued',
        'offline'
      ].indexOf(product.status);

      return { ...product, statusRank };
    });
    const subset = chain<Product>(extended).sortBy('statusRank', 'name').toArray();
    const group = {
      id: '',
      title: '',
      featured: filterFeatured(subset),
      hidden: filterHidden(subset)
    };

    return [group];
  });
</script>

<div class="product-list">
  <h1>{title}</h1>
  {#if search}
    <ProductListSearch {products} {search} />
  {:else}
    {#each groups as group (group.id)}
      <section>
        {#if group.title}
          <h2>{group.title}</h2>
        {/if}

        <ProductListPromoted products={group.featured} />
        <ProductListDemoted products={group.hidden} />
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
    }
  }
</style>
