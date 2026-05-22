<script lang="ts">
  import { PUBLIC_CDN_HOST as cdnHost } from '$env/static/public';
  import { browser } from '$app/environment';
  import { m } from '$lib/paraglide/messages';
  import Shimmer from '$lib/components/Shimmer.svelte';
  import Link from '$lib/components/Link.svelte';
  import type { VariationList } from '$lib/types';

  interface Props {
    path: string;
    variations?: VariationList | '';
    caption?: string;
    alt?: string;
  }

  let { path, variations = '', caption, alt }: Props = $props();

  let pixelRatio = $state(2);

  $effect(() => {
    if (browser) {
      pixelRatio = window.devicePixelRatio || 2;
    }
  });

  let actualWidth = $state(0);
  let actualHeight = $state(0);
  let optimalWidth = $derived(actualWidth * pixelRatio);

  // Prefer WEBP over JPG over PNG
  let fileType = $derived.by(() => {
    if (!variations) {
      return null;
    } else if (variations.includes('.webp')) {
      return 'webp';
    } else if (variations.includes('.jpg')) {
      return 'jpg';
    } else if (variations.includes('.png')) {
      return 'png';
    } else {
      return null; // possibly .svg
    }
  });

  let variationsForFileType = $derived(
    variations.split(',').filter((v) => v.split('.')[1] === fileType)
  );

  let subset = $derived(
    variationsForFileType.map((variation) => {
      if (!variation.split('x')[1]) {
        console.log('🔥');
        console.log({ path, variations });
      }

      const width = Number(variation.split('x')[0].replace('@', ''));
      const height = Number(variation.split('x')[1].split('.')[0]);

      return { suffix: variation, width, height };
    })
  );

  let widths = $derived(subset.map((x) => x.width));
  let largestWidth = $derived(Math.max(...widths));
  let smallestWidth = $derived(Math.min(...widths));
  let closestWidth = $derived.by(() => {
    const deltas = widths.map((w) => w - optimalWidth);
    const larger = deltas.filter((d) => d >= 0);
    const smaller = deltas.filter((d) => d < 0);

    return (larger.length ? Math.min(...larger) : Math.max(...smaller)) + optimalWidth;
  });

  let largest = $derived(subset.find((s) => s.width === largestWidth));
  let smallest = $derived(subset.find((s) => s.width === smallestWidth));
  let closest = $derived(subset.find((s) => s.width === closestWidth));

  let closestURL = $derived(`${cdnHost}/${path}${closest?.suffix || ''}`);
  let smallestURL = $derived(`${cdnHost}/${path}${smallest?.suffix || ''}`);
  let largestURL = $derived(`${cdnHost}/${path}${largest?.suffix || ''}`);

  let width = $derived(closest?.width || 200);
  let height = $derived(closest?.height || 200);
  let orientation = $derived.by(() => {
    if (!actualWidth || !actualHeight) {
      return 'orientation-unknown';
    } else if (width < height) {
      return 'portrait';
    } else if (width > height) {
      return 'landscape';
    } else {
      return 'square';
    }
  });

  let isLoading = $state(true);

  function onLoad() {
    isLoading = false;
  }

  function onError() {
    isLoading = false;
  }
</script>

{#if path}
  <figure class="responsive-image {orientation}">
    <!-- Whilst the low-res is loading, show shimmer (instant) -->
    {#if isLoading}
      <div class="shimmer">
        <Shimmer shape="square" />
      </div>
    {/if}

    <!-- Whilst <img> is loading, show low-res image -->
    <!-- We use background-image to avoid SEO indexing -->
    {#if isLoading}
      {#if smallestURL && smallestURL !== closestURL}
        <div class="low-res" style:background-image="url({smallestURL})"></div>
      {/if}
    {/if}

    <picture bind:offsetWidth={actualWidth} bind:offsetHeight={actualHeight}>
      <!-- For SEO, include <source> of largest image -->
      {#if largestURL && largestURL !== closestURL}
        <source srcset={largestURL} media="(min-width: 9999px)" />
      {/if}

      <img src={closestURL} {width} {height} {alt} onload={onLoad} onerror={onError} />
    </picture>

    {#if caption}
      <figcaption>
        <p class="caption">{caption}</p>
        <p><Link url={largestURL} label={m.download_full_size()} /></p>
        <p class="copyright">&copy; Interflux Electronics</p>
      </figcaption>
    {/if}
  </figure>
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  figure {
    display: flex;
    justify-content: center;
    margin: 0;
    max-width: 100%;
    max-height: 100%;
    background: $grey-0;
    overflow: hidden; // To hide alt text from breaking out of the <figure> frame
    position: relative; // So the error and loading states don't got beyond <figure>
    &.landscape {
      align-items: center;
      flex-direction: column;
    }
    &.portrait {
      height: 100%;
      width: auto;
      picture {
        height: 100%;
        width: auto;
        img {
          height: 100%;
          width: auto;
        }
      }
    }
    .low-res {
      position: absolute;
      inset: 0;
      background-size: cover;
      filter: blur(10px);
    }
    .shimmer {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      :global {
        svg {
          width: 100%;
          height: 100%;
        }
      }
    }
    picture {
      position: relative;
      display: block;
      width: 100%;
      img {
        display: block;
        width: 100%;
        height: auto;
        font-size: 1px; // To prevent the alt text from showing if load failed
      }
    }
    figcaption {
      .caption,
      .copyright {
        position: absolute;
        font-size: 85%;
        opacity: 0.8;
        @include widescreen {
          padding: 6px 12px;
        }
        @include desktop {
          padding: vw(6px) vw(12px);
        }
        @include tablet {
          padding: 1.3vw 2.3vw;
        }
        @include mobile {
          display: none;
        }
      }
      .caption {
        top: 0;
        left: 0;
        :global {
          a {
            background-color: none;
          }
        }
      }
      .copyright {
        bottom: 0;
        right: 0;
      }
    }
  }
</style>
