<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    url: string;
    label?: string;
    children?: Snippet;
  }

  let { url, label, children }: Props = $props();
</script>

<!-- eslint-disable svelte/no-navigation-without-resolve  -->
<a href={url} target="_blank" rel="noopener noreferrer">
  {#if children}
    {@render children()}
  {:else if label}
    {label}
  {/if}
</a>
