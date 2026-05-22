<script lang="ts">
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import { Page, Modal } from '$lib/components';
  import type { LayoutData } from './$types';
  import type { Snippet } from 'svelte';

  import '$lib/styles/app.scss';

  const mode = import.meta.env.MODE;
  const gitBranch = import.meta.env.BUILD_GIT_BRANCH;
  const gitRevision = import.meta.env.BUILD_GIT_COMMIT;
  const buildTime = import.meta.env.BUILD_TIME;

  let { data, children }: { data: LayoutData; children: Snippet } = $props();
</script>

<svelte:head>
  <!-- Build -->
  <meta name="environment" content={mode} />
  <meta name="git-branch" content={gitBranch} />
  <meta name="git-revision" content={gitRevision} />
  <meta name="build-time" content={buildTime} />
  <meta name="built-with" content="Svelte Kit 5 - https://svelte.dev/" />
  <meta name="built-by" content="Jan Werkhoven - jw@interflux.au" />
  <meta name="copyright" content="© since 1980 by Interflux Electronics NV ®" />

  <!-- Favicon -->
  <link
    rel="icon"
    type="image/svg+xml"
    href="{PUBLIC_CDN_HOST}/images/logos/secondary-interflux-electronics-symbol-1.svg"
    sizes="any"
  />

  <!-- SEO -->
  <!-- Sensible fallbacks -->
  <!-- Each route should set their own -->
  <title>Interflux Electronics</title>
  <meta
    name="description"
    content="Soldering fluxes, solder pastes, solder wire, solder alloys and auxiliaries for electronics manufacturers."
  />
  <meta name="robots" content="index, follow" />

  <!-- Browser theme -->
  <meta name="theme-color" content="#23578c" />

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

<Page device={data.device}>
  {@render children()}
</Page>

<Modal />
