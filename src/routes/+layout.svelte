<script lang="ts">
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import { MobileHeader, Page, Modal } from '$lib/components';

  import '$lib/styles/app.scss';

  const mode = import.meta.env.MODE;

  let { children } = $props();
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

<MobileHeader />

<Page>
  {@render children()}
</Page>

<Modal />
