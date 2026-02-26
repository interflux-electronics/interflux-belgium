import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';

const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  plugins: [
    sveltekit(),
    devtoolsJson(),
    paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
  ],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @use '$lib/styles/components' as *;
  // 	    `
  //     }
  //   }
  // },
  test: {
    expect: { requireAssertions: true },
    projects: [
      {
        extends: './vite.config.ts',
        test: {
          name: 'client',
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium', headless: true }]
          },
          include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
          exclude: ['src/lib/server/**']
        }
      },

      {
        extends: './vite.config.ts',
        test: {
          name: 'server',
          environment: 'node',
          include: ['src/**/*.{test,spec}.{js,ts}'],
          exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
        }
      }
    ]
  }
});
