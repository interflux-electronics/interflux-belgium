<script lang="ts">
  import type { PageProps } from './$types';
  import { HeaderHero } from '$lib/components';
  import { m } from '$lib/paraglide/messages';
  import Button from '$lib/components/Button.svelte';
  import ContactTriage from '$lib/components/ContactTriage.svelte';
  import ContactSearch from '$lib/components/ContactSearch.svelte';
  import { PUBLIC_CDN_HOST as cdnHost } from '$env/static/public';

  let { data }: PageProps = $props();

  let isLoading = $derived(!data);
  let companies = $derived(data.companies);
</script>

<HeaderHero h1={m.contact()} theme="two" />

<section id="map">
  <div class="liner">
    <h2 class="h2">{m.contact_map_1()}</h2>
    <p>{m.contact_map_2()}</p>

    <div class="container">
      {#if isLoading}
        <p>{m.loading()}</p>
        <div class="preload"></div>
      {:else}
        <Button url="/contact/map" class="map">
          <img
            src="{cdnHost}/images/public/interflux-network-map/interflux-network-map@1000x450.webp"
            alt="the interflux network"
            width="1000"
            height="450"
          />
          <div class="preload"></div>
        </Button>

        <Button
          url="/contact/map"
          label={m.contact_map_3()}
          icon="expand"
          size="large"
          theme="secondary ghost"
        />
      {/if}
    </div>
  </div>
</section>

<ContactTriage {isLoading} />

<ContactSearch {isLoading} {companies} />

<section id="partner">
  <div class="liner">
    <div class="image">
      <img
        src="{cdnHost}/images/public/containers-at-port/containers-at-port@600x400.webp"
        alt="containers at port in Singapore"
        width="300"
        height="200"
      />
      <div class="preload"></div>
    </div>

    <div class="text">
      <h2 class="h2">{m.contact_partner_1()}</h2>
      <p>{m.contact_partner_2()}</p>

      <Button
        label="ask@interflux.com"
        theme="primary orange"
        size="large"
        icon="email"
        url="mailto:ask@interflux.com"
      />
    </div>
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  #map {
    .liner {
      display: flex;
      flex-direction: column;
      align-items: center;
      @include widescreen {
        padding: 80px 0;
      }
      @include desktop {
        padding: vw(80px) 0;
      }
      @include tablet {
        padding: 14vw 5vw;
      }
      @include mobile {
        padding: 28vw 5vw;
      }
    }

    h2 {
      text-align: center;
      @include widescreen {
        margin-bottom: 32px;
        line-height: 100%;
      }
      @include desktop {
        margin-bottom: vw(32px);
        line-height: 100%;
      }
    }

    p {
      text-align: center;
      @include widescreen {
        margin-bottom: 32px;
        max-width: 560px;
      }
      @include desktop {
        margin-bottom: vw(32px);
        max-width: vw(560px);
      }
      @include tablet {
        margin: 4vw 0 5.5vw;
        max-width: 70vw;
      }
      @include mobile {
        margin: 6vw 0 9vw;
      }
    }

    .container {
      position: relative;
      width: 100%;
      overflow: hidden;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--blue-4);
      @include widescreen {
        border-radius: 10px;
        max-width: 1000px;
        height: 450px;
      }
      @include desktop {
        border-radius: vw(10px);
        max-width: vw(1000px);
        height: vw(450px);
      }
      @include tablet {
        width: 90vw;
        height: 40vw;
        border-radius: 1vw;
      }
      @include mobile {
        width: 90vw;
        height: 70vw;
        border-radius: 2vw;
      }
      p {
        position: relative;
        z-index: 1;
        color: white;
        margin: 0;
      }
      :global {
        a.map {
          display: block;
          position: absolute;
          z-index: 0;
          &:hover,
          &:focus {
            & + .expand {
              background: rgba(white, 0.2);
              border-color: white;
              svg {
                [fill] {
                  fill: white;
                }
              }
            }
          }
          img {
            @include widescreen {
              width: 1000px;
              height: auto;
            }
            @include desktop {
              width: vw(1000px);
              height: auto;
            }
            @include tablet {
              width: 100%;
              height: auto;
            }
            @include mobile {
              width: auto;
              height: 90vw;
            }
          }
        }
        a.expand {
          position: relative;
          z-index: 1;
        }
      }

      .preload {
        position: absolute;
        z-index: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-image: url('data:image/webp;base64,#{$interflux-network-map}');
        background-size: 100% 100%;
        filter: blur(15px);
        overflow: hidden;
        @include widescreen {
          border-radius: 10px;
        }
        @include desktop {
          border-radius: vw(10px);
        }
        @include tablet {
          border-radius: 1vw;
        }
        @include mobile {
          border-radius: 2vw;
        }
      }
      img {
        position: relative;
        z-index: 1;
      }
      :global {
        button {
          position: absolute;
          z-index: 2;
          color: white;
        }
      }
    }
  }

  #partner {
    .liner {
      display: flex;
      @include widescreen {
        gap: 35px;
        padding: 100px 30px;
        max-width: 900px;
        align-items: stretch;
      }
      @include desktop {
        gap: vw(35px);
        padding: vw(100px) vw(30px);
        max-width: vw(900px);
        align-items: stretch;
      }
      @include tablet {
        transform: translateX(-4vw);
        padding: 14vw 5vw;
        align-items: center;
      }
      @include mobile {
        gap: 8vw;
        flex-direction: column;
        padding: 28vw 5vw;
      }
    }

    img {
      height: auto;
      @include widescreen {
        width: 300px;
      }
      @include desktop {
        width: vw(300px);
      }
      @include tablet {
        width: vw-tablet(300px);
        transform: rotate(-90deg);
      }
      @include mobile {
        width: 100%;
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      @include desktop-and-up {
        align-items: flex-start;
        justify-content: space-between;
      }
      @include tablet {
        align-items: flex-start;
      }
      @include mobile {
        align-items: center;
      }
      h2 {
        @include widescreen {
          line-height: 100%;
        }
        @include desktop {
          line-height: 100%;
        }
        @include tablet {
          line-height: 100%;
        }
        @include mobile {
          text-align: center;
          width: 70%;
        }
      }
      p {
        @include tablet {
          margin: 3vw 0;
        }
        @include mobile {
          margin: 6vw 0 8vw;
          text-align: center;
        }
      }
    }
  }
</style>
