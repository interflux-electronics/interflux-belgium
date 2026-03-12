<script lang="ts">
  import { Button } from '$lib/components';

  export interface Option {
    id: string;
    label: string;
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
    <button class="pill selected" onclick={() => reset()}>
      {selected.label}
    </button>
  {:else}
    {#each options as option}
      <button class="pill idle" onclick={() => select(option)}>
        {option.label}
      </button>
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

  .pill {
    background: none;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
    font-family: $regular;
    line-height: 100%;
    border: 1px solid $grey-2;
    box-sizing: border-box;
    color: $grey-7;
    transition: background-color 400ms $easeOutExpo;
    @include widescreen {
      font-size: 16px;
      border-radius: 18px;
      padding: 8px 12px;
    }
    @include desktop {
      font-size: vw(16px);
      border-radius: vw(18px);
      padding: vw(8px) vw(12px);
    }
    @include tablet {
      font-size: vw-tablet(16px);
      border-radius: vw-tablet(18px);
      padding: vw-tablet(8px) vw-tablet(12px);
    }
    @include mobile {
      font-size: vw-mobile(16px);
      border-radius: vw-mobile(18px);
      padding: vw-mobile(8px) vw-mobile(12px);
    }
    &:hover,
    &:focus {
      border-color: $green-1;
      box-shadow:
        0 0 0 1px $green-1,
        0 3px 6px rgba(black, 0.2);
    }
    &.selected {
      font-family: $semibold;
      background-color: $green-1;
      border: 2px solid $green-2;
      color: white;
      &:hover,
      &:focus {
        background-color: $green-2;
        border-color: $green-3;
        box-shadow: 0 3px 6px rgba(black, 0.2);
      }
    }
    // &.has-icon {
    //   display: flex;
    //   flex-direction: row-reverse;
    //   align-items: center;
    //   @include widescreen {
    //     gap: 6px;
    //   }
    //   @include desktop {
    //     gap: vw(6px);
    //   }
    //   @include tablet {
    //     gap: vw-tablet(6px);
    //   }
    //   @include mobile {
    //     gap: vw-mobile(6px);
    //   }
    //   :global {
    //     svg {
    //       @include widescreen {
    //         width: 12px;
    //         height: 12px;
    //       }
    //       @include desktop {
    //         width: vw(12px);
    //         height: vw(12px);
    //       }
    //       @include tablet {
    //         width: vw-tablet(12px);
    //         height: vw-tablet(12px);
    //       }
    //       @include mobile {
    //         width: vw-mobile(12px);
    //         height: vw-mobile(12px);
    //       }
    //       [fill] {
    //         fill: white;
    //       }
    //     }
    //   }
    // }
  }
</style>
