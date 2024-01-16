import { ResolvedConfig, ViteDevServer, type Plugin } from 'vite';

export interface IPrefetchPluginOption {
  excludeFn?: (assetName: string) => boolean;
}

const prefetchPlugin: (option?: IPrefetchPluginOption) => Plugin = (option) => {
  let config: ResolvedConfig;
  return {
    name: 'vite-plugin-prefetch',
    apply: 'build',
    configResolved(resolvedConfig: ResolvedConfig) {
      // store the resolved config
      config = resolvedConfig;
    },
    transformIndexHtml(
      html: string,
      ctx: {
        path: string;
        filename: string;
        server?: ViteDevServer;
        bundle?: import('rollup').OutputBundle;
        chunk?: import('rollup').OutputChunk;
      }
    ) {
      const bundles = Object.keys(ctx.bundle ?? {});
      const isLegacy = bundles.some((bundle) => bundle.includes('legacy'));
      if (isLegacy) {
        //legacy build won't add prefetch
        return html;
      }
      // remove map files
      let modernBundles = bundles.filter(
        (bundle) => bundle.endsWith('.map') === false
      );
      const excludeFn = option?.excludeFn;
      if (excludeFn) {
        modernBundles = modernBundles.filter((bundle) => !excludeFn(bundle));
      }
      // Remove existing files and concatenate them into link tags
      const prefechBundlesString = modernBundles
        .filter((bundle) => html.includes(bundle) === false)
        .map((bundle) => `<link rel="prefetch" href="${config.base}${bundle}">`)
        .join('');

      // Use regular expression to get the content within <head> </head>
      const headContent = html.match(/<head>([\s\S]*)<\/head>/)?.[1] ?? '';
      // Insert the content of prefetch into the head
      const newHeadContent = `${headContent}${prefechBundlesString}`;
      // Replace the original head
      html = html.replace(
        /<head>([\s\S]*)<\/head>/,
        `<head>${newHeadContent}</head>`
      );

      return html;
    },
  };
};

export default prefetchPlugin;
