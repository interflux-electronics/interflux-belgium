// DELETE BELOW

import { createContext } from 'svelte';

export interface PageState {
  id?: string | null;
  title?: string | null;
  backRoute?: string | null;
  backModel?: unknown;
  crumbs?: Array<{ label: string; route?: string }> | null;
  mainClasses?: string | string[] | null;
  theme?: string | null;
  showHeader?: boolean;
  showFooter?: boolean;
  showLoading?: boolean;
  shownHeaderMenu?: boolean;
}

export interface PageContext {
  page: PageState;
  update: (props: Partial<PageState>) => void;
  reset: () => void;
}

let page = $state<PageState>({
  showHeader: true,
  showFooter: true,
  showLoading: false,
  shownHeaderMenu: false
});

const defaultPage: PageState = {
  id: null,
  title: null,
  backRoute: null,
  backModel: null,
  crumbs: null,
  mainClasses: null,
  theme: null,
  showHeader: true,
  showFooter: true,
  showLoading: false,
  shownHeaderMenu: false
};

function update(props: Partial<PageState>) {
  Object.assign(page, props);
}

function reset() {
  Object.assign(page, defaultPage);
}

const contextValue: PageContext = {
  get page() {
    return page;
  },
  update,
  reset
};

const [getPageContext, setPageContext] = createContext<PageContext>();

export const usePage = getPageContext;

export function createPageProvider(initial: Partial<PageState> = {}) {
  update(initial);

  setPageContext(contextValue);

  return { update, reset };
}
