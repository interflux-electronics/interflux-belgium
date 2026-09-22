<script lang="ts">
  import { page, navigating } from '$app/state';
  import { m } from '$lib/paraglide/messages';
  import chain from '$lib/helpers/chain';
  import TextInput from '$lib/components/TextInput.svelte';
  import Pills from '$lib/components/Pills.svelte';
  import Button from '$lib/components/Button.svelte';
  import type { LayoutProps } from './$types';
  import type { Product, ProductFamily, Use } from '$lib/types';
  import type { Option } from '$lib/components/Pills.svelte';
  import LoadingCube from '$lib/components/LoadingCube.svelte';

  let loading = $derived(
    navigating.from != null && navigating.to?.route.id?.startsWith('/products')
  );

  let { children }: LayoutProps = $props();

  // PRODUCTS, FAMILIES & USES

  // 1. This layout does not load data.
  // 2. Its child routes load products from the backend and then pass it to this layout.
  // 3. Families and uses are then derived from those products.
  // 4. Users only see options that match the products they are seeing.

  let products: Product[] | undefined = $derived(
    'products' in page.data ? (page.data.products as Product[]) : undefined
  );

  const mainFamilies: ProductFamily[] = $derived.by(() => {
    return chain<Product>(products).mapBy('mainFamily').uniqBy('id').sortBy('rank').toArray();
  });

  const uses: Use[] = $derived.by(() => {
    return chain<Product>(products).mapBy('uses').flat().uniqBy('id').sortBy('rank').toArray();
  });

  $effect(() => {
    console.log({ products });
    console.log({ uses });
  });

  // const families: ProductFamily[] = [
  //   { id: 'soldering-fluxes', namePlural: m.soldering_fluxes() },
  //   { id: 'solder-pastes', namePlural: m.solder_pastes() },
  //   { id: 'solder-wires', namePlural: m.solder_wires() },
  //   { id: 'solder-alloys', namePlural: m.solder_alloys() },
  //   { id: 'auxiliaries', namePlural: m.auxiliaries() },
  //   { id: 'fluxing-systems', namePlural: m.fluxing_systems() }
  // ];

  // const uses: Use[] = [
  //   { id: 'dip-fluxing', text: m.dip_fluxing() },
  //   { id: 'dip-soldering', text: m.dip_soldering() },
  //   { id: 'dispensing', text: m.dispensing() },
  //   { id: 'foam-fluxing', text: m.foam_fluxing() },
  //   { id: 'general-cleaning', text: m.cleaning() },
  //   { id: 'hand-soldering', text: m.hand_soldering() },
  //   { id: 'jet-fluxing', text: m.jet_fluxing() },
  //   { id: 'laser-soldering', text: m.laser_soldering() },
  //   { id: 'low-melting-point-soldering', text: m.low_melting_point_soldering_LMPA_Q() },
  //   { id: 'OSP-soldering', text: m.OSP_soldering() },
  //   { id: 'pre-tinning', text: m.pre_tinning() },
  //   { id: 'reflow-soldering', text: m.reflow_soldering() },
  //   { id: 'rework-and-repair', text: m.rework_repair() },
  //   { id: 'robot-soldering', text: m.robot_soldering() },
  //   { id: 'selective-soldering', text: m.selective_soldering() },
  //   { id: 'lead-based-soldering', text: m.lead_based_soldering() },
  //   { id: 'lead-free-soldering', text: m.lead_free_soldering() },
  //   { id: 'solder-bath-conditioning', text: m.solder_bath_conditioning() },
  //   { id: 'solder-paste-jetting', text: m.solder_paste_jetting() },
  //   { id: 'spray-fluxing', text: m.spray_fluxing() },
  //   { id: 'stencil-printing', text: m.stencil_printing() },
  //   { id: 'vapor-phase-soldering', text: m.vapor_phase_soldering() },
  //   { id: 'wave-soldering', text: m.wave_soldering() }
  // ];

  function getFamilyURL(family: ProductFamily) {
    const route = page.route.id;
    const { useSlug } = page.params;

    if (route === '/products') {
      return `/products/family/${family.slug}`;
    }

    if (route === '/products/family/[familySlug]') {
      return `/products`;
    }

    if (route === '/products/for/[useSlug]') {
      return `/products/family/${family.slug}/for/${useSlug}`;
    }

    if (route === '/products/family/[familySlug]/for/[useSlug]') {
      return `/products/for/${useSlug}`;
    }

    return `/products`;
  }

  function getUseURL(use: Use) {
    const route = page.route.id;
    const { familySlug } = page.params;

    if (route === '/products') {
      return `/products/for/${use.slug}`;
    }

    if (route === '/products/family/[familySlug]') {
      return `/products/family/${familySlug}/for/${use.slug}`;
    }

    if (route === '/products/for/[useSlug]') {
      return `/products`;
    }

    if (route === '/products/family/[familySlug]/for/[useSlug]') {
      return `/products/family/${familySlug}`;
    }

    return `/products`;
  }

  const familyOptions: Option[] = $derived.by(() => {
    return mainFamilies.map((f) => {
      return {
        id: f.id,
        label: f.namePlural || '?',
        url: getFamilyURL(f)
      };
    });
  });

  const useOptions: Option[] = $derived.by(() => {
    return uses.map((u) => {
      return {
        id: u.id,
        label: u.text || '??',
        url: getUseURL(u)
      };
    });
  });

  let familySelected: Option | undefined = $derived.by(() =>
    familyOptions.find((f) => f.id === page.params.familySlug)
  );
  let useSelected: Option | undefined = $derived.by(() =>
    useOptions.find((f) => f.id === page.params.useSlug)
  );

  // SEARCH

  // Set by the URL:
  let search: string | '' = $state('');

  // Writable derived that syncs with URL query param
  // let search = $derived.by(() => {
  //   return page.url.searchParams.get('q') ?? '';
  // });

  // When the local value changes, update the URL
  // $effect(() => {
  //   // Read the derived value to establish dependency
  //   const currentSearch = search;

  //   const newUrl = new URL(page.url);
  //   if (currentSearch) {
  //     newUrl.searchParams.set('q', currentSearch);
  //   } else {
  //     newUrl.searchParams.delete('q');
  //   }

  //   // Avoid unnecessary navigation if values match
  //   if (newUrl.search !== page.url.search) {
  //     tick().then(() => {
  //       goto(newUrl, { replaceState: true });
  //     });
  //   }
  // });

  // let searchTitle: string = $derived(`${m.results_for({ query: search })} "${search}"`);
  // let searchRoute: boolean = $derived(!!search);

  // function setSearch(value: string) {
  //   const url = new URL(page.url);
  //   if (value) {
  //     url.searchParams.set('search', value);
  //   } else {
  //     url.searchParams.delete('search');
  //   }
  //   goto(url, { replaceState: true, keepFocus: true, noScroll: true });
  // }

  // VIEW

  let layout: 'list' | 'grid' = $state('list');
  let stickyMenu = $derived(page.url.pathname !== '/products' || search);
  let showFilters = $state(false); // for mobile & tablets
