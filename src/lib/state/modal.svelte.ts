import { page } from '$lib/state/page.svelte';
import type { Component } from 'svelte';

export const modal = $state({
  visible: false,
  // component: null as Component | null,
  props: {} as Record<string, any>,
  component: null as Component<any, {}, string> | null,

  open(component: Component, props: Record<string, any> = {}) {
    // Freezes <Page> below <Modal> with position: fixed
    page.freeze();

    // Set the component that needs to be rendered within the modal
    this.component = component as Component<any>;

    // Pass props to that component
    this.props = props;

    // Shows <Modal> with position: relative
    this.visible = true;
  },

  close() {
    // Make <Page> position: relative again
    page.unfreeze();

    // Hides <Modal>
    this.visible = false;

    // Reset
    this.component = null;
    this.props = {};
  }
});
