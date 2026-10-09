<script lang="ts">
  import { header } from '$lib/state/header.svelte';
  import { footer } from '$lib/state/footer.svelte';
  import { page } from '$lib/state/page.svelte';
  import { page as app } from '$app/state';
  import { mobile, tablet } from '$lib/state/media.svelte';
  import { MobileHeader, DesktopHeader, Breadcrumbs, Footer } from '$lib/components';
  import { beforeNavigate } from '$app/navigation';
  import { browser } from '$app/environment';
  import type { Device } from '$lib/types';
  import type { Snippet } from 'svelte';

  let { device, children }: { device: Device; children: Snippet } = $props();

  // During SSR, use the user agent to detect mobile / desktop
  // During CSR, use screen width to detect mobile / desktop
  let isMobile = $derived(browser ? mobile.current : device.type === 'mobile');
  let isTablet = $derived(browser ? tablet.current : device.type === 'tablet');
  let isMobileOrTablet = $derived(isMobile || isTablet);

  beforeNavigate(({ type }) => {
    // Prevents "Are you sure" dialogs
    if (type === 'leave') {
      return;
    }
  });

  function onPageClick() {
    header.shownMenu = 'none';
  }

  let id = $derived(app.data.page?.id);

  let theme = $derived(
    ['page', app.data.page?.theme, page.frozen ? 'frozen' : 'scrollable'].join(' ')
  );
</script>

{#if header.visible && isMobileOrTablet}
  <MobileHeader />
{/if}

<div
  {id}
  class={theme}
  style:top={page.frozen ? `-${page.lastScroll}px` : undefined}
  onclick={onPageClick}
  onkeyup={onPageClick}
  role="button"
  tabindex="0"
>
  {#if header.visible && !isMobileOrTablet}
    <DesktopHeader />
    {#if header.crumbs}
      <Breadcrumbs />
    {/if}
  {/if}

  <main>
    {@render children()}
  </main>

  {#if footer.visible}
    <div class="spacer"></div>
    <Footer />
  {/if}
</div>

<style lang="scss">
  .page {
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
    &.grey {
      main {
        background-color: var(--grey-0);
      }
    }
    main {
      // This prevents the blue footer from appearing when pages are loading.
      min-height: 100vh;
      flex-shrink: 0;
    }
    .spacer {
      // Take up all remaining space instead of sticking the <footer> against the <header>
      height: 100%;
    }
  }
</style>
