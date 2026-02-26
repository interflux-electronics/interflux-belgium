export const mobile = $state({
    title: '',
    backRoute: '',
    backModel: '',
})

export interface MobileProps {
    title?: string,
    backRoute?: string,
    backModel?: string,
}

export function updateMobile(props: Partial<MobileProps>) {
    Object.assign(mobile, props);
}