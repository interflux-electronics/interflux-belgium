<script lang="ts">
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import { m } from '$lib/paraglide/messages';
  import { markdown } from '$lib/helpers';
  import { Svg, LanguageList } from '$lib/components';

  let currentYear = $derived(new Date().getFullYear());
</script>

<footer>
  <div id="logo">
    <img
      id="electronics"
      src="{PUBLIC_CDN_HOST}/images/logos/secondary-interflux-electronics-logo-1-transparent.svg"
      width="3960"
      height="1000"
      alt="Interflux Electronics"
    />

    <div id="group">
      <p>
        {@html markdown(m.member_of_interflux_group(), { noParagraphs: true })}
      </p>

      <img
        src="{PUBLIC_CDN_HOST}/images/logos/secondary-interflux-electronics-symbol-1-blue-0.svg"
        width="20"
        height="20"
        alt="Interflux Group"
      />
    </div>
  </div>

  <div id="image">
    <img
      src="{PUBLIC_CDN_HOST}/images/public/interflux-building/interflux-building@800x1067.webp"
      alt={m.office_building()}
    />
  </div>

  <div id="languages">
    <section>
      <h3>{m.continue_in_your_language()}</h3>

      <LanguageList />
    </section>
  </div>

  <div id="links">
    <section id="explore">
      <h3>{m.explore_more()}</h3>

      <a href="https://lmpa-q.com" target="_blank">
        <span>{m.LMPA_Q_solder_alloy()}<Svg name="arrow-right" /></span>
      </a>

      <a href="https://www.jetfluxer.com" target="_blank">
        <span>{m.ICSF_jet_fluxer()}<Svg name="arrow-right" /></span>
      </a>
    </section>

    <section id="partners">
      <h3>{m.partners()}</h3>

      <a href="https://interflux.group" target="_blank">
        <span>Interflux Group<Svg name="arrow-right" /></span>
      </a>

      <a href="https://www.interflux.dk" target="_blank">
        <span>Interflux Scandinavia<Svg name="arrow-right" /></span>
      </a>

      <a href="https://www.interflux.pl" target="_blank">
        <span>Interflux Poland<Svg name="arrow-right" /></span>
      </a>
    </section>

    <section id="social">
      <h3>{m.follow_Interflux()}</h3>

      <div class="horizontal">
        <a href="https://www.linkedin.com/company/interflux-electronics/" target="_blank">
          <Svg name="linkedin" />
        </a>

        <a href="https://twitter.com/interflux_elec" target="_blank">
          <Svg name="x" />
        </a>

        <a href="https://www.youtube.com/@interfluxelectronicsnv1744" target="_blank">
          <Svg name="youtube" />
        </a>
      </div>
    </section>

    <div class="spacer"></div>

    <section id="legal">
      <p>&copy; 1980 - {currentYear} <nobr>&reg; Interflux Electronics NV</nobr></p>
    </section>
  </div>
</footer>

