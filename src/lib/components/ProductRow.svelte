<script lang="ts">
  import type { Product, Image } from '$lib/types';
  import Svg from '$lib/components/Svg.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import { mark } from '$lib/helpers/mark';
  import chain from '$lib/helpers/chain';
  import { m } from '$lib/paraglide/messages';
  import { markdown } from '$lib/helpers';

  interface Props {
    product: Product;
    search?: string;
    alternativeAvatar?: Image;
  }

  let { product, search, alternativeAvatar }: Props = $props();

  let status = $derived(product.status);

  let searchMatch = $derived.by(() => {
    // Show if there is no search query.
    if (!search) {
      return true;
    }

    // Show if the search term matches the search query.
    if (product.name.toLowerCase().includes(search.toLowerCase())) {
      return true;
    }

    // Hide if name does not match and product has no pitch.
    if (!product.pitch) {
      return false;
    }

    // Hide if the product has a superior product. This will hide the pitch.
    if (product.superiorProduct.id) {
      return false;
    }

    const pitch = product.pitch;

    // Show if the first 180 characters of the pitch contain the search term.
    return pitch.slice(0, 180).includes(search);
  });

  let features = $derived.by(() => {
    const uses = product.productUsesSorted
      ? chain(product.productUsesSorted).filterBy('showOnProductList').mapBy('use').toArray()
      : [];

    const qualities = product.productQualitiesSorted
      ? chain(product.productQualitiesSorted)
          .filterBy('showOnProductList')
          .mapBy('quality')
          .toArray()
      : [];

    return [...uses, ...qualities];
  });

  let replacedBy = $derived(() => {
    const a = product.name;
    const b = product.superiorProduct.name;

    return m.a_has_been_replace_by_b({ a, b });
  });

  let familyLabel = $derived.by(() => {
    if (product.label) {
      return product.label;
    }

    if (product.subFamily?.id) {
      return product.subFamily.nameSingle;
    }

    if (product.mainFamily?.id) {
      return product.mainFamily.nameSingle;
    }

    console.warn(`${product.name} does not have a label, nor sub, nor main family`);

    return '?';
  });
</script>

