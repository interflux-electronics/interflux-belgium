export const modal = $state({
  visible: false,
  scrollY: 0
});

export interface ModalProps {
  visible?: boolean;
  scrollY?: number;
}

export function updateModal(props: Partial<ModalProps>) {
  Object.assign(modal, props);
}
