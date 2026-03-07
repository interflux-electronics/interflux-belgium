<script lang="ts">
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import { Svg, ProductsMenu, ProcessesMenu, LanguageMenu } from '$lib/components';
  import { m } from '$lib/paraglide/messages';
  import { markdown } from '$lib/helpers';
  import { header } from '$lib/state/header.svelte';
  import { page } from '$app/state';

  function closeMenu() {
    header.shownMenu = 'none';
  }

  function toggleMenu(name: string, event: MouseEvent) {
    // Prevent the <Page> component from closing the menu.
    event.stopPropagation();

    // In case this menu is already open, then close it.
    if (header.shownMenu === name) {
      return closeMenu();
    }

    // In case this menu is not yet open, open it.
    header.shownMenu = name;
  }

  function expandButton(event: MouseEvent) {
    const li = event.currentTarget.closest('li');
    const clip = li.querySelector('.clip');
    const span = clip.querySelector('span');
    clip.style = `width: ${span.offsetWidth}px`;
  }

  function collapseButton(event: MouseEvent) {
    const li = event.currentTarget.closest('li');
    const clip = li.querySelector('.clip');
    clip.style = `width: 0px`;
    closeMenu();
  }
</script>

<header id="desktop" class={page.data.theme}>
  <nav>
    <div class="left">
      <a href="/" id="logo">
        <img
          src="{PUBLIC_CDN_HOST}/images/logos/secondary-interflux-electronics-logo-1-transparent.svg"
          width="396"
          height="100"
          alt="Interflux Electronics"
        />
      </a>
    </div>

    <ul class="center">
      <li id="products" onmouseleave={closeMenu}>
        <button onclick={(e) => toggleMenu('products', e)}>
          <span>{m.products()}</span>
        </button>
        <ProductsMenu />
      </li>

      <li id="processes" onmouseleave={closeMenu}>
        <button onclick={(e) => toggleMenu('processes', e)}>
          <span>{m.processes()}</span>
        </button>
        <ProcessesMenu />
      </li>

      <li id="know-how">
        <a href="/webinars">
          <span>{m.webinars()}</span>
        </a>
      </li>

      <li id="company">
        <a href="/company">
          <span>{m.company()}</span>
        </a>
      </li>

      <li id="docs">
        <a href="/documents">
          <span>{m.documents()}</span>
        </a>
      </li>

      <li id="contact">
        <a href="/contact">
          <span>{m.contact()}</span>
        </a>
      </li>
    </ul>

    <ul class="right">
      <p>
        <span>
          {@html markdown(m.member_of_interflux_group(), { noParagraphs: true })}
        </span>
        <img
          src="{PUBLIC_CDN_HOST}/images/logos/secondary-interflux-electronics-symbol-1-blue-0.svg"
          width="20"
          height="20"
          alt="Interflux Group"
        />
      </p>

      <li
        id="languages"
        onmouseover={expandButton}
        onfocus={expandButton}
        onmouseleave={collapseButton}
      >
        <button
          class="button"
          onclick={(e) => toggleMenu('languages', e)}
          onfocus={expandButton}
          type="button"
        >
          <div class="icon">
            <Svg name="translation" />
          </div>
          <div class="clip">
            <span>{m.languages()}</span>
          </div>
        </button>
        <LanguageMenu />
      </li>
    </ul>
  </nav>
</header>

<style lang="scss">
  @use '$lib/styles/components' as *;
  @use 'sass:color';

  header {
    position: relative;
    background: rgba($blue-5, 100%);
    transition: all 400ms $easeOutExpo;
    z-index: 3;

    // Rather than not rendering the HTML with Ember responsive, we render the
    // HTML and hide it with CSS. This way, Fastboot does not need to know the
    // viewport width. It renders both desktop and mobile navigation.
    // @include tablet-and-below {
    //   display: none;
    // }

    @include widescreen {
      height: 80px;
      box-shadow: 0 2px 2px rgba(black, 0.1);
    }
    @include desktop {
      height: vw(80px);
      box-shadow: 0 vw(2px) vw(2px) rgba(black, 0.1);
    }
    &.blue {
      background: rgba($blue-4, 90%);
    }
    &.green {
      background: rgba($green-3, 70%);
    }
    &.overlap {
      @include widescreen {
        margin-bottom: -80px;
      }
      @include desktop {
        margin-bottom: vw(-80px);
      }
    }
    nav {
      display: flex;
      justify-content: space-between;
      height: 100%;
      margin: 0 auto;
      box-sizing: border-box;
      @include widescreen {
        padding: 0 0 0 36px;
      }
      @include desktop {
        padding: 0 0 0 vw(36px);
      }
    }
    .left {
      a#logo {
        display: flex;
        align-items: center;
        height: 100%;
        transition: transform 400ms $easeOutExpo;
        &:focus,
        &:hover {
          transform: scale(1.1);
        }
        img {
          width: auto; // don't make height auto or Safari will explode
          @include widescreen {
            height: 56px;
          }
          @include desktop {
            height: vw(56px);
          }
        }
      }
    }
    ul.center {
      display: flex;
      align-items: center;
      list-style: none;
      & > li {
        height: 100%;
        & > button,
        & > a {
          height: 100%;
          color: white;
          font-family: $bold;
          display: flex;
          align-items: center;
          // display: inline-block;

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
          @include widescreen {
            font-size: 16px;
            padding: 0 16px;
          }
          @include desktop {
            font-size: vw(16px);
            padding: 0 vw(16px);
          }
          &:hover,
          &:focus {
            span {
              &:after {
                transform: scaleX(1);
              }
            }
          }
          span {
            position: relative;
            &:after {
              content: '';
              background: white;
              position: absolute;
              transition: transform 400ms $easeOutExpo;
              transform: scaleX(0);
              @include widescreen {
                width: calc(100% + 10px);
                height: 2px;
                left: -5px;
                bottom: -15px;
              }
              @include desktop {
                width: calc(100% + vw(10px));
                height: vw(2px);
                left: vw(-5px);
                bottom: vw(-15px);
              }
            }
          }
        }
      }
    }
    .right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      button {
        background: 0 0;
        border: 0;
        cursor: pointer;
        border-left: 1px solid rgba(white, 0.2);
        display: flex;
        align-items: center;
        height: 100%;
        @include widescreen {
          padding: 0 20px;
          gap: 6px;
        }
        @include desktop {
          padding: 0 vw(20px);
          gap: vw(6px);
        }
        :global {
          .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            @include widescreen {
              width: 25px;
            }
            @include desktop {
              width: vw(25px);
            }
            svg {
              [fill] {
                fill: white;
              }
            }
          }
        }

        .clip {
          overflow: hidden;
          transition: width 400ms $easeOutExpo;
          display: flex;
          width: 0;
          span {
            color: white;
            font-family: $bold;
            @include widescreen {
              font-size: 16px;
            }
            @include desktop {
              font-size: vw(16px);
            }
          }
        }
      }
      p {
        color: white;
        text-align: right;
        line-height: 130%;
        display: flex;
        align-items: center;
        margin-right: 20px;
        @media (max-width: 1350px) {
          display: none;
        }
        @include widescreen {
          font-size: 16px;
        }
        @include desktop {
          font-size: vw(16px);
        }
        :global {
          a {
            background-color: transparent;
            color: white;
            text-decoration: none;
            font-family: $bold;
            white-space: nowrap;
            &:hover,
            &:focus {
              text-decoration: underline;
            }
          }
        }
        img {
          @include widescreen {
            margin-left: 5px;
          }
          @include desktop {
            margin-left: vw(5px);
          }
        }
      }
    }
  }
</style>
