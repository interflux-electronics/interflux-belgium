<script lang="ts">
  import { m } from '$lib/paraglide/messages';
  import PastWebinarEvent from '$lib/components/PastWebinarEvent.svelte';
  import chain from '$lib/helpers/chain';
  import type { Webinar } from '$lib/types';
  import type { LayoutProps } from './$types';

  let { data, children }: LayoutProps = $props();

  let webinars: Webinar[] = $derived(data.webinars);

  let _webinars = $derived.by(() => {
    return webinars.map((webinar: Webinar) => {
      const { startTime } = webinar;

      const startTimeUTC = format(startTime, 'UTC');
      const startTimeBelgium = format(startTime, 'Europe/Brussels');
      const startTimeSingapore = format(startTime, 'Asia/Singapore');
      const startTimeMelbourne = format(startTime, 'Australia/Melbourne');
      const humanStartDate = '16 Oct 2021'; // TODO
      const kebabStartDate = '2021-10-16'; // TODO
      const isoStartDate = new Date(webinar.startTime).toISOString();

      return {
        ...webinar,
        startTimeUTC,
        startTimeBelgium,
        startTimeSingapore,
        startTimeMelbourne,
        humanStartDate,
        kebabStartDate,
        isoStartDate
      };
    });
  });

  let pastWebinars: Webinar[] = $derived(chain(_webinars).rejectBy('isUpcoming').toArray());

  function format(time: number, timezone: string) {
    return time
      ? new Date(time)
          .toLocaleString('sv', {
            timeZone: timezone,
            dateStyle: 'short',
            timeStyle: 'short'
          })
          .replace(/-/g, '/')
          .replace(' ', ', ')
      : null;
  }
</script>

<section id="hero">
  <div class="liner">
    <h1>{m.webinars()}</h1>
  </div>
</section>

<section id="videos">
  <ul>
    {#each pastWebinars as webinar (webinar.id)}
      <PastWebinarEvent {webinar} />
    {/each}
  </ul>
</section>

{@render children()}

<style lang="scss">
  @use '$lib/styles/components' as *;

  h1 {
    font-family: var(--extra-bold);
    color: white;
    line-height: 100%;
    text-align: center;
    @include widescreen {
      font-size: 40px;
    }
    @include desktop {
      font-size: vw(40px);
    }
    @include tablet {
      font-size: vw-tablet(40px);
    }
    @include mobile {
      font-size: vw-mobile(40px);
    }
  }

  #hero {
    position: relative;
    overflow: hidden;
    .liner {
      position: relative;
      z-index: 1;
      max-width: 100vw;
      background-image: url('#{$cdn}/images/public/hero-circuit-boards-green-2@1200x320.jpg');
      background-size: cover;
      background-position: 50% 100%;
      background-color: var(--green-3);
      @include widescreen {
        padding: 185px 0 95px;
      }
      @include desktop {
        padding: vw(185px) 0 vw(95px);
      }
      @include tablet {
        padding: 32vw 0 20vw;
      }
      @include mobile {
        padding: 50vw 0 36vw;
      }
    }
  }

  #videos {
    @include widescreen {
      padding: 80px 0;
    }
    @include desktop {
      padding: vw(80px) 0;
    }
    @include tablet {
      padding: 10vw 0;
    }
    @include mobile {
      padding: 80px 0; // TODO
    }
    > ul {
      position: relative;
    }
  }
</style>
