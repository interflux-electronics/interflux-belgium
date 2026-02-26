export const main = $state({
    id: '',
    class: '',
})

export interface MainProps {
    id?: string,
    class?: string,
}

export function updateMain(props: Partial<MainProps>) {
    Object.assign(main, props);
}