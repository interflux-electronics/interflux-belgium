export const page = $state({
    theme: '',
    showError: false,
    showLoading: false,
    showHeader: true,
    showFooter: true,
})

export interface PageProps {
    theme: string,
    showError?: boolean,
    showLoading?: boolean,
    showHeader?: boolean,
    showFooter?: boolean,
}

export function updatePage(props: Partial<PageProps>) {
    Object.assign(page, props);
}