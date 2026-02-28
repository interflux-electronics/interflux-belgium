<script lang="ts">
  import { Button } from '$lib/components';

  interface Option {
    label: string;
    value?: string;
  }

  interface Props {
    label?: string;
    options: Option[];
    selected?: Option;
    onSelect: (option: Option | undefined) => void;
  }

  let { label, options, selected, onSelect }: Props = $props();

  function select(option: Option | undefined) {
    onSelect(option);
  }

  function reset() {
    select(undefined);
  }
</script>

<div class="pills">
  {#if label}
    <p>{label}</p>
  {/if}

  {#if selected}
    <Button label={selected.label} onclick={() => reset()} />
  {:else}
    {#each options as option}
      <Button label={option.label} onclick={() => select(option)} />
    {/each}
  {/if}
</div>
