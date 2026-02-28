export const footer = $state({
  visible: true
});

export interface FooterProps {
  visible?: boolean;
}

export function updateFooter(props: Partial<FooterProps>) {
  Object.assign(footer, props);
}