<style lang="scss">
  @use '$lib/styles/components' as *;
  @use 'sass:color';

  footer {
    @include widescreen {
      display: flex;
    }
    @include desktop {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        'logo image'
        'languages links';
    }
    @include tablet {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: 1fr 1fr;
      grid-template-areas:
        'logo image'
        'languages links';
    }
    @include mobile {
      display: flex;
      flex-direction: column;
    }
    & > * {
      @include widescreen {
        width: 25%;
        flex-shrink: 0;
        box-sizing: border-box;
      }
    }
    #image {
      position: relative;
      overflow: hidden;
      grid-area: image;
      background-color: $blue-2;
      @include mobile {
        height: 120vw;
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        object-fit: cover;
        object-position: left;
        width: 100%;
        height: 100%;
      }
    }
    #logo {
      grid-area: logo;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background-color: $blue-3;
      @include widescreen {
        gap: 50px;
        background: radial-gradient(
          at top right,
          color.adjust($blue-3, $lightness: 3%),
          color.adjust($blue-3, $lightness: -3%)
        );
      }
      @include desktop {
        gap: vw(50px);
        background: radial-gradient(
          at bottom right,
          color.adjust($blue-3, $lightness: 3%),
          color.adjust($blue-3, $lightness: -3%)
        );
      }
      @include tablet {
        gap: 5vw;
        background: radial-gradient(
          at bottom right,
          color.adjust($blue-3, $lightness: 3%),
          color.adjust($blue-3, $lightness: -3%)
        );
      }
      @include mobile {
        gap: 10vw;
        padding: 25vw 0;
        background: radial-gradient(
          at center,
          color.adjust($blue-3, $lightness: 3%),
          color.adjust($blue-3, $lightness: -3%)
        );
      }
      img#electronics {
        height: auto;
        max-width: 80%;
        @include widescreen {
          width: 320px;
        }
        @include desktop {
          width: vw(320px);
        }
        @include tablet {
          width: 32vw;
        }
        @include mobile {
          width: 70vw;
        }
      }
      #group {
        display: flex;
        align-items: center;
        @include widescreen {
          gap: 10px;
        }
        @include desktop {
          gap: vw(10px);
        }
        @include tablet {
          gap: 1vw;
        }
        @include mobile {
          gap: 2vw;
        }
        img {
          height: auto;
          @include widescreen {
            width: 30px;
          }
          @include desktop {
            width: vw(30px);
          }
          @include tablet {
            width: 3vw;
          }
          @include mobile {
            width: 7vw;
          }
        }
        :global {
          p {
            @include paragraph;
            color: white;
            a {
              font-family: $bold;
              color: white;
              background-color: transparent;
              text-decoration: none;
            }
          }
        }
      }
    }
    #languages,
    #links {
      display: flex;
      flex-direction: column;
      @include widescreen {
        padding: 32px 40px;
        gap: 26px;
      }
      @include desktop {
        padding: vw(32px) vw(40px);
        gap: vw(26px);
      }
      @include tablet {
        padding: 4vw 5vw;
        gap: 4vw;
      }
      @include mobile {
        padding: 12vw 12vw;
        gap: 8vw;
      }
      section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      h3 {
        @include paragraph;
        color: white;
        font-family: $bold;
        @include widescreen {
          margin-bottom: 8px;
        }
        @include desktop {
          margin-bottom: vw(8px);
        }
        @include tablet {
          margin-bottom: 1vw;
        }
        @include mobile {
          margin-bottom: 1.8vw;
        }
      }
      :global {
        a {
          @include paragraph;
          display: flex;
          align-items: center;
          color: white;
          @include widescreen {
            margin-left: -8px;
            line-height: 30px;
          }
          @include desktop {
            margin-left: vw(-8px);
            line-height: vw(30px);
          }
          @include tablet {
            margin-left: -1vw;
            line-height: 5vw;
          }
          @include mobile {
            margin-left: -2vw;
            line-height: 10vw;
          }
          &:hover,
          &:focus {
            span {
              background: $orange-2;
              color: white;
            }
            svg.arrow-right {
              opacity: 1;
            }
          }
          span {
            display: flex;
            align-items: center;
            @include widescreen {
              padding: 0 8px;
            }
            @include desktop {
              padding: 0 vw(8px);
            }
            @include tablet {
              padding: 0 1vw;
            }
            @include mobile {
              padding: 0 2vw;
            }
          }
          svg.arrow-right {
            opacity: 0;
            @include widescreen {
              width: 4px;
              height: 6px;
              margin-left: 8px;
            }
            @include desktop {
              width: vw(4px);
              height: vw(6px);
              margin-left: vw(8px);
            }
            @include tablet {
              width: 0.75vw;
              height: 1vw;
              margin-left: 1vw;
            }
            @include mobile {
              width: 1vw;
              height: 1.5vw;
              margin-left: 2vw;
            }
          }
        }
      }
    }
    #languages {
      grid-area: languages;
      background-color: $blue-4;
      @include widescreen {
        background: radial-gradient(
          at top left,
          color.adjust($blue-4, $lightness: 3%),
          color.adjust($blue-4, $lightness: -3%)
        );
      }
      @include desktop {
        background: radial-gradient(
          at top right,
          color.adjust($blue-4, $lightness: 3%),
          color.adjust($blue-4, $lightness: -3%)
        );
      }
      @include tablet {
        background: radial-gradient(
          at top right,
          color.adjust($blue-4, $lightness: 3%),
          color.adjust($blue-4, $lightness: -3%)
        );
      }
      @include mobile {
        background: radial-gradient(
          at bottom left,
          color.adjust($blue-4, $lightness: 3%),
          color.adjust($blue-4, $lightness: -3%)
        );
      }
      :global {
        a {
          position: relative;
          svg.arrow-right {
            position: absolute;
            right: 8px;
          }
          &:hover,
          &:focus {
            .flags {
              background: $orange-2;
              color: white;
            }
          }
          .flags {
            display: flex;
            height: 100%;
            @include widescreen {
              gap: 8px;
              padding: 0 22px 0 6px;
              height: 30px;
            }
            @include desktop {
              gap: vw(8px);
              padding: 0 vw(22px) 0 vw(6px);
              height: vw(30px);
            }
            @include tablet {
              gap: 0.6vw;
              padding: 0 3vw 0 1vw;
              height: 5vw;
            }
            @include mobile {
              gap: 1.5vw;
              padding: 0 7vw 0 2vw;
              height: 10vw;
            }
            .flag {
              outline: none;
              &.nz {
                // We hide the New Zealand flag between 1300px and 1200px because <a> is too wide
                @media (max-width: 1300px) and (min-width: 1200px) {
                  display: none;
                }
              }
            }
          }
        }
      }
    }
    #links {
      grid-area: links;
      background-color: $blue-5;
      background: radial-gradient(
        at top left,
        color.adjust($blue-5, $lightness: 3%),
        color.adjust($blue-5, $lightness: -3%)
      );
      p {
        @include paragraph;
        color: white;
      }
      #social {
        .horizontal {
          display: flex;
        }
        :global {
          a {
            display: flex;
            justify-content: center;
            align-items: center;
            @include widescreen {
              margin-left: -6px;
              width: 40px;
              height: 40px;
            }
            @include desktop {
              margin-left: vw(-6px);
              width: vw(40px);
              height: vw(40px);
            }
            @include tablet {
              margin-left: -1vw;
              width: 6vw;
              height: 6vw;
            }
            @include mobile {
              margin-left: -1vw;
              width: 11vw;
              height: 11vw;
            }
            &:hover,
            &:focus {
              svg {
                width: 100%;
              }
            }
            svg {
              width: 60%;
              height: auto;
              transition: width 300ms $easeOutExpo;
            }
          }
        }
      }
      .spacer {
        min-height: 20px;
      }
    }
  }
</style>
