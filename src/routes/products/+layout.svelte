<script lang="ts">
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  import { tick } from 'svelte';
  import { m } from '$lib/paraglide/messages';
  import chain from '$lib/helpers/chain';
  import capitalize from '$lib/helpers/capitalize';
  import TextInput from '$lib/components/TextInput.svelte';
  import ProductList from '$lib/components/ProductList.svelte';
  import Pills from '$lib/components/Pills.svelte';
  import type { PageProps } from './$types';
  import type { Product, ProductFamily, Option } from '$lib/types';

  let { data }: PageProps = $props();

  let products: Product[] = $derived(data.products);

  console.log('✅ /products layout', products.length);

  let uses = $derived.by(() => {
    return chain(products).mapBy('uses').flat().uniqBy('id');
  });

  let mainFamilies = $derived.by(() => {
    return chain(products).mapBy('mainFamily').flat().uniqBy('id');
  });

  // SEARCH BY NAME

  // Writable derived that syncs with URL query param
  let search = $derived.by(() => {
    return page.url.searchParams.get('q') ?? '';
  });

  // When the local value changes, update the URL
  $effect(() => {
    // Read the derived value to establish dependency
    const currentSearch = search;

    const newUrl = new URL(page.url);
    if (currentSearch) {
      newUrl.searchParams.set('q', currentSearch);
    } else {
      newUrl.searchParams.delete('q');
    }

    // Avoid unnecessary navigation if values match
    if (newUrl.search !== page.url.search) {
      tick().then(() => {
        goto(newUrl, { replaceState: true });
      });
    }
  });

  let searchTitle = $derived(`${m.results_for({ query: search })} "${search}"`);

  let familiesLoading = $state(false);
  let familySelected: Option | undefined = $state(undefined);
  let familySubet: ProductFamily[] | undefined = $state(undefined);

  let usesLoading = $state(false);
  let useSelected: Option | undefined = $state(undefined);
  let useSubet: Use[] | undefined = $state(undefined);

  // let mainFamilies = [];
  // let familySelected; // set by child routes
  // let familiesSubset; // set by child routes

  let familyOptions: Option[] = $derived.by(() => {
    const families = useSelected && familiesSubset ? familiesSubset : mainFamilies;

    return chain(families)
      .sortBy('rank')
      .map((family) => {
        const id = family.id;
        const label = capitalize(family.namePlural);
        const url = getFamilyURL(family);

        return { id, label, url };
      });
  });

  function getFamilyURL(family: ProductFamily) {
    // On the mix route, clicking the selected family button takes you to the use route.
    if (familySelected && useSelected) {
      return `/products/for/${useSelected}`;
    }

    // On the family route, clicking the selected family button takes you the index route.
    if (familySelected) {
      return '/products';
    }

    // On the use route, clicking a family button takes you the mix route.
    if (useSelected) {
      return `/products/family/${family.id}/for/${useSelected}`;
    }

    // On the index route, clicking a family button takes you to the family route.
    return `/products/family/${family.id}`;
  }

  let useOptions: Option[] = $derived.by(() => {
    const _uses = familySelected && usesSubset ? usesSubset : uses;

    return chain(_uses)
      .sortBy('rank')
      .map((use) => {
        const id = use.id;
        const label = capitalize(use.text);
        const url = getUseURL(use);

        return { id, label, url };
      });
  });

  function getUseURL(use: Use) {
    // On the mix route, clicking the selected use button takes you to the family route.
    if (familySelected && useSelected) {
      return `/products/family/${familySelected}`;
    }

    // On the family route, clicking a use button takes you to the mix route.
    if (familySelected) {
      return `/products/family/${familySelected}/for/${use.id}`;
    }

    // On the use route, clicking the selected use button takes you to the index route.
    if (useSelected) {
      return 'products';
    }

    // On the index route, clicking a use button takes you to the use route.
    return `/products/for/${use.id}`;
  }

  // VIEW

  let layout: 'list' | 'grid' = $state('list');

  let stickyMenu = $derived(page.url.pathname !== '/products' || search);

  // FOR MOBILE & TABLET

  let fitlersAreShown = $state(false);

  function showFilters() {
    filtersAreShown = true;
  }

  function hideFilters() {
    fitlersAreShown = false;
  }
</script>

