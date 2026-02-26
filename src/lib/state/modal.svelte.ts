export const modal = $state({
    show: false,
    scrollY: 0,
})

export interface ModalProps {
    show?: boolean,
    scrollY?: number,
}

export function updateModal(props: Partial<ModalProps>) {
    Object.assign(modal, props);
}