<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import { header } from '$lib/state/header.svelte';
  import { page } from '$lib/state/page.svelte';
  import { scroll } from '$lib/state/scroll.svelte';
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import { Button, Svg } from '$lib/components';
  import { mobile, tablet } from '$lib/state/media.svelte';
  import { getProductLinks, getProcessLinks } from '$lib/state/header.svelte';
  import { innerHeight } from 'svelte/reactivity/window';

  let productLinks = $derived(getProductLinks());
  let processLinks = $derived(getProcessLinks());

  type View = 'hamburger' | 'main' | 'products' | 'processes';

  let view = $state<View>('hamburger');

  let topHeight = $state(0);
  let mainHeight = $state(0);
  let productsHeight = $state(0);
  let processesHeight = $state(0);

  let midHeight = $derived.by(() => {
    if (view === 'main') {
      return mainHeight;
    }
    if (view === 'products') {
      return productsHeight;
    }
    if (view === 'processes') {
      return processesHeight;
    }

    return 0;
  });

  let navHeight = $derived.by(() => {
    if (view === 'hamburger') {
      return topHeight;
    }

    return Math.max(topHeight + midHeight, innerHeight.current || 0);
  });

  let expanded = $derived(view !== 'hamburger');
  let showBackButton = $derived(view === 'products' || view === 'processes');
  let nearTop = $derived(scroll.currentY < 100);

  let topBarTitle = $derived.by(() => {
    if (view === 'products') {
      return m.products();
    }

    if (view === 'processes') {
      return m.processes();
    }

    return header.title;
  });

  let classes = $derived([
    expanded ? 'expanded' : 'collapsed',
    `${view}-view`,
    header.theme ? header.theme : 'no-theme',
    nearTop ? 'near-top' : 'not-near-top',
    scroll.goingDown ? 'scrolling-down' : 'scrolling-up',
    showBackButton ? 'show-back-button' : 'no-back-button'
  ]);
</script>

