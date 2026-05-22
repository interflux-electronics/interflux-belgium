<script lang="ts">
  import { header } from '$lib/state/header.svelte';
  import { main } from '$lib/state/main.svelte';
  import { footer } from '$lib/state/footer.svelte';
  import { page } from '$lib/state/page.svelte';
  import { mobile, tablet } from '$lib/state/media.svelte';
  import { MobileHeader, DesktopHeader, Breadcrumbs, Footer, LoadingCube } from '$lib/components';
  import { beforeNavigate, afterNavigate } from '$app/navigation';
  import { browser } from '$app/environment';
  import type { Device } from '$lib/types';
  import type { Snippet } from 'svelte';

  let { device, children }: { device: Device; children: Snippet } = $props();

  let isLoading = $state(false);

  // During SSR, use the user agent to detect mobile / desktop
  // During CSR, use screen width to detect mobile / desktop
  let isMobile = $derived(browser ? mobile.current : device.type === 'mobile');
  let isTablet = $derived(browser ? tablet.current : device.type === 'tablet');
  let narrowView = $derived(isMobile || isTablet);

  beforeNavigate(({ type }) => {
    // Prevents "Are you sure" dialogs
    if (type === 'leave') {
      return;
    }

    // Only for SPA navigations:
    isLoading = true;
  });

  afterNavigate(({ type }) => {
    isLoading = false;
  });

  function onPageClick() {
    header.shownMenu = 'none';
  }
</script>

{#if header.visible && narrowView}
  <MobileHeader />
{/if}

<div
  id="page"
  data-main={main.id}
  class={page.frozen ? 'frozen' : 'scrollable'}
  style:top={page.frozen ? `-${page.lastScroll}px` : undefined}
  onclick={onPageClick}
  onkeyup={onPageClick}
  role="button"
  tabindex="0"
>
  {#if header.visible && !narrowView}
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

<style lang="scss">
  #page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    height: 100vh;
    &.scrollable {
      position: relative;
    }
    &.frozen {
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
      min-height: 100vh;
    }
    .spacer {
      // Take up all remaining space instead of sticking the <footer> against the <header>
      height: 100%;
    }
  }
</style>