<li id={product.id} class="product-row {product.status} {searchMatch ? 'match' : 'hide'}">
  <a href="/product/{product.id}">
    <div class="left">
      {#if product.avatarPath}
        <ResponsiveImage
          path={product.avatarPath}
          variations={product.avatarVariations}
          alt={product.avatarAlt}
        />
      {:else}
        <div class="no-image">
          <Svg name="interflux" />
        </div>
      {/if}
    </div>

    <div class="center">
      <h3 class="h3">
        {@html mark(product.name, search)}
      </h3>
      <div class="tags">
        <h4 class="blue">
          {familyLabel}
        </h4>
        {#if status === 'new'}
          <h4 class="orange">{m.new()}</h4>
        {/if}
        {#if status === 'popular'}
          <h4 class="orange">{m.popular()}</h4>
        {/if}
        {#if status === 'outdated'}
          <h4 class="blue">{m.outdated()}</h4>
        {/if}
        {#if status === 'discontinued'}
          <h4 class="red">{m.out_of_production()}</h4>
        {/if}
      </div>
      {#if product.superiorProduct?.id}
        <p>{replacedBy}</p>
      {:else}
        {#if product.pitch}
          <div class="pitch">
            {#if search}
              {@html mark(markdown(product.pitch), search)}
            {:else}
              {@html markdown(product.pitch)}
            {/if}
          </div>
        {/if}
        {#if features}
          <div class="features">
            {#each features as feature (feature.id)}
              <div class="feature">
                <!-- <Image @src={feature.iconURL} /> -->
                <img src={feature.iconURL} alt={feature.text} />
                <div class="callout">
                  <span>
                    <!-- TODO: translate -->
                    {feature.text}
                  </span>
                </div>
              </div>
            {/each}
          </div>
        {/if}
      {/if}
    </div>

    <div class="right">
      <Svg name="arrow-right" />
    </div>
  </a>
</li>

<style lang="scss">
  @use '$lib/styles/components' as *;

  .product-row {
    &.hide {
      display: none;
    }
    &.outdated,
    &.discontinued {
      h3,
      h4:not(.red) {
        background-color: var(--grey-5) !important;
      }
      img {
        filter: grayscale(1) opacity(0.8);
      }
    }
    a {
      position: relative;
      z-index: 0;
      border-top: 1px solid var(--grey-1);
      border-bottom: 1px solid var(--grey-1);
      margin-top: -1px;
      background: white;
      text-decoration: none;
      outline-offset: -1px;
      display: flex;
      transition: box-shadow 150ms ease-out;
      @include widescreen {
        justify-content: space-between;
        align-items: center;
        min-height: 266px;
      }
      @include desktop {
        justify-content: space-between;
        align-items: center;
        min-height: vw(266px);
      }
      @include tablet {
        padding: 5vw 3vw;
      }
      @include mobile {
        flex-direction: column;
        padding: 10vw 0;
        padding: 5vw 0 10vw;
      }
      &:hover,
      &:focus {
        z-index: 1;
        outline: 0;
        @include widescreen {
          box-shadow:
            0 0 0 2px var(--blue-0),
            0 0 12px RGBA(0, 0, 0, 0.1);
        }
        @include desktop {
          box-shadow:
            0 0 0 2px var(--blue-0),
            0 0 12px RGBA(0, 0, 0, 0.1);
        }
        .right {
          svg {
            [fill] {
              fill: var(--blue-0);
            }
          }
        }
      }
      .left {
        flex-shrink: 0;
        @include widescreen {
          padding: px(1vw);
        }
        @include desktop {
          padding: 1vw;
        }
        @include tablet {
          display: flex;
          justify-content: center;
        }
        @include mobile {
          display: flex;
          justify-content: center;
        }
        .no-image {
          filter: grayscale(1) opacity(0.2) brightness(0.7);
        }
        :global {
          .responsive-image,
          .no-image svg {
            @include widescreen {
              width: 240px;
              height: 240px;
            }
            @include desktop {
              width: vw(240px);
              height: vw(240px);
            }
            @include tablet {
              width: 27vw;
              height: 27vw;
            }
            @include mobile {
              width: 90vw;
              height: 90vw;
            }
          }
        }
      }
      .center {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        box-sizing: border-box;
        @include widescreen {
          padding: px(1.666vw);
        }
        @include desktop {
          padding: 1.666vw;
        }
        @include tablet {
          padding: 0 0 0 3vw;
          justify-content: center;
        }
        @include mobile {
          padding: 6vw 5vw;
        }
        h3 {
          background: var(--blue-3);
          font-family: var(--extra-bold);
          color: white;
          line-height: 144%;
          @include widescreen {
            font-size: 25px;
            padding: 1px 15px 0;
            border-radius: 2px;
          }
          @include desktop {
            font-size: vw(25px);
            padding: vw(1px) vw(15px) 0;
            border-radius: vw(2px);
          }
          @include tablet {
            font-size: 3.2vw;
            padding: 0.4vw 1.5vw 0.3vw;
            border-radius: 0.2vw;
          }
          @include mobile {
            font-size: 6vw;
            padding: 1.2vw 4vw 0.6vw;
            border-radius: 0.5vw;
          }
          mark {
            background-color: transparent;
            color: white;
            display: inline-block;
            position: relative;
            &:after {
              content: '';
              position: absolute;
              left: 0;
              bottom: 3px;
              height: 3px;
              width: 100%;
              background-color: yellow;
            }
          }
        }
        .tags {
          display: flex;
          margin: 10px 0 15px;
          @include widescreen {
            margin: px(0.8333vw) 0 px(1.25vw);
          }
          @include desktop {
            margin: 0.8333vw 0 1.25vw;
          }
          @include tablet {
            align-items: flex-start;
            margin: 1vw 0 2vw;
          }
          @include mobile {
            flex-direction: column;
            align-items: flex-start;
            margin: 2vw 0 6vw;
          }
          h4 {
            font-family: var(--regular);
            color: white;
            flex-shrink: 0;
            line-height: 150%;
            @include widescreen {
              font-size: 16px;
              padding: 1px 10px 0;
              border-radius: 2px;
            }
            @include desktop {
              font-size: vw(16px);
              padding: vw(1px) vw(10px) 0;
              border-radius: vw(2px);
            }
            @include tablet {
              font-size: 1.8vw;
              padding: 0.3vw 1.2vw 0.2vw;
              border-radius: 0.2vw;
            }
            @include mobile {
              font-size: 4vw;
              padding: 0.7vw 2.6vw 0.5vw;
              border-radius: 0.5vw;
            }
            &.blue {
              background: var(--blue-0);
            }
            &.orange {
              background: var(--orange-2);
              font-family: var(--semi-bold);
            }
            &.grey {
              background: var(--grey-5);
            }
            &.red {
              background: var(--red-1);
            }
            & + h4 {
              @include widescreen {
                margin-left: px(0.41666vw);
              }
              @include desktop {
                margin-left: 0.41666vw;
              }
              @include tablet {
                margin-left: 1vw;
              }
              @include mobile {
                margin: 2vw 1vw 0 0;
              }
            }
          }
        }
        .pitch {
          overflow: hidden;
          text-overflow: ellipsis;
          width: 100%;
          color: var(--grey-7);
          @include widescreen {
            max-height: calc(3 * 16px * 1.8);
          }
          @include desktop {
            max-height: calc(3 * vw(16px) * 1.8);
          }
          @include tablet {
            max-height: calc(4 * 2vw * 1.8);
          }
          @include mobile {
            max-height: calc(4 * 5vw * 1.8);
          }
          p {
            @include paragraph;
            position: relative;
            &:after {
              content: '';
              position: absolute;
              bottom: 0;
              right: 0;
              width: 100%;
              background: linear-gradient(to right, rgba(white, 0) 50%, rgba(white, 1) 100%);
              @include widescreen {
                height: calc(16px * 1.8);
              }
              @include desktop {
                height: calc(1.333vw * 1.8);
              }
              @include tablet {
                height: calc(2.2vw * 1.8);
              }
              @include mobile {
                height: calc(5vw * 1.8);
              }
            }
            mark {
              background-color: yellow;
              color: var(--grey-7);
            }
          }
        }
      }
      .right {
        flex-shrink: 0;
        @include widescreen {
          padding: 20px;
        }
        @include desktop {
          padding: vw(20px);
        }
        @include tablet {
          display: none;
        }
        @include mobile {
          display: none;
        }
        :global {
          svg {
            height: auto;
            @include widescreen {
              width: 10px;
            }
            @include desktop {
              width: vw(10px);
            }
            [fill] {
              fill: #c5c5c5;
              transition: fill 150ms ease-out;
            }
          }
        }
      }
    }
    .features {
      display: flex;
      @include widescreen {
        margin-top: 15px;
      }
      @include desktop {
        margin-top: vw(15px);
      }
      @include tablet {
        display: none;
      }
      @include mobile {
        display: none;
      }
      .feature {
        position: relative;
        flex-shrink: 0;
        @include widescreen {
          width: 30px;
          height: 30px;
          margin-right: 10px;
        }
        @include desktop {
          width: vw(30px);
          height: vw(30px);
          margin-right: vw(10px);
        }
        &:hover {
          z-index: 1;
          cursor: pointer;
          picture {
            transform: scale(2);
            @include widescreen {
              box-shadow: 0 2px 4px rgba(black, 0.2);
            }
            @include desktop {
              box-shadow: 0 vw(2px) vw(4px) rgba(black, 0.2);
            }
          }
          .callout {
            opacity: 1;
          }
        }
        .callout {
          display: flex;
          justify-content: center;
          pointer-events: none;
          opacity: 0;
          white-space: nowrap;
          @include widescreen {
            transform: translateY(20px);
          }
          @include desktop {
            transform: translateY(vw(20px));
          }
          span {
            background: var(--blue-3);
            background: white;
            color: white;
            color: var(--grey-7);
            @include widescreen {
              padding: 3px 7px;
              box-shadow: 0 2px 4px rgba(black, 0.2);
            }
            @include desktop {
              padding: vw(3px) vw(7px);
              box-shadow: 0 vw(2px) vw(4px) rgba(black, 0.2);
            }
          }
        }
        :global {
          picture {
            width: 100%;
            height: 100%;
            pointer-events: none;
          }
        }
      }
    }
  }
</style>
