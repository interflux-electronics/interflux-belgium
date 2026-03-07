<script lang="ts">
  import { Button } from '$lib/components';

  interface Option {
    label: string;
    value?: string;
  }

  interface Props {
    layout?: string;
    options: Option[];
    selected?: Option;
    onSelect: (option: Option | undefined) => void;
  }

  let { layout = 'horizontal', options, selected, onSelect }: Props = $props();

  function select(option: Option | undefined) {
    onSelect(option);
  }

  function reset() {
    select(undefined);
  }
</script>

<div class="pills {layout}">
  {#if selected}
    <Button label={selected.label} theme="pill selected" onClick={() => reset()} />
  {:else}
    {#each options as option}
      <Button label={option.label} theme="pill idle" onClick={() => select(option)} />
    {/each}
  {/if}
</div>

<style lang="scss">
  @use '$lib/styles/components' as *;

  .pills {
    display: flex;
    @include widescreen {
      gap: 5px;
    }
    @include desktop {
      gap: vw(5px);
    }
    @include tablet {
      gap: 0.75vw;
    }
    @include mobile {
      gap: 3vw;
    }
    &.horizontal {
      flex-direction: row;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
    &.vertical {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
