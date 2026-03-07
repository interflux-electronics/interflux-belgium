import { page } from '$lib/state/page.svelte';

export const modal = $state({
  visible: false,
  content: () => {},
  theme: '',
  contentID: '',
  backURL: '',
  isFetching: false,
  fetchFailed: false,

  open() {
    page.freeze();

    // Freezes <Page> below <Modal> with position: fixed.
    // Shows <Modal> with position: relative.
    this.visible = true;

    // // Remember the <Page> scroll position for later.
    // page.scrollY = window.scrollY || document.documentElement.scrollTop;

    // Instantly scroll to the top of <Modal>
    window.scrollTo(0, 0);
  },

  close(restoreScroll: boolean = false) {
    page.unfreeze();

    // // If route changed, scroll to top of viewport.
    // // If same route, scroll <Page> below <Modal> back to original Y position.
    // const scrollToY = restoreScroll ? page.scrollY : 0;

    // Hides <Modal> and makes <Page> position: relative again.
    this.visible = false;

    // Scroll the viewport
    window.scrollTo(0, scrollToY);

    // Reset
    page.scrollY = 0;
  }
});
