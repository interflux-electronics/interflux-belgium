<script lang="ts">
  import { PUBLIC_CDN_HOST } from '$env/static/public';
  import Button from '$lib/components/Button.svelte';
  import Image from '$lib/components/Image.svelte';
  import ResponsiveImage from '$lib/components/ResponsiveImage.svelte';
  import { spanEachWord } from '$lib/helpers/spanEachWord';
  import { markdown } from '$lib/helpers/markdown';
  import { m } from '$lib/paraglide/messages';
  import type { Webinar } from '$lib/types';

  interface Props {
    webinar: Webinar;
  }

  let { webinar }: Props = $props();

  let expanded = $state(false);

  function toggleAccordion(event: MouseEvent) {
    // Expand if collapsed et vice versa
    expanded = !expanded;

    // Remove focus from the toggle button
    event.currentTarget?.blur();
  }

  let contentHeight = $state(0);
</script>

<li class="past-webinar-event">
  <h3>
    {@html spanEachWord(webinar.title)}
  </h3>

  <div class="video">
    {#if webinar.image}
      <ResponsiveImage
        path={webinar.image.path}
        variations={webinar.image.variations}
        caption={webinar.image.caption}
        alt={webinar.image.alt}
      />
    {/if}

    <div class="cta">
      {#if webinar.video}
        <Button
          route="webinars.watch"
          model={webinar.id}
          label={m.watch_replay()}
          icon="play"
          theme="primary medium orange icon-left"
        />
      {/if}
    </div>
  </div>

  <div
    class="accordion {expanded ? 'expanded' : 'collapsed'}"
    style:height={expanded ? contentHeight : 0}
    data-test={contentHeight}
  >
    <div class="content" bind:offsetHeight={contentHeight}>
      <h4>{m.who_would_watch()}</h4>
      {@html markdown(webinar.audience)}
      <h4>{m.topic()}</h4>
      {@html markdown(webinar.topic)}
      <h4>{m.speaker()}</h4>
      <div class="host">
        <p>
          <span>Steven Teliszewski</span>
          <span>{m.coo_at_interflux()}</span>
          <span>{m.many_years_experience()}</span>
        </p>
        <Image src="{PUBLIC_CDN_HOST}/images/people/steven-teliszewski@160x160.jpg" />
      </div>

      {#if webinar.document.id}
        <Button
          label={m.download_slides()}
          icon="cloud-download"
          theme="primary medium green icon-left"
          class="collapse"
          url="{PUBLIC_CDN_HOST}/{webinar.document.path}.pdf"
        />
      {/if}
    </div>
  </div>

  <Button
    label={expanded ? m.show_all() : m.show_less()}
    size="medium"
    theme="secondary"
    icon={expanded ? 'arrow-up' : 'arrow-down'}
    iconPosition="right"
    onClick={toggleAccordion}
    class="expand"
  />
</li>

<style lang="scss">
  @use '$lib/styles/components' as *;

  li.past-webinar-event {
    position: relative;
    @include desktop-and-up {
      display: grid;
      grid-template-columns: 400px 400px;
      grid-template-rows: auto auto 1fr;
      grid-template-areas:
        'video h3'
        'video accordion'
        'video button';
      justify-content: center;
    }
    @include tablet-and-below {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    @include widescreen {
      column-gap: 120px;
      padding: 60px;
    }
    @include desktop {
      column-gap: vw(120px);
      padding: vw(60px);
    }
    @include tablet {
      display: grid;
      grid-template-columns: vw-tablet(400px);
      grid-template-rows: auto auto auto auto;
      grid-template-areas:
        'h3'
        'video'
        'accordion'
        'button';
      justify-content: center;
      padding: vw-tablet(60px) 0;
    }
    @include mobile {
      padding: vw-mobile(60px) vw-mobile(30px);
    }

    :global {
      .dot {
        position: absolute;
        @include widescreen {
          top: 66px;
          left: calc(50% - 8px);
        }
        @include desktop {
          top: vw(66px);
          left: calc(50% - 8px);
        }
        @include tablet {
          top: 8.25vw;
          left: calc(50% - 8px - #{vw-tablet(240px)});
        }
        @include mobile {
          display: none;
        }
      }
      .vertical-line {
        position: absolute;
        height: 100%;
        top: 0;
        left: calc(50% - 1px);
        @include tablet {
          transform: translateX(#{vw-tablet(-240px)});
        }
        @include mobile {
          display: none;
        }
      }
    }
  }

  .video {
    position: relative;
    grid-area: video;
    @include desktop-and-up {
      align-self: start;
      justify-self: end;
    }
    @include tablet {
      margin: vw-tablet(30px) 0;
    }
    @include mobile {
      margin: vw-mobile(30px) 0;
    }
    .cta {
      position: absolute;
      z-index: 2;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    :global {
      figure {
        position: relative;
        z-index: 1;
      }
    }
  }

  h3 {
    grid-area: h3;
    color: white;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    max-width: 80%;
    line-height: 160%;
    @include desktop-and-up {
      align-self: end;
    }
    @include widescreen {
      margin: 0 0 30px;
    }
    @include desktop {
      margin: 0 0 vw(30px);
    }

    &::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border-style: solid;
      border-top-color: transparent;
      border-bottom-color: transparent;
      border-right-color: var(--blue-3);
      @include widescreen {
        left: -11px;
        top: 4.5px;
        border-top-width: 9px;
        border-bottom-width: 9px;
        border-right-width: 11px;
      }
      @include desktop {
        left: vw(-11px);
        top: vw(4.5px);
        border-top-width: vw(9px);
        border-bottom-width: vw(9px);
        border-right-width: vw(11px);
      }
      @include tablet {
        left: vw-tablet(-11px);
        top: vw-tablet(4.5px);
        border-top-width: vw-tablet(9px);
        border-bottom-width: vw-tablet(9px);
        border-right-width: vw-tablet(11px);
      }
      @include mobile {
        display: none;
      }
    }

    :global {
      nobr {
        display: flex;
        margin: 0 -3px 2px 0;
      }
      span {
        font-family: var(--extra-bold);
        display: flex;
        @include widescreen {
          font-size: 20px;
          line-height: 27px;
          height: 27px;
        }
        @include desktop {
          font-size: vw(20px);
          line-height: vw(27px);
          height: vw(27px);
        }
        @include tablet {
          font-size: vw-tablet(20px);
          line-height: vw-tablet(27px);
          height: vw-tablet(27px);
        }
        @include mobile {
          font-size: vw-mobile(20px);
          line-height: vw-mobile(27px);
          height: vw-mobile(27px);
        }
        &.word {
          background-color: var(--blue-3);

          @include widescreen {
            padding: 2px 5px 0;
          }
          @include desktop {
            padding: vw(2px) vw(5px) 0;
          }
          @include tablet {
            padding: vw-tablet(2px) vw-tablet(5px) 0;
          }
          @include mobile {
            padding: vw-mobile(2px) vw-mobile(5px) 0;
          }
        }
        &.space {
          width: 0px;
        }
      }
    }
  }

  .accordion {
    grid-area: accordion;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    overflow: hidden;
    transition: all 1000ms var(--ease-out-expo);
    transition-property: height, padding, opacity;
    @include widescreen {
      padding: 0 15px 15px;
      width: calc(100% + 30px);
      margin-left: -15px;
    }
    @include desktop {
      padding: 0 vw(15px) vw(15px);
      width: calc(100% + vw(30px));
      margin-left: vw(-15px);
    }
    @include tablet {
      padding: 0 vw-tablet(15px) vw-tablet(15px);
      margin-left: vw-tablet(-15px);
      width: 100%;
    }
    @include mobile {
      padding: 0 0 vw-mobile(15px);
      width: 100%;
    }
    &.expanded {
      opacity: 1;
    }
    &.collapsed {
      padding-bottom: 0;
      opacity: 0;
    }
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    global {
      h4,
      p,
      li {
        @include widescreen {
          font-size: 16px;
        }
        @include desktop {
          font-size: vw(16px);
        }
        @include tablet {
          font-size: vw-tablet(16px);
        }
        @include mobile {
          font-size: vw-mobile(16px);
        }
      }

      h4 {
        font-family: var(--bold);
        color: var(--grey-7);
        line-height: 180%;
        @include widescreen {
          margin-bottom: 5px;
        }
        @include desktop {
          margin-bottom: vw(5px);
        }
        @include tablet {
          margin-bottom: vw-tablet(5px);
        }
        @include mobile {
          margin-bottom: vw-mobile(5px);
        }
        &:not(:first-of-type) {
          @include widescreen {
            margin-top: 25px;
          }
          @include desktop {
            margin-top: vw(25px);
          }
          @include tablet {
            margin-top: vw-tablet(25px);
          }
          @include mobile {
            margin-top: vw-mobile(25px);
          }
        }
      }

      p {
        span {
          display: block;
        }
      }

      ul {
        list-style: disc;
        @include widescreen {
          padding-left: 18px;
        }
        @include desktop {
          padding-left: vw(18px);
        }
        @include tablet {
          padding-left: vw-tablet(18px);
        }
        @include mobile {
          padding-left: vw-mobile(18px);
        }
        li {
          line-height: 180%;
        }
      }
    }
  }

  .host {
    display: flex;
    align-items: center;
    :global {
      picture {
        overflow: hidden;
        border-radius: 50%;
        @include widescreen {
          width: 80px;
          margin-left: 20px;
        }
        @include desktop {
          width: vw(80px);
          margin-left: vw(20px);
        }
        @include tablet {
          width: vw-tablet(80px);
          margin-left: vw-tablet(20px);
        }
        @include mobile {
          width: vw-mobile(80px);
          margin-left: vw-mobile(20px);
        }
      }
    }
  }

  // :global {
  //   .button {
  //     &.green {
  //       @include widescreen {
  //         margin-top: 30px;
  //       }
  //       @include desktop {
  //         margin-top: vw(30px);
  //       }
  //       @include tablet {
  //         margin-top: vw-tablet(30px);
  //       }
  //       @include mobile {
  //         margin-top: vw-mobile(60px);
  //         width: 100%;
  //       }
  //     }
  //     &.grey-border {
  //       grid-area: button;
  //       align-self: start;
  //       justify-self: left;
  //       @include mobile {
  //         width: 100%;
  //       }
  //     }
  //   }
  // }
</style>
