# Vite-plugin-bundle-prefetch

## Why

there is no official rollup/vite plugin to work as the webpack prefetch plugin, we just have `preload` in vite, but we really need the prefetch for some Scenario.

## How

some steps taken by `vite-plugin-bundle-prefetch`

- get all bundles which will include the assetsDir
- filter the target files (rm .map file or ignore the legacy build)
- get the final output html file content
- append the `<link rel="prefetch" href="xxxx">` in `head`

## Usage

- `npm i vite-plugin-bundle-prefetch -D`
- import in your vite.config.ts

```ts
// vite.config.js
import prefetchPlugin from 'vite-plugin-bundle-prefetch';

export default {
  plugins: [prefetchPlugin()],
};
```

## Options

### excludeFn

- **Type**:`Function(assetName:string)=>boolean`
- **Default**: `undefined`
- **Desc**: provide the customized method to exclude the files which will be added in index.html

```ts
export default {
  plugins: [
    prefetchPlugin({
      excludeFn: (assetName) => {
        return assetName.includes('ApproveRecords');
      },
    }),
  ],
};
```
