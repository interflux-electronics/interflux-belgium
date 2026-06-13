<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    url: string;
    label?: string;
    children?: Snippet;
  }

  let { url, label, children }: Props = $props();
</script>

<a href={url} target="_blank" rel="external noopener noreferrer">
  {#if children}
    {@render children()}
  {:else if label}
    {label}
  {/if}
</a>