<div class="products-page">
  <div class="liner">
    <aside class:show={fitlersAreShown} class:hide={!fitlersAreShown}>
      <div class:sticky={stickyMenu}>
        <fieldset>
          <legend>{m.search_product()}</legend>

          <TextInput
            theme="large grey-border"
            icon="search"
            onKeyUp={(e) => (query = e.currentTarget.value)}
          />
        </fieldset>

        {#if !search}
          <fieldset>
            <legend>
              {familySelected ? m.product_category() : m.product_categories()}
            </legend>
            {#if familiesLoading}
              <p>{m.loading()}</p>
            {:else}
              <Pills
                options={familyOptions}
                selected={familySelected}
                onSelect={(option: Option | undefined) => (familySelected = option)}
                layout="vertical"
              />
            {/if}
          </fieldset>

          <fieldset>
            <legend>{m.suitable_for()}</legend>
            {#if usesLoading}
              <p>{m.loading()}</p>
            {:else}
              <Pills
                options={useOptions}
                selected={useSelected}
                onSelect={(option: Option | undefined) => (useSelected = option)}
                layout="vertical"
              />
            {/if}
          </fieldset>
        {/if}
      </div>
    </aside>

    <div class="mobile-buttons">
      {#if fitlersAreShown}
        <!-- <Button
            @text={{t 'Hide' 'products.15'}}
            @icon='arrow-up'
            @onClick={{this.hideFilters}}
          /> -->
      {:else}
        <!-- <Button
            @icon='search'
            @text={{t 'Search product' 'products.11'}}
            @onClick={this.showFilters}
          /> -->
      {/if}
    </div>

    <article class={layout}>
      {#if search}
        <ProductList {products} {search} groupBy="none" title={m.results_for({ query: search })} />
      {:else}
        <ProductList {products} groupBy="none" title={m.all_products()} />
        <!-- {outlet} -->
      {/if}
    </article>
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/components' as *;

  .products-page {
    background: var(--grey-0);
    @include tablet {
      padding-top: 9vw;
    }
    @include mobile {
      padding-top: 21vw;
    }
    .liner {
      display: flex;
      // Note: this breaks the sticky position of the <aside>
      // align-items: flex-start;
      @include widescreen {
        max-width: 1150px;
        padding: 30px 30px 90px;
        margin: 0 auto;
      }
      @include desktop {
        max-width: vw(1150px);
        padding: vw(30px) vw(30px) vw(90px);
        margin: 0 auto;
      }
      @include tablet {
        flex-direction: column;
      }
      @include mobile {
        flex-direction: column;
      }
    }
    aside {
      flex-shrink: 0;
      @include widescreen {
        width: 260px;
        margin-right: 30px;
      }
      @include desktop {
        width: vw(260px);
        margin-right: vw(30px);
      }
      @include tablet {
        width: 100vw;
      }
      @include mobile {
        width: 100vw;
      }
      &.hide {
        @include tablet-and-below {
          display: none;
        }
      }
      &.show {
        @include tablet-and-below {
          display: block;
        }
      }
      & > div {
        border: 1px solid #e3e3e3;
        bottom: 0;
        @include widescreen {
          top: 30px;
          padding: 20px;
        }
        @include desktop {
          top: vw(30px);
          padding: vw(20px);
        }
        @include tablet {
          padding: 1.5vw;
        }
        @include mobile {
          padding: 4.5vw;
        }
        &.sticky {
          @include widescreen {
            position: sticky;
          }
          @include desktop {
            position: sticky;
          }
        }
      }
      input {
        @include widescreen {
          width: 220px;
        }
        @include desktop {
          width: vw(220px);
        }
        @include tablet {
          width: 33vw;
        }
        @include mobile {
          width: 100%;
        }
      }

      fieldset {
        padding: 0;
        border: 0;
        margin: 0;
        & + fieldset {
          @include widescreen {
            margin-top: 30px;
          }
          @include desktop {
            margin-top: vw(30px);
          }
          @include tablet {
            margin-top: 1.5vw;
          }
          @include mobile {
            margin-top: 4.5vw;
          }
        }
      }
      legend {
        @include paragraph;
        font-family: var(--bold);
        @include widescreen {
          margin-bottom: 16px;
        }
        @include desktop {
          margin-bottom: vw(16px);
        }
        @include tablet {
          margin-bottom: 1.5vw;
        }
        @include mobile {
          margin-bottom: 4.5vw;
        }
      }
      #search {
        position: relative;
        z-index: 2;
        input {
          width: 100%;
        }
      }
      :global {
        .pill,
        .pill.selected span {
          overflow: hidden;
          text-overflow: ellipsis;
          @include widescreen {
            max-width: 220px;
          }
          @include desktop {
            max-width: vw(220px);
          }
          @include tablet {
            max-width: calc(100vw - 1.5vw - 1.5vw);
          }
          @include mobile {
            max-width: calc(100vw - 4.5vw - 4.5vw);
          }
        }
      }
    }
    article {
      background: white;
      box-shadow: 0 4px 8px rgba(black, 0.1);
      @include widescreen {
        width: 880px;
      }
      @include desktop {
        width: vw(880px);
      }
      @include tablet {
        width: 100vw;
      }
      @include mobile {
        width: 100vw;
      }
      // &.grid {
      //   ol {
      //     flex-direction: row;
      //     flex-wrap: wrap;
      //     li {
      //       width: 33.3333%;
      //     }
      //   }
      // }
    }
    & + .spacer {
      background: var(--grey-0);
    }

    .mobile-buttons {
      @include desktop-and-up {
        display: none;
      }
      @include tablet-and-below {
        display: flex;
      }
      .button {
        width: 100vw;
        display: flex;
        align-items: center;
        background-color: var(--grey-0);
        border-bottom: 1px solid var(--grey-1);
        @include tablet {
          padding: 0 2vw;
          height: 7vw;
          justify-content: flex-start;
        }
        @include mobile {
          padding: 0 4.5vw;
          height: 16vw;
          justify-content: space-between;
          flex-direction: row-reverse;
        }
        span {
          color: var(--grey-7);
        }
        svg {
          [fill] {
            fill: var(--grey-5);
          }
          &.search {
            @include tablet {
              width: 3vw;
              margin: 1vw;
            }
            @include mobile {
              width: 7vw;
              margin: 2vw;
            }
          }
          &.arrow-up {
            @include tablet {
              width: 1.5vw;
              margin: 2vw;
            }
            @include mobile {
              width: 4vw;
              margin: 2.3vw;
            }
          }
        }
      }
    }
  }
</style>
