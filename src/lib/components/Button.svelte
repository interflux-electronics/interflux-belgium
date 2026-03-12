<script lang="ts">
  import { Svg } from '$lib/components';
  import type { Snippet } from 'svelte';
  import type { Icon } from '$lib/components/Svg.svelte';

  interface Props {
    label?: string;
    size?: 'medium' | 'large';
    theme?: string;
    icon?: Icon;
    iconPosition?: 'left' | 'right';
    url?: string;
    onClick?: (event: MouseEvent) => void;
    id?: string;
    class?: string;
    isBusy?: boolean;
    children?: Snippet;
  }

  let {
    label,
    size = 'medium',
    theme = 'primary green',
    icon,
    iconPosition = 'left',
    url,
    onClick,
    id,
    class: classNamePassedIn = '',
    isBusy,
    children
  }: Props = $props();

  let classNames = $derived(
    [
      'button',
      size,
      theme,
      icon,
      icon ? `has-icon` : 'no-icon',
      `icon-${iconPosition}`,
      isBusy ? 'busy' : 'idle',
      classNamePassedIn
    ].join(' ')
  );
</script>

{#if url}
  <a href={url} class={classNames} {id} onclick={onClick}>
    {#if icon}
      <div class="icon">
        <Svg name={icon} />
      </div>
    {/if}

    {#if children}
      {@render children()}
    {/if}

    {#if label}
      <span>{label}</span>
    {/if}
  </a>
{:else}
  <button {id} onclick={onClick} class={classNames}>
    {#if icon}
      <div class="icon">
        <Svg name={icon} />
      </div>
    {/if}

    {#if children}
      {@render children()}
    {/if}

    {#if label}
      <span>{label}</span>
    {/if}
  </button>
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: none;
    border: 0;
    outline: 0;
    box-sizing: border-box;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;

    // We generally avoid animations on buttons because they need to respond and feel snappy.
    // The exception is the box shadow.
    transition: box-shadow 200ms $easeOutExpo;

    // All buttons slightly compress when clicked
    &:active {
      transform: scale(0.98);
    }

    &.icon-left {
      flex-direction: row;
    }

    &.icon-right {
      flex-direction: row-reverse;
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;

      :global {
        svg {
          width: auto;
          height: 100%;
        }
      }
    }

    // Sizes

    &.large {
      font-family: $bold;
      border: 1px solid transparent;

      @include widescreen {
        font-size: 18px;
        line-height: 46px;
        height: 46px;
        border-radius: 4px;
        padding: 0 22px;
      }
      @include desktop {
        font-size: vw(18px);
        line-height: vw(46px);
        height: vw(46px);
        border-radius: vw(4px);
        padding: 0 vw(22px);
      }
      @include tablet {
        font-size: vw-tablet(18px);
        line-height: vw-tablet(46px);
        height: vw-tablet(46px);
        border-radius: vw-tablet(4px);
        padding: 0 vw-tablet(22px);
      }
      @include mobile {
        font-size: vw-mobile(18px); // TODO: review
        line-height: vw-mobile(46px); // TODO: review
        height: vw-mobile(46px); // TODO: review
        border-radius: vw-mobile(4px); // TODO: review
        padding: 0 vw-mobile(22px); // TODO: review
      }

      .icon {
        @include widescreen {
          height: 18px;
        }
        @include desktop {
          height: vw(18px);
        }
        @include tablet {
          height: vw-tablet(18px);
        }
        @include mobile {
          height: vw-mobile(18px); // TODO: review
        }
      }

      &.has-icon {
        @include widescreen {
          gap: 12px;
        }
        @include desktop {
          gap: vw(12px);
        }
        @include tablet {
          gap: vw-tablet(12px);
        }
        @include mobile {
          gap: vw-mobile(12px); // TODO: review
        }
      }
    }

    &.medium {
      font-family: $semibold;
      border: 1px solid transparent;

      @include widescreen {
        font-size: 16px;
        line-height: 34px;
        height: 34px;
        border-radius: 3px;
        padding: 0 16px;
      }
      @include desktop {
        font-size: vw(16px);
        line-height: vw(34px);
        height: vw(34px);
        border-radius: vw(3px);
        padding: 0 vw(16px);
      }
      @include tablet {
        font-size: vw-tablet(16px);
        line-height: vw-tablet(34px);
        height: vw-tablet(34px);
        border-radius: vw-tablet(3px);
        padding: 0 vw-tablet(16px);
      }
      @include mobile {
        font-size: vw-mobile(16px); // TODO: verify
        line-height: vw-mobile(34px); // TODO: verify
        height: vw-mobile(34px); // TODO: verify
        border-radius: vw-mobile(3px); // TODO: verify
        padding: 0 vw-mobile(16px); // TODO: verify
      }

      .icon {
        @include widescreen {
          height: 16px;
        }
        @include desktop {
          height: vw(16px);
        }
        @include tablet {
          height: vw-tablet(16px);
        }
        @include mobile {
          height: vw-mobile(16px); // TODO: review
        }
      }

      &.has-icon {
        @include widescreen {
          gap: 10px;
        }
        @include desktop {
          gap: vw(10px);
        }
        @include tablet {
          gap: vw-tablet(10px);
        }
        @include mobile {
          gap: vw-mobile(10px); // TODO: review
        }
      }
    }

    // Styles

    &.primary {
      color: white;

      &.green {
        background: $green-1;
        border-color: $green-2;

        &:hover,
        &:focus {
          background: $green-2;
          border-color: $green-3;
          box-shadow:
            0 0 0 1px $green-3,
            0 3px 6px rgba(black, 0.2);
        }
      }

      &.orange {
        background: $orange-1;
        border-color: $orange-3;

        &:hover,
        &:focus {
          background: $orange-2;
          border-color: $orange-4;
          box-shadow:
            0 0 0 1px $orange-4,
            0 3px 6px rgba(black, 0.2);
        }
      }

      :global {
        svg {
          [fill] {
            fill: white;
          }
        }
      }
    }

    &.secondary {
      background: white;
      border-color: $grey-2;
      color: $grey-6;

      &:hover,
      &:focus {
        color: $blue-0;
        border-color: $blue-0;
        box-shadow:
          0 0 0 1px $blue-0,
          0 3px 6px rgba(black, 0.2);
      }

      // :global {
      //   svg {
      //     [fill] {
      //       fill: $grey-5;
      //     }
      //   }
      // }

      // &.white-border {
      //   border-color: rgba(white, 0.5);
      //   color: white;
      //   :global {
      //     svg {
      //       [fill] {
      //         fill: white;
      //       }
      //     }
      //   }
      // }

      // &.white-text-on-blue {
      //   color: white;
      //   border-radius: 3px;
      //   background-color: rgba($blue-5, 0.8);
      //   border: 2px solid $blue-3;
      //   &:hover,
      //   &:focus {
      //     background: rgba(white, 0.2);
      //     border-color: white;
      //     :global {
      //       svg {
      //         [fill] {
      //           fill: white;
      //         }
      //       }
      //     }
      //   }
      //   :global {
      //     svg {
      //       [fill] {
      //         fill: white;
      //       }
      //     }
      //   }
      // }

      // &.blue-focus {
      //   &:hover,
      //   &:focus {
      //     color: $blue-0;
      //     border-color: $blue-0;
      //     box-shadow: inset 0 0 0 1px $blue-0;
      //     :global {
      //       svg {
      //         [fill] {
      //           fill: $blue-0;
      //         }
      //       }
      //     }
      //   }
      //   &:focus {
      //     box-shadow: 0 0 0 1px $blue-0 inset;
      //   }
      // }

      // &.orange {
      //   &:hover,
      //   &:focus {
      //     color: $orange-1;
      //     border-color: $orange-1;
      //     :global {
      //       svg {
      //         [fill] {
      //           fill: $orange-1;
      //         }
      //       }
      //     }
      //   }
      //   &:focus {
      //     box-shadow: 0 0 0 1px $orange-1;
      //   }
      // }
    }

    &.tertiary {
      padding: 0;
      transition: padding 300ms $easeOutExpo;

      // &.blue-text {
      //   color: $blue-0;
      //   &:focus,
      //   &:hover {
      //     outline: 2px solid $blue-0;
      //     outline-offset: 2px;
      //   }
      //   :global {
      //     svg {
      //       [fill] {
      //         fill: $blue-0;
      //       }
      //     }
      //   }
      // }

      &.ghost {
        color: white;

        &:hover,
        &:focus {
          background: rgba(white, 0.1);

          &.medium {
            @include widescreen {
              padding: 0 10px;
            }
            @include desktop {
              padding: 0 vw(10px);
            }
            @include tablet {
              padding: 0 vw-tablet(10px);
            }
            @include mobile {
              padding: 0 vw-mobile(10px); // TODO: review
            }
          }
        }

        :global {
          svg {
            [fill] {
              fill: white;
            }
          }
        }
      }
    }

    // For the mobile chevron navigation buttons
    // For the mobile hamburger button
    &.square {
      flex-shrink: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      @include tablet {
        margin: 1.5vw;
        width: 6vw;
        height: 6vw;
        border: 0.325vw solid rgba(white, 0.2);
        border-radius: 0.6vw;
      }
      @include mobile {
        margin: 4.5vw;
        width: 12vw;
        height: 12vw;
        border: 0.625vw solid rgba(white, 0.2);
        border-radius: 1vw;
      }
      color: white;
      transition: background-color $easeOutExpo 300ms;
      &:hover,
      &:focus {
        box-shadow: 0 0 0 1px white;
        background: rgba(white, 0.1);
        border-color: white;
      }
      &.hamburger {
        :global {
          path {
            transition: all 300ms ease;
            transition-property: transform, opacity;
            transform-origin: center;
          }
          &.close {
            path:nth-child(1) {
              transform: rotate(45deg) translate(0%, 30%);
            }
            path:nth-child(2) {
              transform: scale(1.2, 0);
              opacity: 0;
            }
            path:nth-child(3) {
              transform: rotate(-45deg) translate(0%, -30%);
            }
          }
        }
      }
      :global {
        svg {
          &.hamburger {
            @include tablet {
              height: 3.2vw;
            }
            @include mobile {
              height: 6.5vw;
            }
            width: auto;
          }
          &.chevron-left {
            @include tablet {
              height: 2.8vw;
            }
            @include mobile {
              height: 5.5vw;
            }
            width: auto;
          }
          &.chevron-down {
            @include tablet {
              width: 2.8vw;
            }
            @include mobile {
              width: 5.5vw;
            }
            height: auto;
          }
          [fill] {
            fill: white;
          }
        }
      }
    }

    // For mobile hamburger navigation
    // TODO: move to <MobileHeader>
    &.stacked {
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
      width: 100vw;
      &.medium {
        @include tablet {
          font-size: 3vw;
          border-radius: 0.4vw;
          padding: 6vw 2vw;
        }
        @include mobile {
          font-size: 5.6vw;
          border-radius: 0.8vw;
          padding: 8vw 3vw;
        }
        :global {
          svg {
            @include tablet {
              max-width: 5vw;
              max-height: 5vw;
              margin-right: 3vw;
            }
            @include mobile {
              max-width: 8vw;
              max-height: 8vw;
              margin-right: 4vw;
            }
          }
        }
      }
      &.small {
        @include tablet {
          font-size: 3vw;
          border-radius: 0.4vw;
          padding: 3vw 2vw;
        }
        @include mobile {
          font-size: 4.6vw;
          border-radius: 0.8vw;
          padding: 3vw 4.5vw;
        }

        :global {
          img {
            @include tablet {
              width: 8vw;
              height: 8vw;
            }
            @include mobile {
              width: 12vw;
              height: 12vw;
            }
          }
        }

        span {
          text-overflow: ellipsis;
          overflow: hidden;
          @include tablet {
            max-width: 85vw;
          }
          @include mobile {
            max-width: 80vw;
          }
        }
      }
      &.white {
        color: white;
        transition: all $easeOutExpo 400ms;
        border-top: 1px solid rgba(white, 0.2);
        border-radius: 0;
        &:last-of-type {
          border-bottom: 1px solid rgba(white, 0.2);
        }
        :global {
          svg {
            [fill] {
              fill: white;
            }
          }
        }
        &:hover,
        &:focus {
          box-shadow: inset 0 0 0 2px white;
          background: rgba(white, 0.1);
        }
      }
      &.left {
        justify-content: flex-start;
        gap: 4vw;
      }
    }
  }
</style>
