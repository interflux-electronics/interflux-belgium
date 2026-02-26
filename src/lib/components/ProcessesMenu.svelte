<script lang="ts">
  import { Menu, Svg } from '$lib/components';
  import { m } from '$lib/paraglide/messages';
  import { PUBLIC_CDN_HOST } from '$env/static/public';

  const links = [
    {
      label: m.low_melting_point_soldering_LMPA_Q(),
      icon: 'LMPA-icon',
      url: '/products/for/low-melting-point-soldering'
    },
    {
      label: m.OSP_soldering(),
      icon: 'OSP-soldering-green',
      url: '/products/for/OSP-soldering'
    },
    {
      label: m.selective_soldering(),
      icon: 'selective-soldering',
      url: '/products/for/selective-soldering'
    },
    {
      label: m.jet_fluxing(),
      icon: 'jet-fluxing',
      url: '/products/for/jet-fluxing'
    },
    {
      label: m.hand_soldering(),
      icon: 'rework-and-repair',
      url: '/products/for/hand-soldering'
    },
    {
      label: m.wave_soldering(),
      icon: 'wave-soldering',
      url: '/products/for/wave-soldering'
    },
    {
      label: m.solder_paste_jetting(),
      icon: 'solder-paste-jetting',
      url: '/products/for/solder-paste-jetting'
    },
    {
      label: m.robot_soldering(),
      icon: 'robot-soldering',
      url: '/products/for/robot-soldering'
    },
    {
      label: m.reflow_soldering(),
      icon: 'reflow-soldering',
      url: '/products/for/reflow-soldering'
    },
    {
      label: m.spray_fluxing(),
      icon: 'spray-fluxing',
      url: '/products/for/spray-fluxing'
    },
    {
      label: m.laser_soldering(),
      icon: 'laser-soldering',
      url: '/products/for/laser-soldering'
    },
    {
      label: m.stencil_printing(),
      icon: 'stencil-printing',
      url: '/products/for/stencil-printing'
    },
    {
      label: m.foam_fluxing(),
      icon: 'foam-fluxing',
      url: '/products/for/foam-fluxing'
    },
    {
      label: m.dispensing(),
      icon: 'dispensing',
      url: '/products/for/dispensing'
    },
    {
      label: m.rework_repair(),
      icon: 'rework-and-repair',
      url: '/products/for/rework-and-repair'
    },
    {
      label: m.pre_tinning(),
      icon: 'pre-tinning',
      url: '/products/for/pre-tinning'
    },
    {
      label: m.solder_bath_conditioning(),
      icon: 'dip-soldering',
      url: '/products/for/solder-bath-conditioning'
    },
    {
      label: m.vapor_phase_soldering(),
      icon: 'vapour-phase-soldering',
      url: '/products/for/vapor-phase-soldering'
    },
    {
      label: m.dip_soldering(),
      icon: 'dip-soldering',
      url: '/products/for/dip-soldering'
    },
    {
      label: m.cleaning(),
      icon: 'drop-3',
      url: '/products/for/general-cleaning'
    }
  ];
</script>

<Menu id="processes">
  <h2>{m['Processes we develop for']()}</h2>

  <div class="links">
    {#each links as link}
      <a href={link.url}>
        <img
          src="{PUBLIC_CDN_HOST}/images/icons/{link.icon}.svg"
          role="presentation"
          alt=""
          width="40"
          height="40"
        />
        <span>{link.label}<Svg name="arrow-right" /></span>
      </a>
    {/each}
  </div>
</Menu>

<style lang="scss">
  @use '$lib/styles/components' as *;

  :global {
    .menu#processes {
      .box {
        flex-direction: column;
        @include widescreen {
          width: 720px;
        }
        @include desktop {
          width: vw(720px);
        }
      }
      .callout {
        @include widescreen {
          left: 200px;
        }
        @include desktop {
          left: vw(200px);
        }
      }
      .links {
        a {
          width: 33.33%;
          &:first-child {
            width: 66.66%;
          }
        }
      }
    }
  }
</style>
