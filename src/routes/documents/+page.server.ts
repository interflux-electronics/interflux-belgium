import { PUBLIC_API_HOST } from '$env/static/public';
import { error } from '@sveltejs/kit';
import { normalizeJsonApi } from '$lib/api/normalize';
import { Document } from '$lib/schemas/Document';
import type { PageServerLoad } from './$types';
import { type } from 'arktype';
import { updateHeader } from '$lib/state/header.svelte';

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch(`${PUBLIC_API_HOST}/v1/public/documents`);

  if (response.status !== 200) {
    const message =
      response.status >= 500
        ? 'Something went wrong on our servers. Please try again later.'
        : 'Failed to load documents. Please try again.';

    throw error(response.status, message);
  }

  const json = await response.json();
  const nested = normalizeJsonApi(json);
  const validated = Document.array()(nested);

  if (validated instanceof type.errors) {
    throw error(400, `Invalid documents data: ${validated.summary}`);
  }

  return {
    documents: validated,
    theme: 'blue overlap'
  };
};
