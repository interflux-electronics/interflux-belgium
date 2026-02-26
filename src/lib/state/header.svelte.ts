export const header = $state({
  title: 'Interflux',
  crumbs: [],
  backPath: '/',
  shownMenu: 'none'
});

export interface MenuLink {
  label: string;
  url: string;
  icon: string;
  img: string;
}

export interface HeaderProps {
  shownMenu: string;
  crumbs?: string[];
  productLinks: MenuLink[];
  processLinks: MenuLink[];
}

export function updateHeader(props: Partial<HeaderProps>) {
  Object.assign(header, props);
}
