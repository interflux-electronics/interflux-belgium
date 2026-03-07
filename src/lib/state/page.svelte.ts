import { page as app } from '$app/state';

export const page = $state({
  frozen: false,
  lastPath: '',
  lastScroll: 0,

  freeze() {
    // Remember URL for later
    this.lastPath = app.url.pathname;

    // Remember the vertical scroll position for later
    this.lastScroll = window.scrollY || document.documentElement.scrollTop;

    // Make <Page> position: fixed.
    // This allows <Modal> or <MobileHeader> to become scrollable with position: relative.
    this.frozen = true;
  },

  unfreeze() {
    // Make <Page> position: relative again.
    this.frozen = false;

    // // If route changed, scroll to top of viewport.
    // // If same route, scroll <Page> below <Modal> back to original Y position.
    const scrollToY = app.url.pathname === this.lastPath ? this.lastScroll : 0;

    // Scroll the viewport
    window.scrollTo(0, scrollToY);

    // Reset
    this.lastScroll = 0;
  }
});
