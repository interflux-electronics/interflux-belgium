import { m } from '$lib/paraglide/messages';

export const header = $state({
  title: 'Interflux',
  crumbs: [],
  backPath: '/',
  visible: true,
  shownMenu: 'none',
  headerTheme: 'blue'
});

export interface HeaderProps {
  title?: string;
  crumbs?: string[];
  backPath?: string;
  shown?: boolean;
  shownMenu?: string;
  theme?: string;
}

export function getProductLinks() {
  return [
    {
      label: m.LMPA_Q(),
      img: 'LMPA-Q',
      url: '/products/for/low-melting-point-soldering'
    },
    {
      label: m.soldering_fluxes(),
      img: 'fluxes',
      url: '/products/family/soldering-fluxes'
    },
    {
      label: m.solder_pastes(),
      img: 'pastes',
      url: '/products/family/solder-pastes'
    },
    {
      label: m.solder_wires(),
      img: 'wires',
      url: '/products/family/solder-wires'
    },
    {
      label: m.solder_alloys(),
      img: 'alloys',
      url: '/products/family/solder-alloys'
    },
    {
      label: m.auxiliaries(),
      img: 'aux',
      url: '/products/family/auxiliaries'
    },
    {
      label: m.fluxing_systems(),
      img: 'fluxes',
      url: '/products/family/fluxing-systems'
    },
    {
      label: m.all_products(),
      img: 'all',
      url: '/products'
    }
  ];
}

export function getProcessLinks() {
  return [
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
}
