<script lang="ts">
  import Shimmer from '$lib/components/Shimmer.svelte';

  interface Props {
    id: string;
    src: string;
    alt: string;
    width: number;
    height: number;
  }

  let { id, src, alt, width, height }: Props = $props();

  let loading = $state(true);
  let error = $state(false);

  function onLoad() {
    loading = false;
    error = false;
  }

  function onError() {
    loading = false;
    error = true;
    console.error('Failed to load image', src);
  }
</script>

<picture {id} class="stateful">
  {#if error}
    <div class="error">
      <Shimmer shape="square" />
    </div>
  {/if}

  {#if loading}
    <div class="loading">
      <Shimmer shape="square" />
    </div>
  {/if}

  <img {src} {alt} {width} {height} onload={onLoad} onerror={onError} />
</picture>

<style lang="scss">
  @use '$lib/styles/components' as *;

  picture.stateful {
    position: relative;
    display: block;
    img {
      display: block;
      width: 100%;
      height: auto;
    }
    .loading,
    .error {
      position: absolute;
      width: 100%;
      height: 100%;
      svg {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
