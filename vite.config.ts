import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-node';
import { execSync } from 'node:child_process';

const commit = execSync('git rev-parse --short HEAD').toString().trim();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

export default defineConfig({
  plugins: [
    sveltekit({
      preprocess: vitePreprocess(),
      compilerOptions: {
        runes: ({ filename }) =>
          filename.split(/[/\\]/).includes('node_modules') ? undefined : true,
        warningFilter: (warning) =>
          warning.code !== 'a11y_autofocus' &&
          warning.code !== 'a11y_no_static_element_interactions' &&
          warning.code !== 'a11y_click_events_have_key_events' &&
          warning.code !== 'a11y_missing_attribute'
      },
      adapter: adapter()
    }),
    devtoolsJson(),
    paraglideVitePlugin({ project: './project.inlang', outdir: './src/lib/paraglide' })
  ],

  // In development, use Vite to proxy API requests to port 3000
  // In production, use Nginx
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,

        // omit /api from the path so that:
        // /api/v1/public/products becomes /v1/public/products
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // Global constants defined at build time
  define: {
    'import.meta.env.BUILD_GIT_COMMIT': JSON.stringify(commit),
    'import.meta.env.BUILD_GIT_BRANCH': JSON.stringify(branch),
    'import.meta.env.BUILD_TIME': JSON.stringify(new Date().toISOString())
  },

  // Make sure builds are not cached unnecessarily when git info changes
  build: {
    sourcemap: true
  },

  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @use '$lib/styles/for-components' as *;
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
