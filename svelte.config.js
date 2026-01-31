import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter()
    },
    preprocess: vitePreprocess({
        scss: {
            prependData: `
                @import "$lib/styles/mixins.scss"; 
                @import "$lib/styles/variables.scss";
            `,

            // Resolve $lib in import paths
            // @import '$lib/styles/mixins.scss'; 
            // @import '$lib/styles/variables.scss';
            importer: [
                (url) => {
                    if (url.startsWith('$lib/')) {
                        return {
                            file: path.resolve(__dirname, 'src/lib', url.slice(5))
                        };
                    }
                    return null; // Let SASS handle other imports normally
                }
            ]
        }
    })
};

export default config;
