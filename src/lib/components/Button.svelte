<script lang="ts">
  import { Svg } from '$lib/components';
  import type { Snippet } from 'svelte';
  import type { Icon } from '$lib/components/Svg.svelte';

  interface Props {
    label?: string;
    icon?: Icon;
    url?: string;
    onClick?: (event: MouseEvent) => void;
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
    onClick,
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
  <a href={url} class={classNames} {id} onclick={onClick}>
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
  <button {id} onclick={onClick} class={classNames}>
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

<style lang="scss">
  @use '$lib/styles/components' as *;

  .button {
    display: inline-block;
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

    // Sizes

    &.large {
      font-family: $bold;
      border: 1px solid transparent;

      @include widescreen {
        font-size: 16px;
        line-height: 44px;
        border-radius: 3px;
        padding: 0 30px;
      }
      @include desktop {
        font-size: vw(16px);
        line-height: vw(44px);
        border-radius: vw(3px);
        padding: 0 vw(30px);
      }
      @include tablet {
        font-size: vw-tablet(16px);
        line-height: vw-tablet(44px);
        border-radius: vw-tablet(3px);
        padding: 0 vw-tablet(39px);
      }
      @include mobile {
        font-size: vw-mobile(16px);
        line-height: vw-mobile(44px);
        border-radius: vw-mobile(3px);
        padding: 0 vw-mobile(39px);
      }

      &.has-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        &.icon-left {
          .icon {
            @include widescreen {
              margin-right: 10px;
            }
            @include desktop {
              margin-right: vw(10px);
            }
            @include tablet {
              margin-right: vw-tablet(10px);
            }
            @include mobile {
              margin-right: vw-mobile(10px);
            }
          }
        }
        &.icon-floats-left {
          position: relative;
          padding: 0 46px;
          .icon {
            position: absolute;
            width: 46px;
            height: 100%;
            left: 0;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            :global {
              svg {
                max-width: 60%;
                max-height: 60%;
                height: auto;
                &.truck {
                  transform: translate(12%, 2%);
                  width: 55%;
                }
                &.people {
                  transform: translate(11%, 1%);
                  width: 55%;
                }
              }
            }
          }
        }
      }
    }

    &.big {
      font-family: $semibold;
      border: 2px solid transparent;

      @include widescreen {
        font-size: 16px;
        line-height: 38px;
        height: 40px;
        border-radius: 3px;
        padding: 0 12px;
      }
      @include desktop {
        font-size: vw(16px);
        line-height: vw(38px);
        height: vw(40px);
        border-radius: vw(3px);
        padding: 0 vw(12px);
      }
      @include tablet {
        font-size: vw-tablet(16px); // TODO
        line-height: vw-tablet(32px); // TODO
        height: vw-tablet(32px); // TODO
        border-radius: vw-tablet(3px); // TODO
        padding: 0 vw-tablet(13px); // TODO
      }
      @include mobile {
        font-size: vw-mobile(16px); // TODO
        line-height: vw-mobile(40px); // TODO
        height: vw-mobile(40px); // TODO
        border-radius: vw-mobile(3px); // TODO
        padding: 0 vw-mobile(15px); // TODO
      }
    }

    &.medium {
      font-family: $semibold;
      border: 1px solid transparent;

      @include widescreen {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        border-radius: 3px;
        padding: 0 13px;
      }
      @include desktop {
        font-size: vw(16px);
        line-height: vw(32px);
        height: vw(32px);
        border-radius: vw(3px);
        padding: 0 vw(13px);
      }
      @include tablet {
        font-size: vw-tablet(16px);
        line-height: vw-tablet(32px);
        height: vw-tablet(32px);
        border-radius: vw-tablet(3px);
        padding: 0 vw-tablet(13px);
      }
      @include mobile {
        font-size: vw-mobile(16px);
        line-height: vw-mobile(40px);
        height: vw-mobile(40px);
        border-radius: vw-mobile(3px);
        padding: 0 vw-mobile(15px);
      }
      &.has-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        &.icon-left {
          .icon {
            @include widescreen {
              margin-right: 10px;
            }
            @include desktop {
              margin-right: vw(10px);
            }
            @include tablet {
              margin-right: vw-tablet(10px);
            }
            @include mobile {
              margin-right: vw-mobile(10px);
            }
          }
        }
        &.icon-right {
          flex-direction: row-reverse;
          .icon {
            @include widescreen {
              margin-left: 10px;
            }
            @include desktop {
              margin-left: vw(10px);
            }
            @include tablet {
              margin-left: vw-tablet(10px);
            }
            @include mobile {
              margin-left: vw-mobile(10px);
            }
          }
        }
        &.arrow-down,
        &.arrow-up {
          :global {
            svg {
              height: auto;
              @include widescreen {
                width: 11px;
              }
              @include desktop {
                width: vw(11px);
              }
              @include tablet {
                width: vw-tablet(11px);
              }
              @include mobile {
                width: vw-mobile(11px);
              }
            }
          }
        }
        &.arrow-left,
        &.arrow-right {
          :global {
            svg {
              width: auto;
              @include widescreen {
                height: 11px;
              }
              @include desktop {
                height: vw(11px);
              }
              @include tablet {
                height: vw-tablet(11px);
              }
              @include mobile {
                height: vw-mobile(11px);
              }
            }
          }
        }
        &.lightbulb {
          :global {
            svg {
              height: auto;
              @include widescreen {
                width: 15px;
              }
              @include desktop {
                width: vw(15px);
              }
              @include tablet {
                width: vw-tablet(15px);
              }
              @include mobile {
                width: vw-mobile(15px);
              }
            }
          }
        }
        &.email,
        &.play,
        &.close {
          :global {
            svg {
              height: auto;
              @include widescreen {
                width: 20px;
              }
              @include desktop {
                width: vw(20px);
              }
              @include tablet {
                width: vw-tablet(20px);
              }
              @include mobile {
                width: vw-mobile(20px);
              }
            }
          }
        }
        &.cloud-download {
          :global {
            svg {
              height: auto;
              @include widescreen {
                width: 24px;
              }
              @include desktop {
                width: vw(24px);
              }
              @include tablet {
                width: vw-tablet(24px);
              }
              @include mobile {
                width: vw-mobile(24px);
              }
            }
          }
        }
        &.expand {
          :global {
            svg {
              height: auto;
              @include widescreen {
                width: 12px;
              }
              @include desktop {
                width: vw(12px);
              }
              @include tablet {
                width: vw-tablet(12px);
              }
              @include mobile {
                width: vw-mobile(12px);
              }
            }
          }
        }
      }
    }

    // &.small { }

    // Styles

    &.primary {
      text-decoration: none;
      color: white;

      &.green {
        background: $green-1;
        border-color: $green-2;
        color: white;
        &:hover {
          background: $green-2;
          border-color: $green-3;
        }
        &:focus {
          border-color: white;
          // box-shadow: white 0 0 0 2px;
        }
        &.big {
          border-width: 2px;
          border-style: solid;
        }
      }

      &.orange {
        background: $orange-1;
        border-color: $orange-1;
        color: white;
        &:hover {
          background: $orange-3;
          border-color: $orange-3;
        }
        &:focus {
          box-shadow:
            white 0 0 0 2px,
            0 0 0 4px $orange-1;
          &:hover {
            box-shadow:
              white 0 0 0 2px,
              0 0 0 4px $orange-3;
          }
        }
      }

      &.has-icon {
        :global {
          svg {
            [fill] {
              fill: white;
            }
          }
        }
      }
    }

    &.secondary {
      background: transparent;
      text-decoration: none;

      &.grey-border {
        border-color: $grey-2;
        color: $grey-6;
        :global {
          svg {
            [fill] {
              fill: $grey-5;
            }
          }
        }
      }

      &.white-border {
        border-color: rgba(white, 0.5);
        color: white;
        :global {
          svg {
            [fill] {
              fill: white;
            }
          }
        }
      }

      &.white-text-on-blue {
        color: white;
        border-radius: 3px;
        background-color: rgba($blue-5, 0.8);
        border: 2px solid $blue-3;
        &:hover,
        &:focus {
          background: rgba(white, 0.2);
          border-color: white;
          :global {
            svg {
              [fill] {
                fill: white;
              }
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

      &.blue-focus {
        &:hover,
        &:focus {
          color: $blue-0;
          border-color: $blue-0;
          box-shadow: inset 0 0 0 1px $blue-0;
          :global {
            svg {
              [fill] {
                fill: $blue-0;
              }
            }
          }
        }
        &:focus {
          box-shadow: 0 0 0 1px $blue-0 inset;
        }
      }

      &.orange {
        &:hover,
        &:focus {
          color: $orange-1;
          border-color: $orange-1;
          :global {
            svg {
              [fill] {
                fill: $orange-1;
              }
            }
          }
        }
        &:focus {
          box-shadow: 0 0 0 1px $orange-1;
        }
      }
    }

    &.tertiary {
      padding: 0;
      transition: padding 300ms $easeOutExpo;

      &.blue-text {
        color: $blue-0;
        &:focus,
        &:hover {
          outline: 2px solid $blue-0;
          outline-offset: 2px;
        }
        :global {
          svg {
            [fill] {
              fill: $blue-0;
            }
          }
        }
      }

      &.white-text {
        color: white;
        &:hover,
        &:focus {
          background: rgba(white, 0.1);
          &.medium {
            @include widescreen {
              padding: 0 8px;
            }
            @include desktop {
              padding: 0 vw(8px);
            }
            @include tablet {
              padding: 0 8px; // TODO
            }
            @include mobile {
              padding: 0 8px; // TODO
            }
          }
        }
        &:focus {
          border-color: white;
          box-shadow: 0 0 0 1px white inset;
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

    &.pill {
      font-family: $regular;
      line-height: 100%;
      border: 1px solid $grey-2;
      box-sizing: border-box;
      color: $grey-7;
      transition: background-color 200ms $easeOutExpo;
      box-sizing: border-box;
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
      &.has-icon {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        @include widescreen {
          gap: 6px;
        }
        @include desktop {
          gap: vw(6px);
        }
        @include tablet {
          gap: vw-tablet(6px);
        }
        @include mobile {
          gap: vw-mobile(6px);
        }
        :global {
          svg {
            @include widescreen {
              width: 12px;
              height: 12px;
            }
            @include desktop {
              width: vw(12px);
              height: vw(12px);
            }
            @include tablet {
              width: vw-tablet(12px);
              height: vw-tablet(12px);
            }
            @include mobile {
              width: vw-mobile(12px);
              height: vw-mobile(12px);
            }
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
      transition: background $easeOutExpo 300ms;
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
