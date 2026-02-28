export const header = $state({
  title: 'Interflux',
  crumbs: [],
  backPath: '/',
  visible: true,
  shownMenu: 'none'
});

export interface HeaderProps {
  title?: string;
  crumbs?: string[];
  backPath?: string;
  shown?: boolean;
  shownMenu?: string;
}

export function updateHeader(props: Partial<HeaderProps>) {
  Object.assign(header, props);
}
