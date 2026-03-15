import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { paraglideMiddleware } from '$lib/paraglide/server';

// For translations
const paraglideHandle: Handle = ({ event, resolve }) =>
  paraglideMiddleware(event.request, ({ request, locale }) => {
    event.request = request; // Note: mutating event.request here is what your original does

    return resolve(event, {
      transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
    });
  });

// For logging
const loggingHandle: Handle = async ({ event, resolve }) => {
  const start = performance.now();

  // Log the incoming request immediately (before resolve)
  console.log(`[${event.request.method}] ${event.url.pathname}${event.url.search}`);

  const response = await resolve(event);

  const durationMs = (performance.now() - start).toFixed(2);

  const logEntry = {
    method: event.request.method,
    url: event.url.pathname,
    status: response.status,
    duration: `${durationMs}ms`,
    ip: event.getClientAddress?.() ?? 'unknown',
    userAgent: event.request.headers.get('user-agent')?.slice(0, 100)
  };

  if (response.ok) {
    console.info('Success:', logEntry);
  } else {
    console.warn('Non-success:', logEntry);
  }

  // Add timing header for debugging / monitoring
  response.headers.set('X-Response-Time', `${durationMs}ms`);

  return response;
};

// First log, then translate
export const handle: Handle = sequence(loggingHandle, paraglideHandle);