{#if header.visible && (mobile.current || tablet.current)}
  <header id="mobile" class={classes}>
    <nav style:height={`${navHeight}px`}>
      <div id="top" bind:offsetHeight={topHeight}>
        <Button id="logo" url="/" onClick={() => (view = 'hamburger')}>
          <div class="clip">
            <Svg name="primary-interflux-logo" />
          </div>
        </Button>

        <Button icon="chevron-left" theme="square outlined back" onClick={() => (view = 'main')} />

        <h1>{topBarTitle}</h1>

        <Button
          id="hamburger"
          icon="hamburger"
          theme="square outlined {expanded ? 'close' : 'hamburger'}"
          onClick={() => (view = expanded ? 'hamburger' : 'main')}
        />
      </div>

      <div id="mid">
        <div id="main" class="menu" bind:offsetHeight={mainHeight}>
          <Button
            label="Products"
            theme="stacked medium white"
            icon="prescription-bottle"
            onClick={() => (view = 'products')}
          />
          <Button
            label="Processes"
            theme="stacked medium white"
            icon="flask"
            onClick={() => (view = 'processes')}
          />
          <Button
            url="/webinars"
            label="Webinars"
            theme="stacked medium white"
            icon="podcast"
            onClick={() => (view = 'hamburger')}
          />
          <Button
            url="/company"
            label="Company"
            theme="stacked medium white"
            icon="microchip"
            onClick={() => (view = 'hamburger')}
          />
          <Button
            url="documents"
            label="Documents"
            theme="stacked medium white"
            icon="document"
            onClick={() => (view = 'hamburger')}
          />
          <Button
            url="/contact"
            label="Contact"
            theme="stacked medium white"
            icon="street-view"
            onClick={() => (view = 'hamburger')}
          />

          <div class="spacer"></div>
        </div>

        <div id="products" class="menu" bind:offsetHeight={productsHeight}>
          {#each productLinks as link}
            <Button
              url={link.url}
              theme="stacked small white left"
              onClick={() => (view = 'hamburger')}
            >
              <img
                src="{PUBLIC_CDN_HOST}/images/public/mobile-menu-products/{link.img}.jpg"
                role="presentation"
                alt=""
                width="40"
                height="40"
              />

              <span>{link.label}</span>
            </Button>
          {/each}

          <div class="spacer"></div>
        </div>

        <div id="processes" class="menu" bind:offsetHeight={processesHeight}>
          {#each processLinks as link}
            <Button
              url={link.url}
              theme="stacked small white left"
              onClick={() => (view = 'hamburger')}
            >
              <img
                src="{PUBLIC_CDN_HOST}/images/icons/{link.icon}.svg"
                role="presentation"
                alt=""
                width="40"
                height="40"
              />

              <span>{link.label}</span>
            </Button>
          {/each}

          <div class="spacer"></div>
        </div>
      </div>
    </nav>
  </header>
{/if}

<style lang="scss">
  @use '$lib/styles/components' as *;

  :global {
    // z-index: 1 is for #page
    // z-index: 2 is for header#mobile
    // z-index: 3 is for #modal
    header#mobile {
      position: relative;
      z-index: 2;

      // Rather than not rendering the HTML with Ember responsive, we render the
      // HTML and hide it with CSS. This way, Fastboot does not need to know the
      // viewport width. It renders both desktop and mobile navigation.
      @include desktop-and-up {
        display: none;
      }

      &.expanded {
        nav {
          position: relative;
          #top {
            #logo {
              .clip {
                @include tablet {
                  top: 16vw;
                  left: 27vw;
                  width: 46vw;
                  height: 14vw;
                }
                @include mobile {
                  top: 22vw;
                  left: 13vw;
                  width: 70vw;
                  height: 19vw;
                }
                svg {
                  @include tablet {
                    width: 42vw;
                    transform: translate(1.8vw, 1.7vw);
                  }
                  @include mobile {
                    width: 63vw;
                    transform: translate(1.4vw, 1.7vw);
                  }
                }
              }
            }
          }

          #mid {
            .menu {
              opacity: 1;
              transform: translateX(0);
            }
          }
        }
      }

      &.collapsed {
        &.scrolling-down.not-near-top {
          nav {
            transform: translateY(-21vw);
          }
        }

        nav {
          position: fixed;
          #mid {
            .menu {
              opacity: 0;
              transform: translateY(-10vw);
            }
          }
        }
      }

      &.no-back-button {
        .back.button {
          transform: translateX(100vw);
          opacity: 0;
          pointer-events: none;
        }
      }

      &.show-back-button {
        .back.button {
          transform: translateX(0);
          opacity: 1;
        }
      }

      &.hamburger-view,
      &.main-view {
        #logo {
          transform: translateX(0);
        }
        #main {
          left: 0;
        }
        #products {
          left: 100vw;
        }
        #processes {
          left: 100vw;
        }
      }

      &.products-view {
        #logo {
          transform: translateX(-100vw);
        }
        #main {
          left: -100vw;
        }
        #products {
          left: 0;
        }
        #processes {
          left: 100vw;
        }
      }

      &.processes-view {
        #logo {
          transform: translateX(-100vw);
        }
        #main {
          left: -100vw;
        }
        #products {
          left: 100vw;
        }
        #processes {
          left: 0;
        }
      }

      // For overlapping heros
      &.overlap + #page {
        @include tablet {
          margin-top: -9vw;
        }
        @include mobile {
          margin-top: -21vw;
        }
      }

      // For the webinar page
      &.green {
        &.collapsed {
          #top {
            background: rgba(var(--green-3), 0.95);
          }
        }
      }

      nav {
        transition: all var(--ease-out-expo) 800ms;
        background: rgba(var(--blue-5), 0.95);
        width: 100vw;
        overflow: hidden;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        z-index: 10; // max

        @include tablet {
          height: 9vw;
        }
        @include mobile {
          height: 21vw;
        }

        #top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: all var(--ease-out-expo) 800ms;
          transition-property: background, transform;
          position: relative;
          z-index: 1; // to raise the logo on top #mid

          #logo {
            position: absolute;
            transition: all var(--ease-out-expo) 800ms;
            @include tablet {
              margin: 0;
              width: 9vw;
              height: 9vw;
            }
            @include mobile {
              margin: 2vw;
              width: 17vw;
              height: 17vw;
            }
            .clip {
              position: absolute;
              overflow: hidden;
              background: white;
              z-index: 1;
              transition: all var(--ease-out-expo) 800ms;
              top: 0;
              left: 0;
              @include tablet {
                width: 9vw;
                height: 9vw;
              }
              @include mobile {
                width: 17vw;
                height: 17vw;
              }
              svg {
                height: auto;
                transition: all var(--ease-out-expo) 800ms;
                @include tablet {
                  width: 44vw;
                  transform: translate(-5.8vw, 0.3vw);
                }
                @include mobile {
                  width: 80vw;
                  transform: translate(-10.5vw, 1.3vw);
                }
              }
            }
          }

          .back.button {
            transition: all var(--ease-out-expo) 800ms;
          }

          h1 {
            font-family: var(--extra-bold);
            color: white;
            line-height: 120%;
            text-align: center;
            overflow: hidden;
            @include tablet {
              font-size: 3.2vw;
              max-height: calc(3.625vw * 1.3 * 2); // max 2 lines
            }
            @include mobile {
              font-size: 5.625vw;
              max-height: calc(5.625vw * 1.3 * 2); // max 2 lines
            }
          }
        }

        #mid {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;

          .menu {
            position: absolute;
            top: 0;
            width: 100vw;
            display: flex;
            flex-direction: column;
            transition: all var(--ease-out-expo) 800ms;
            &#main {
              padding-top: 30vw; // to allow logo to show
            }
            .spacer {
              height: 30vw;
            }
          }
        }
      }
    }
  }
</style>
