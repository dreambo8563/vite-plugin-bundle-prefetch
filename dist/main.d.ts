import { type Plugin } from 'vite';
export interface IPrefetchPluginOption {
    excludeFn?: (assetName: string) => boolean;
}
declare const prefetchPlugin: (option?: IPrefetchPluginOption) => Plugin;
export default prefetchPlugin;