</script>

<div class="products-page">
  <div class="liner">
    <aside class:show={showFilters} class:hide={!showFilters}>
      <div class:sticky={stickyMenu}>
        <div class="filter">
          <h3 class="label">{m.search_product()}</h3>

          <TextInput
            size="medium"
            theme="grey-border"
            icon="search"
            value={search}
            onKeyUp={(e) => (search = e.currentTarget.value)}
          />
        </div>

        {#if familyOptions.length > 0 || familySelected}
          <div class="filter">
            <h3 class="label">{m.category()}</h3>

            <Pills
              options={familyOptions}
              selected={familySelected}
              onSelect={(option: Option | undefined) => (familySelected = option)}
              layout="vertical"
            />
          </div>
        {/if}

        {#if useOptions.length > 0 || useSelected}
          <div class="filter">
            <h3 class="label">{m.processes()}</h3>

            <Pills
              options={useOptions}
              selected={useSelected}
              onSelect={(option: Option | undefined) => (useSelected = option)}
              layout="vertical"
            />
          </div>
        {/if}

        <!-- {#if !search}
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
        {/if} -->
      </div>
    </aside>

    <div class="mobile-buttons">
      {#if showFilters}
        <Button
          label={m.hide()}
          onClick={() => (showFilters = true)}
          theme="secondary ghost"
          size="medium"
        />
      {:else}
        <Button
          label={m.search_product()}
          onClick={() => (showFilters = false)}
          theme="secondary ghost"
          size="medium"
        />
      {/if}
    </div>

    <article class={layout}>
      {#if loading}
        <LoadingCube />
        <!-- <Shimmer shape="row" /> -->
      {:else}
        {@render children()}
      {/if}
    </article>
  </div>
</div>

<style lang="scss">
  @use '$lib/styles/components' as *;

  .products-page {
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
      :global {
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
      }
      .filter {
        padding: 0;
        border: 0;
        margin: 0;
        & + .filter {
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
      h3 {
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
      // #search {
      //   position: relative;
      //   z-index: 2;
      //   input {
      //     width: 100%;
      //   }
      // }
      :global {
        input {
          width: 100%;
        }
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
