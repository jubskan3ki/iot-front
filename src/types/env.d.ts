/// <reference types="vite/client" />

declare interface ImportMeta {
	readonly client: boolean;
	readonly server: boolean;
	readonly dev: boolean;
	readonly hot?: boolean;
}

declare module '*.vue' {
	import type { DefineComponent } from 'vue';
	const component: DefineComponent<{}, {}, any>;
	export default component;
}

declare module '*.scss' {
	const content: string;
	export default content;
}
