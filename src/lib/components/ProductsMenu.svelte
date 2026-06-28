<script lang="ts">
  import { Menu, Svg } from '$lib/components';
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import { m } from '$lib/paraglide/messages';
  import { getProductLinks } from '$lib/state/header.svelte';

  let links = $derived(getProductLinks());

  let imagePosition = $state(0);

  function showImage(i: number) {
    imagePosition = i;
  }
</script>

<Menu id="products">
  <div class="links">
    <h2>{m.products_we_develop()}</h2>

    {#each links as link, i}
      <a href={link.url} onfocus={(e) => showImage(i)} onmouseenter={(e) => showImage(i)}>
        <span>{link.label}<Svg name="arrow-right" /></span>
      </a>
    {/each}
  </div>

  <div class="image" data-position={imagePosition}>
    <img
      src="{PUBLIC_CDN_HOST}/images/public/products-menu-sprite@666x5328.webp"
      role="presentation"
      alt=""
    />
  </div>
</Menu>

<style lang="scss">
  @use '$lib/styles/components' as *;

  // The width and length of one square sprite image.
  $size-px: 372px;

  // divided by 1200
  $size-vw: 31vw;

  :global {
    header#desktop li#products {
      .menu {
        .box {
          @include widescreen {
            width: 660px;
            transform: translate(-58px);
          }
          @include desktop {
            width: vw(660px);
            transform: translate(#{vw(-58px)});
          }
        }
        .callout {
          @include widescreen {
            left: 70px;
          }
          @include desktop {
            left: vw(70px);
          }
        }
        .image {
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          @include widescreen {
            border-radius: 0 5px 5px 0;
            width: $size-px;
            height: $size-px;
          }
          @include desktop {
            border-radius: 0 vw(5px) vw(5px) 0;
            width: $size-vw;
            height: $size-vw;
          }
          &[data-position='1'] {
            img {
              @include widescreen {
                transform: translateY(0px);
              }
              @include desktop {
                transform: translateY(0px);
              }
            }
          }
          &[data-position='2'] {
            img {
              @include widescreen {
                transform: translateY(#{$size-px * -1});
              }
              @include desktop {
                transform: translateY(#{$size-vw * -1});
              }
            }
          }
          &[data-position='3'] {
            img {
              @include widescreen {
                transform: translateY(#{$size-px * -2});
              }
              @include desktop {
                transform: translateY(#{$size-vw * -2});
              }
            }
          }
          &[data-position='4'] {
            img {
              @include widescreen {
                transform: translateY(#{$size-px * -3});
              }
              @include desktop {
                transform: translateY(#{$size-vw * -3});
              }
            }
          }
          &[data-position='5'] {
            img {
              @include widescreen {
                transform: translateY(#{$size-px * -4});
              }
              @include desktop {
                transform: translateY(#{$size-vw * -4});
              }
            }
          }
          &[data-position='6'] {
            img {
              @include widescreen {
                transform: translateY(#{$size-px * -5});
              }
              @include desktop {
                transform: translateY(#{$size-vw * -5});
              }
            }
          }
          &[data-position='7'] {
            img {
              @include widescreen {
                transform: translateY(#{$size-px * -6});
              }
              @include desktop {
                transform: translateY(#{$size-vw * -6});
              }
            }
          }
          &[data-position='8'] {
            img {
              @include widescreen {
                transform: translateY(#{$size-px * -7});
              }
              @include desktop {
                transform: translateY(#{$size-vw * -7});
              }
            }
          }
        }
        img {
          width: 100%;
          height: 800%;
          max-width: none;
          max-height: none;
          transition: transform 1200ms var(--ease-out-expo);
        }
      }
    }
  }
</style>
