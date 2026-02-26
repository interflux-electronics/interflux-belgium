<script lang="ts">
  import { Svg } from '$lib/components';
  import type { Snippet } from 'svelte';

  interface Props {
    text?: string;
    icon?: string;
    href?: string;
    onclick?: (event: MouseEvent) => void;
    id?: string;
    class?: string;
    theme?: string;
    isBusy?: boolean;
    children?: Snippet;
  }

  let {
    text,
    icon,
    href,
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

{#if href}
  <a {href} {id} class={classNames}>
    {#if children}
      {@render children()}
    {/if}

    {#if icon}
      <div class="icon">
        <Svg name={icon} />
      </div>
    {/if}

    {#if text}
      <span>{text}</span>
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

    {#if text}
      <span>{text}</span>
    {/if}
  </button>
{/if}
