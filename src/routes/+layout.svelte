<script lang="ts">
  import { PUBLIC_CDN_HOST } from '$env/static/public';

  import '$lib/styles/app.scss';

  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { header, updateHeader } from '$lib/state/header.svelte';
  import { main } from '$lib/state/main.svelte';
  import { footer } from '$lib/state/footer.svelte';
  import { modal } from '$lib/state/modal.svelte';
  import { isMobile, isTablet, isDesktop, isWidescreen } from '$lib/state/media.svelte';
  import { MobileHeader, DesktopHeader, Breadcrumbs, Footer, LoadingCube } from '$lib/components';

  const mode = import.meta.env.MODE;

  let { children } = $props();

  function onPageClick() {
    updateHeader({
      shownMenu: 'none'
    });
  }

  let isLoading = $state(false);

  beforeNavigate(({ type }) => {
    console.log('beforeNavigate');

    // Prevents "Are you sure" dialogs
    if (type === 'leave') {
      return;
    }

    // Only for SPA navigations:
    isLoading = true;
  });

  afterNavigate(({ type }) => {
    console.log('afterNavigate');

    isLoading = false;
  });
</script>

<svelte:head>
  <meta name="environment" content={mode} />
  <meta name="built-by" content="Jan Werkhoven - jw@interflux.au" />
  <meta name="built-with" content="Svelte Kit - https://svelte.dev/" />
  <meta name="copyright" content="© since 1980 by Interflux Electronics NV ®" />
  <meta name="theme-color" content="#23578c" />

  <link
    rel="icon"
    type="image/svg+xml"
    href="{PUBLIC_CDN_HOST}/images/logos/secondary-interflux-electronics-symbol-1.svg"
    sizes="any"
  />
  <!-- <meta name='build-timestamp' content={{this.model.buildTimestamp}} /> -->
  <!-- <meta name='git-branch' content={{this.model.gitBranch}} /> -->
  <!-- <meta name='git-revision' content={{this.model.gitRevision}} /> -->

  <!-- https://ogp.me/ -->
  <!-- https://developers.facebook.com/docs/sharing/webmasters/ -->
  <!-- https://developers.facebook.com/docs/sharing/best-practices#images -->

  <!-- SEO basics -->

  <!-- <title>{{this.model.title}}</title>
<meta name='description' content='{{this.model.description}}' />
<meta name='robots' content='index, follow' /> -->

  <!-- {{#if this.model.canonicalURL}}
   <link rel='canonical' href='{{this.model.canonicalURL}}' />
{{/if}} -->

  <!-- Open graph, for social media -->
  <!--
// <meta property='og:url' content={{this.model.canonicalURL}} />
// <meta property='og:locale' content={{this.model.ogLocale}} />
// <meta property='og:type' content={{this.model.ogType}} />
// <meta property='og:title' content={{this.model.title}} />
// <meta property='og:description' content={{this.model.description}} />
// <meta property='og:image' content={{this.model.ogImageURL}} />
// <meta property='og:image:width' content={{this.model.ogImageWidth}} />
// <meta property='og:image:height' content={{this.model.ogImageHeight}} />
// <meta property='og:image:alt' content={{this.model.ogImageAlt}} />
-->

  <!-- Multilingual SEO -->
  <!-- https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites -->
  <!-- https://developers.google.com/search/docs/specialty/international/localized-versions -->
  <!-- http://www.lingoes.net/en/translator/langcode.htm -->

  <!-- // {{#let this.model.canonicalPath as |cp|}}
//   <link rel='alternate' hreflang='en' href='https://interflux.com{{cp}}' />
//   <link rel='alternate' hreflang='de' href='https://interflux.de{{cp}}' />
//   <link rel='alternate' hreflang='fr' href='https://interflux.fr{{cp}}' />
//   <link rel='alternate' hreflang='zh' href='https://interflux.cn.com{{cp}}' />
//   <link rel='alternate' hreflang='es-ES' href='https://interflux.es{{cp}}' />
//   <link rel='alternate' hreflang='es-MX' href='https://interflux.mx{{cp}}' />
// {{/let}} -->

  <!-- // {{! Mapbox }}
// {{! Only load the CSS and JS for mapbox if the router asked for it }}
// {{#if this.model.loadMapBox}}
//   <link
//     href='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css'
//     rel='stylesheet'
//   />
//   <script src='https://api.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.js'>
//   </script>
// {{/if}} -->

  <!-- // <script type='application/ld+json'>
//   {{this.model.combinedMicroData}}
// </script> -->
</svelte:head>

{#if header.visible && (isMobile || isTablet)}
  <MobileHeader />
{/if}

<div
  id="page"
  data-main={main.id}
  class={modal.visible ? 'prevent-scroll' : 'allow-scroll'}
  style={modal.visible ? `top: -${modal.scrollY}px` : null}
  onclick={onPageClick}
  onkeyup={onPageClick}
  role="button"
  tabindex="0"
>
  {#if header.visible && (isDesktop || isWidescreen)}
    <DesktopHeader />
    {#if header.crumbs}
      <Breadcrumbs />
    {/if}
  {/if}

  <main id={main.id} class={main.class}>
    {#if isLoading}
      <LoadingCube />
    {:else}
      {@render children()}
    {/if}
  </main>

  {#if footer.visible}
    <div class="spacer"></div>
    <Footer />
  {/if}
</div>

{#if modal.visible}
  <div id="modals"></div>
{/if}

<style lang="scss">
  #page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100vh;
    &.prevent-scroll {
      position: fixed;
      width: 100%;
      z-index: 1;
    }
    :global {
      header,
      #breadcrumbs,
      main,
      footer {
        flex-shrink: 0;
      }
    }
    main {
      // This prevents the blue footer from appearing when pages are loading.
      // min-height: 100vh;
      // When loading show top half of the footer
      min-height: calc(100vh - 300px);
    }
    .spacer {
      height: 100%;
    }
  }
</style>
