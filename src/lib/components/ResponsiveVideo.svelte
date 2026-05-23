<script lang="ts">
  import { PUBLIC_CDN_HOST as cdnHost } from '$env/static/public';
  import { findGCD } from '$lib/helpers/findGCD';
  import type { ImageSize, VariationList } from '$lib/types';

  interface Props {
    path: string;
    variations?: VariationList | '';
  }

  let { path, variations = '' }: Props = $props();

  let hasValidData = $derived(path && variations);

  let ratio = $derived.by(() => {
    if (!variations) {
      return '1:1';
    }

    // First size found in variations
    const size = variations.split(',')[0].split('@')[1].split('.')[0];
    const width = Number(size.split('x')[0]);
    const height = Number(size.split('x')[1]);

    // The greatest common divider
    const gcd = findGCD(width, height);
    const ratioWidth = width / gcd;
    const ratioHeight = height / gcd;

    return `${ratioWidth}:${ratioHeight}`;
  });

  let ratioWidth = $derived(ratio.split(':')[0]);
  let ratioHeight = $derived(ratio.split(':')[1]);

  let optimalWidth = $state(0);
  let optimalHeight = $state(0);

  let MP4s = $derived(variations.split(',').filter((x) => x.endsWith('.mp4')));
  let WEBMs = $derived(variations.split(',').filter((x) => x.endsWith('.webm')));

  let MP4sizes = $derived(MP4s.map((x) => x.split('.')[0].replace('@', '')) as ImageSize[]);
  let WEBMsizes = $derived(WEBMs.map((x) => x.split('.')[0].replace('@', '')) as ImageSize[]);

  let closestMP4size = $derived(closestSize(MP4sizes));
  let closestWEBMsize = $derived(closestSize(WEBMsizes));

  let MP4src = $derived(`${cdnHost}/${path}@${closestMP4size}.mp4`);
  let WEBMsrc = $derived(`${cdnHost}/${path}@${closestWEBMsize}.webm`);

  let showVideo = $derived(optimalWidth && optimalHeight && (closestMP4size || closestWEBMsize));

  // Accepts and array of sizes "200x200".
  // Returns the one which is above and closest to the optimal width.
  // We filter out the size "original".
  function closestSize(sizes: ImageSize[]) {
    const distances = sizes
      .filter((size) => /^\d{2,4}x\d{2,4}$/.test(size))
      .map((size) => {
        const width = Number(size.split('x')[0]);
        return width - optimalWidth;
      });

    const larger = distances.filter((d) => d >= 0);
    const smaller = distances.filter((d) => d < 0);

    const closestDistance = larger.length ? Math.min(...larger) : Math.max(...smaller);

    return sizes.find((size) => {
      const width = Number(size.split('x')[0]);
      return width - optimalWidth === closestDistance;
    });
  }

  // POSTER

  let PNGs = $derived(variations.split(',').filter((x) => x.endsWith('png')));
  let JPGs = $derived(variations.split(',').filter((x) => x.endsWith('jpg')));
  let WEBPs = $derived(variations.split(',').filter((x) => x.endsWith('webp')));

  let PNGsizes = $derived(PNGs.map((x) => x.split('.')[0].replace('@', '')) as ImageSize[]);
  let JPGsizes = $derived(JPGs.map((x) => x.split('.')[0].replace('@', '')) as ImageSize[]);
  let WEBPsizes = $derived(WEBPs.map((x) => x.split('.')[0].replace('@', '')) as ImageSize[]);

  let closestPoster = $derived.by(() => {
    if (!variations) {
      return null;
    }

    const size = closestPosterSize();

    if (!size) {
      return null;
    }

    return `${cdnHost}/${path}@${size}`;
  });

  function closestPosterSize() {
    if (WEBPs.length) {
      return closestSize(WEBPsizes) + '.webp';
    }

    if (JPGs.length) {
      return closestSize(JPGsizes) + '.jpg';
    }

    if (PNGs.length) {
      return closestSize(PNGsizes) + '.png';
    }

    return null;
  }
</script>

{#if hasValidData}
  <div class="responsive-video">
    <svg
      viewBox="0 0 {ratioWidth} {ratioHeight}"
      bind:clientWidth={optimalWidth}
      bind:clientHeight={optimalHeight}
    >
      <rect width={ratioWidth} height={ratioHeight}></rect>
    </svg>

    {#if showVideo}
      <video controls width={optimalWidth} height={optimalHeight} poster={closestPoster}>
        {#if closestWEBMsize}
          <source src={WEBMsrc} type="video/webm" />
        {/if}

        {#if closestMP4size}
          <source src={MP4src} type="video/mp4" />
        {/if}
      </video>
    {/if}
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  .responsive-video {
    position: relative;
    video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: auto;
    }
  }
</style>
