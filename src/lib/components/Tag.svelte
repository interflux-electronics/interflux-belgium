<script lang="ts">
  import { spanEachWord } from '$lib/helpers';

  interface Props {
    label: string;
    theme: string;
  }

  let { label, theme }: Props = $props();
</script>

{#if label}
  <div class="ds tag {theme}">
    <div class="text ds p">
      {@html spanEachWord(label)}
    </div>
    <div class="bg ds p" aria-hidden="true">
      {@html spanEachWord(label)}
    </div>
  </div>
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  .tag {
    position: relative;
    &.blue {
      .bg {
        :global {
          .word {
            color: var(--blue-3);
            &:after {
              background-color: var(--blue-3);
            }
          }
        }
      }
    }
    &.orange {
      .bg {
        :global {
          .word {
            color: var(--orange-2);
            &:after {
              background-color: var(--orange-2);
            }
          }
        }
      }
    }
    .p {
      color: white;
      font-family: var(--bold);
      margin: 0;
      :global {
        nobr {
          display: flex;
        }
      }
    }
    .text {
      position: relative;
      z-index: 1;
      display: flex;
      flex-wrap: wrap;
    }
    .bg {
      position: absolute;
      z-index: 0;
      top: 0;
      left: 0;
      right: 0;
      display: flex;
      flex-wrap: wrap;
      :global {
        .word {
          position: relative;
          &:after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            @include widescreen {
              left: -8px;
              right: -8px;
            }
            @include desktop {
              left: vw(-8px);
              right: vw(-8px);
            }
            @include tablet {
              left: vw-tablet(-8px);
              right: vw-tablet(-8px);
            }
            @include mobile {
              left: vw-mobile(-8px);
              right: vw-mobile(-8px);
            }
          }
        }
      }
    }
  }
</style>
