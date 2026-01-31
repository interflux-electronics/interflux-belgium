import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    kit: {
        adapter: adapter()
    },
    preprocess: vitePreprocess({
        // style: {
        //     scss: {
        //         // This tells Sass to use the modern module system
        //         api: 'modern',

        //         // This line is the key — it prepends @use to every <style lang="scss"> block
        //         prependData: `
        //             @use '$lib/styles/variables.scss' as *;
        //             @use '$lib/styles/mixins.scss' as *;
        //         `
        //     }
        // },
        scss: {
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
