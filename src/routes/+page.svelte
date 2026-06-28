<script lang="ts">
  import { PUBLIC_CDN_HOST as cdnHost } from '$env/static/public';
  import { m } from '$lib/paraglide/messages';
  import { onMount } from 'svelte';
  import { delay, shuffle } from '$lib/helpers';
  import Button from '$lib/components/Button.svelte';
  import Shimmer from '$lib/components/Shimmer.svelte';
  import Link from '$lib/components/Link.svelte';
  import Image from '$lib/components/Image.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import Events from '$lib/components/Events.svelte';
  import { desktop, mobile, tablet, widescreen } from '$lib/state/media.svelte';
  import { sortBy, markdown, spanEachWord } from '$lib/helpers';
  import type { PageProps } from './$types';
  import type { Product, Event } from '$lib/types';

  let { data }: PageProps = $props();

  let isLoading = $derived(!data);
  let products: Product[] = $derived(data.products);
  let events: Event[] = $derived(data.events);

  console.log('✅ /');
  // svelte-ignore state_referenced_locally
  console.log({ products, events });

  let heroPhrase: string = $state('');

  function translatedwords() {
    return [
      m.carousel_1(),
      m.carousel_2(),
      m.carousel_3(),
      m.carousel_4(),
      m.carousel_5(),
      m.carousel_6(),
      m.carousel_7(),
      m.carousel_8()
    ];
  }

  async function startHeroWordLoop() {
    const array = shuffle(translatedwords());

    const n = array.length - 1;

    let i = 0;

    while (i <= n) {
      heroPhrase = array[i];
      i = i < n ? i + 1 : 0;
      await delay(3000);
    }
  }

  onMount(() => {
    startHeroWordLoop();
  });

  let productsExtended = $derived(
    products.map((p) => {
      const familyLabel = p.label || p.subFamily?.nameSingle || p.mainFamily?.nameSingle || '?';

      return { ...p, familyLabel };
    })
  );

  let productsSorted = $derived(productsExtended.sort(sortBy('frontPageRank')));
  let newProducts = $derived(productsSorted.filter((p: Product) => p.status === 'new'));
  let popularProducts = $derived(productsSorted.filter((p: Product) => p.status === 'popular'));
  let popularLayout = $derived.by(() => {
    const n = popularProducts.length;
    return n === 4 || n === 0 ? 'two-columns' : 'three-columns';
  });

  let newLayout = $derived.by(() => {
    return newProducts.length === 4 ? 'two-columns' : 'three-columns';
  });

  let whatWeDo: HTMLElement;

  function showNextSection() {
    const top = whatWeDo.offsetTop;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  let yearCount = $derived.by(() => {
    const today = new Date();
    return today.getFullYear() - 1980;
  });
</script>

<section id="hero">
  <div class="liner">
    <div class="text">
      <h1>
        <small>{m.carousel_lead()}</small>
        <strong>
          {@html markdown(heroPhrase, { noParagraphs: true })}
        </strong>
        <small>{m.ask_interflux()}</small>
      </h1>
    </div>

    <div class="cta">
      <Button onClick={showNextSection} icon="chevron-down" theme="square outlined" />
    </div>

    <div class="image">
      {#if mobile.current}
        <ResponsiveImage
          path="images/public/homepage-hero-mobile"
          variations="@640x1200.jpg,@640x1200.webp"
        />
      {/if}

      {#if tablet.current}
        <ResponsiveImage
          path="images/public/homepage-hero-tablet"
          variations="@1200x1200.jpg,@1200x1200.webp"
        />
      {/if}

      {#if desktop.current || widescreen.current}
        <ResponsiveImage
          path="images/public/homepage-hero-desktop"
          variations="@2400x1200.jpg,@2400x1200.webp"
        />
      {/if}
    </div>
  </div>
</section>

<section id="what-we-do" bind:this={whatWeDo}>
  <div class="liner">
    <h2>{m.what_we_do_h()}</h2>
    <blockquote>
      {@html markdown(m.what_we_do_p(), { noParagraphs: true })}
    </blockquote>
  </div>
</section>

<section id="popular">
  <div class="liner">
    <h2>{m.our_best_selling()}</h2>
    {#if isLoading}
      <ul class="products two-columns">
        <li class="loading">
          <Shimmer shape="square" />
        </li>
        <li class="loading">
          <Shimmer shape="square" />
        </li>
        <li class="loading">
          <Shimmer shape="square" />
        </li>
        <li class="loading">
          <Shimmer shape="square" />
        </li>
      </ul>
    {:else}
      <ul class="products {popularLayout}">
        {#each popularProducts as product (product.id)}
          <li>
            <Button url="/product/{product.id}">
              <div class="image">
                <ResponsiveImage
                  path={product.avatarPath}
                  variations={product.avatarVariations}
                  alt={product.avatarAlt}
                />
              </div>

              <div class="text">
                <h3>{@html spanEachWord(product.name)}</h3>
                <h4>
                  {@html spanEachWord(product.familyLabel)}
                </h4>
              </div>
            </Button>
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</section>

<section id="new">
  <div class="liner">
    <h2>{m.our_newest()}</h2>
    {#if isLoading}
      <ul class="products three-columns">
        <li class="loading">
          <Shimmer shape="square" />
        </li>
        <li class="loading">
          <Shimmer shape="square" />
        </li>
        <li class="loading">
          <Shimmer shape="square" />
        </li>
      </ul>
    {:else}
      <ul class="products {newLayout}">
        {#each newProducts as product (product.id)}
          <li>
            <Button url="/product/{product.id}">
              <div class="image">
                <ResponsiveImage
                  path={product.avatarPath}
                  variations={product.avatarVariations}
                  alt={product.avatarAlt}
                />
              </div>

              <div class="text">
                <h3>{@html spanEachWord(product.name)}</h3>
                <h4>
                  {@html spanEachWord(product.familyLabel)}
                </h4>
              </div>
            </Button>
          </li>
        {/each}
      </ul>
    {/if}
    <div class="cta">
      <Button url="/products" label={m.see_all_products()} size="large" theme="primary green" />
    </div>
  </div>
</section>

{#if isLoading}
  <Events isLoading={true} />
{:else}
  <Events isLoading={false} {events} />
{/if}

<section id="why">
  <div class="liner">
    <h2>{m.why_interflux()}</h2>
    <blockquote>
      {@html markdown(m.we_are_pioneers({ yearCount }), { noParagraphs: true })}
    </blockquote>
    <div class="cta">
      <Button url="/company" label={m.learn_more()} size="large" theme="secondary ghost" />
    </div>
  </div>
</section>

<section id="trusted-by">
  <div class="liner">
    <h2>{m.trusted_by()}</h2>
    <div class="logos">
      <Link url="https://www.kurtzersa.com/">
        <Image
          src="{cdnHost}/images/public/logo-kurtz-ersa@300x168.png"
          width={300}
          height={168}
          alt="logo Kurtz Ersa in Germany"
          id="ersa"
        />
      </Link>

      <Link url="https://www.amw-ems.com/">
        <Image
          src="{cdnHost}/images/public/logo-AMW-the-EMS-solution.png"
          width={300}
          height={121}
          alt="logo AMW the EMS solution in Thailand"
          id="amw"
        />
      </Link>

      <Link url="https://abanelectronics.com/">
        <Image
          src="{cdnHost}/images/public/logo-aban-electronics@300x121.jpg"
          width={300}
          height={121}
          alt="logo ABAN Electronics in India"
          id="aban"
        />
      </Link>

      <Link url="https://www.vlktechno.com/">
        <Image
          src="{cdnHost}/images/public/logo-VLK-techno-trade@300x180.png"
          width={300}
          height={180}
          alt="logo VLK Techno in Thailand"
          id="vlk-techno"
        />
      </Link>

      <Link url="https://www.oritech.com.au/">
        <Image
          src="{cdnHost}/images/public/logo-oritech.svg"
          width={300}
          height={168}
          alt="logo Oritech in Australia"
          id="oritech"
        />
      </Link>

      <Image
        src="{cdnHost}/images/public/logo-edstachem.png"
        width={300}
        height={231}
        alt="logo Edstachem Vietnam"
        id="edstachem"
      />
    </div>
  </div>
</section>

<style lang="scss">
  @use '$lib/styles/components' as *;

  #hero {
    position: relative;
    overflow: hidden;
    background-color: var(--blue-4);
    &:after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: rgba(var(--blue-4), 0.7);
      @include widescreen {
        height: 25px;
      }
      @include desktop {
        height: vw(25px);
      }
      @include tablet {
        height: 3vw;
      }
      @include mobile {
        height: 5vw;
      }
    }
    .liner {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .text {
      position: absolute;
      z-index: 1;
      h1 {
        line-height: 100%;
        font-family: var(--bold);
        text-align: center;
        color: white;
        display: flex;
        flex-direction: column;
        small {
          font-family: var(--semi-bold);
          @include widescreen {
            font-size: 20px;
          }
          @include desktop {
            font-size: vw(20vw);
          }
          @include tablet {
            font-size: 3vw;
          }
          @include mobile {
            font-size: 6vw;
          }
        }
        strong {
          display: block;
          font-family: var(--extra-bold);
          @include widescreen {
            font-size: 48px;
            margin: 40px 0;
          }
          @include desktop {
            font-size: vw(48vw);
            margin: vw(40px) 0;
          }
          @include tablet {
            font-size: 7vw;
            margin: 7vw 0;
          }
          @include mobile {
            font-size: 9vw;
            margin: 10vw 0;
          }
          :global {
            mark {
              position: relative;
              background: none;
              color: white;
              &:after {
                content: '';
                position: absolute;
                background: var(--orange-1);
                z-index: -1;
                @include widescreen {
                  height: 48px;
                  width: calc(100% + 15px);
                  left: -7.5px;
                  top: 8px;
                }
                @include desktop {
                  height: vw(48px);
                  width: calc(100% + #{vw(15px)});
                  left: vw(-7.5px);
                  top: vw(8px);
                }
                @include tablet {
                  height: 7vw;
                  width: calc(100% + 2vw);
                  left: -1vw;
                  top: 1.1vw;
                }
                @include mobile {
                  height: 10vw;
                  width: calc(100% + 3vw);
                  left: -1.5vw;
                  top: 0.8vw;
                }
              }
            }
          }
        }
      }
    }
    :global {
      .cta {
        position: relative;
        z-index: 1;
        position: absolute;
        bottom: 5vw;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    .image {
      position: relative;
      z-index: 0;
      display: flex;
      align-items: center;
      @include widescreen {
        max-height: 640px;
      }
      @include desktop {
        max-height: vw(640px);
      }
      :global {
        figure {
          background-color: transparent;
          picture {
            height: auto;
            img {
              width: 100vw;
            }
          }
        }
      }
    }
  }
  h2 {
    text-align: center;
    font-family: var(--semi-bold);
    color: var(--grey-7);
    @include widescreen {
      font-size: 20px;
    }
    @include desktop {
      font-size: vw(20px);
    }
    @include tablet {
      font-size: 2.6vw;
    }
    @include mobile {
      font-size: 5vw;
    }
  }
  #what-we-do,
  #why {
    background: var(--blue-5);
    @include widescreen {
      border-bottom: 25px solid var(--blue-4);
      border-top: 25px solid var(--blue-4);
    }
    @include desktop {
      border-bottom: vw(25px) solid var(--blue-4);
      border-top: vw(25px) solid var(--blue-4);
    }
    @include tablet {
      border-bottom: 3vw solid var(--blue-4);
      border-top: 3vw solid var(--blue-4);
    }
    @include mobile {
      border-bottom: 5vw solid var(--blue-4);
      border-top: 5vw solid var(--blue-4);
    }
    .liner {
      @include widescreen {
        padding: 150px 50px;
      }
      @include desktop {
        padding: vw(150px) vw(50px);
      }
      @include tablet {
        padding: 28vw 10vw;
      }
      @include mobile {
        padding: 42vw 10vw;
      }
    }
    h2 {
      color: white;
      @include widescreen {
        margin-bottom: 40px;
      }
      @include desktop {
        margin-bottom: vw(40px);
      }
      @include tablet {
        margin-bottom: 7.6vw;
      }
      @include mobile {
        margin-bottom: 10vw;
      }
    }
    blockquote {
      font-family: var(--regular);
      text-align: center;
      color: white;
      line-height: 150%;
      margin: 0 auto;
      @include widescreen {
        font-size: 32px;
      }
      @include desktop {
        font-size: vw(32px);
      }
      @include tablet {
        font-size: 3.8vw;
      }
      @include mobile {
        font-size: 6.875vw;
      }
      :global {
        strong {
          font-family: var(--extra-bold);
        }
      }
    }
    :global {
      p {
        color: white;
        text-align: center;
        @include widescreen {
          margin: 40px auto 0;
          max-width: 500px;
        }
        @include desktop {
          margin: vw(40px) auto 0;
          max-width: vw(500px);
        }
        @include tablet {
        }
        @include mobile {
        }
      }
    }
    :global {
      .cta {
        display: flex;
        justify-content: center;
        @include widescreen {
          margin-top: 32px;
        }
        @include desktop {
          margin-top: vw(32px);
        }
        @include tablet {
          margin-top: 7.6vw;
        }
        @include mobile {
          margin-top: 10vw;
        }
      }
    }
  }
  #what-we-do {
    blockquote {
      @include widescreen {
        max-width: 550px;
      }
      @include desktop {
        max-width: vw(550px);
      }
      @include tablet {
        max-width: 70vw;
      }
    }
  }
  #why {
    blockquote {
      @include widescreen {
        max-width: 550px;
      }
      @include desktop {
        max-width: vw(550px);
      }
      @include tablet {
        max-width: 80%;
      }
    }
  }
  #popular,
  #new {
    h2 {
      @include widescreen {
        margin: 160px auto 80px;
      }
      @include desktop {
        margin: vw(160px) auto vw(80px);
      }
      @include tablet {
        margin: 20vw auto 10vw;
      }
      @include mobile {
        margin: 30vw auto 20vw;
      }
    }
    h3 {
      font-family: var(--extra-bold);
      color: white;
      line-height: 160%;
      @include widescreen {
        font-size: 26px;
      }
      @include desktop {
        font-size: vw(26px);
      }
      @include tablet {
        font-size: 3.2vw;
      }
      @include mobile {
        font-size: 6vw;
      }
      :global {
        span {
          position: relative;
          &:after {
            content: '';
            position: absolute;
            background: var(--blue-3);
            z-index: -1;
            @include widescreen {
              height: calc(100% + 4px);
              width: calc(100% + 28px);
              left: -14px;
              top: -2px;
            }
            @include desktop {
              height: calc(100% + #{vw(4px)});
              width: calc(100% + #{vw(28px)});
              left: vw(-14px);
              top: vw(-2px);
            }
            @include tablet {
              height: calc(100% + 0.4vw);
              width: calc(100% + 3.2vw);
              left: -1.6vw;
              top: -0.2vw;
            }
            @include mobile {
              height: calc(100% + 1.6vw);
              width: calc(100% + 6vw);
              left: -3vw;
              top: -0.8vw;
            }
          }
        }
      }
    }
    h4 {
      font-family: var(--regular);
      color: white;
      line-height: 160%;
      @include tablet {
        font-size: 16px;
      }
      @include tablet {
        font-size: 16px;
      }
      @include tablet {
        font-size: 2.2vw;
      }
      @include mobile {
        font-size: 5vw;
      }
      :global {
        span {
          position: relative;
          &:after {
            content: '';
            position: absolute;
            background: var(--blue-0);
            z-index: -1;
            @include widescreen {
              height: calc(100% + 4px);
              width: calc(100% + 20px);
              left: -10px;
              top: -2px;
            }
            @include desktop {
              height: calc(100% + #{vw(4px)});
              width: calc(100% + #{vw(20px)});
              left: vw(-10px);
              top: vw(-2px);
            }
            @include tablet {
              height: calc(100% + 0.4vw);
              width: calc(100% + 3.2vw);
              left: -1.6vw;
              top: -0.2vw;
            }
            @include mobile {
              height: calc(100% + 0.8vw);
              width: calc(100% + 6vw);
              left: -3vw;
              top: -0.4vw;
            }
          }
        }
      }
    }
    h3 + h4 {
      @include widescreen {
        margin-top: 2px;
      }
      @include desktop {
        margin-top: vw(2px);
      }
      @include tablet {
        margin-top: 1.4vw;
      }
      @include mobile {
        margin-top: 1vw;
      }
    }
    ul.products {
      margin: 0 auto;
      @include widescreen {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 900px;
      }
      @include desktop {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 900px;
      }
      @include tablet {
        background: var(--grey-1);
        padding: 1px 0;
      }
      @include mobile {
        background: var(--grey-1);
        padding: 1px 0;
      }
      &.two-columns {
        @include widescreen {
          max-width: 600px;
        }
        @include desktop {
          max-width: 600px;
        }
      }
      li {
        background: white;
        box-sizing: border-box;
        @include widescreen {
          width: 300px;
          height: 300px;
          padding: 10px;
        }
        @include desktop {
          width: 300px;
          height: 300px;
          padding: 10px;
        }
        &.loading {
          :global {
            svg {
              background-color: var(--grey-0);
              width: 100vw;
              height: 100vw;
              max-width: 100%;
              max-height: 100%;
            }
          }
        }
        & + li {
          margin-top: 1px;
        }
        :global {
          a {
            display: flex;
            align-items: center;
            position: relative;
            border-radius: 2px;
            overflow: hidden;
            outline: none;
            @include widescreen {
              width: 100%;
              height: 100%;
              text-align: center;
            }
            @include desktop {
              width: 100%;
              height: 100%;
              text-align: center;
            }
            @include tablet {
              padding: 0 5vw 0 15vw;
              justify-content: flex-start;
            }
            @include mobile {
              flex-direction: column;
              justify-content: center;
              padding: 9vw;
            }
            &:hover,
            &:focus {
              box-shadow:
                0 0 0 4px white,
                0 0 0 6px var(--blue-0);
              img {
                transform: scale(1.1);
              }
            }
          }
        }
        .image {
          @include widescreen {
            width: 100%;
            height: 100%;
          }
          @include desktop {
            width: 100%;
            height: 100%;
          }
          @include tablet {
            padding: 2vw;
            width: 25vw;
            height: 25vw;
          }
          @include mobile {
            width: 70vw;
            height: 70vw;
          }
          :global {
            img {
              transition: transform 300ms var(--ease-out-expo);
            }
          }
        }
        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 0;
          @include widescreen {
            position: absolute;
            width: 100%;
          }
          @include desktop {
            position: absolute;
            width: 100%;
          }
          @include tablet {
            align-items: flex-start;
            padding-left: 3vw;
          }
          @include mobile {
            margin-top: -5vw;
            align-items: center;
          }
        }
      }
    }
    .cta {
      @include widescreen {
        margin: 80px auto 160px;
      }
      @include desktop {
        margin: vw(80px) auto vw(160px);
      }
      @include tablet {
        margin: 10vw auto 20vw;
      }
      @include mobile {
        margin: 20vw auto 30vw;
      }
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  #trusted-by {
    .liner {
      @include widescreen {
        padding-bottom: 160px;
      }
      @include desktop {
        padding-bottom: 160px;
      }
      @include tablet {
        padding: 24vw 5vw;
      }
      @include mobile {
        padding: 28vw 5vw;
      }
    }
    h2 {
      @include widescreen {
        margin: 160px auto 80px;
      }
      @include desktop {
        margin: vw(160px) auto vw(80px);
      }
      @include tablet {
        margin: 0 auto 10vw;
      }
      @include mobile {
        margin: 0 auto 20vw;
      }
    }
    .logos {
      display: flex;
      flex-flow: wrap;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      @include widescreen {
        gap: 40px;
        max-width: 1000px;
      }
      @include desktop {
        gap: vw(40px);
        max-width: vw(1000px);
      }
      @include tablet {
        gap: 10vw;
        width: 80%;
      }
      @include mobile {
        gap: 5vw;
        width: 60%;
      }
    }
    :global {
      picture {
        height: auto;
        @include widescreen {
          width: 240px;
        }
        @include desktop {
          width: vw(240px);
        }
        @include tablet {
          width: 30vw;
        }
        @include mobile {
          width: 45vw;
        }
        &#amw {
          transform: scale(0.7);
        }
        &#aban {
          transform: scale(0.8);
        }
        &#oritech {
          background: #006464;
          padding: 2vw;
          box-sizing: border-box;
          transform: scale(0.9);
        }
      }
    }
  }
</style>
