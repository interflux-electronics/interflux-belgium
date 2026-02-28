<script lang="ts">
  import { Svg } from '$lib/components';
  import type { Snippet } from 'svelte';

  interface Props {
    label?: string;
    icon?: string;
    url?: string;
    onclick?: (event: MouseEvent) => void;
    id?: string;
    class?: string;
    theme?: string;
    isBusy?: boolean;
    children?: Snippet;
  }

  let {
    label,
    icon,
    url,
    onclick,
    id,
    class: classNamePassedIn = '',
    theme,
    isBusy,
    children
  }: Props = $props();

  let classNames = $derived(
    `button ${theme || 'no-theme'} ${icon ? `has-icon ${icon}` : 'no-icon'} ${isBusy ? 'busy' : 'idle'} ${classNamePassedIn}`
  );
</script>

{#if url}
  <a href={url} class={classNames} {id}>
    {#if children}
      {@render children()}
    {/if}

    {#if icon}
      <div class="icon">
        <Svg name={icon} />
      </div>
    {/if}

    {#if label}
      <span>{label}</span>
    {/if}
  </a>
{:else}
  <button {id} {onclick} class={classNames}>
    {#if children}
      {@render children()}
    {/if}

    {#if icon}
      <div class="icon">
        <Svg name={icon} />
      </div>
    {/if}

    {#if label}
      <span>{label}</span>
    {/if}
  </button>
{/if}
