<template>
	<template v-if="$isTauri">
		<a
			v-bind="(props as any)"
			:href="(props.href as string)"
			@click.prevent="openUrl(props.href as string)"
			:class="props.class ?? ''"
		>
			<slot />
		</a>
	</template>
	<template v-else>
		<nuxt-link v-bind="props" :class="props.class ?? ''">
			<slot />
		</nuxt-link>
	</template>
</template>

<script lang="ts" setup>
/* TODO:WARN:[NuxtLink] `prefetch` and `noPrefetch` cannot be used together. `noPrefetch` will be ignored. */
import type { NuxtLinkProps } from '#app'
import { openUrl } from '@tauri-apps/plugin-opener'
import type { RouteLocationRaw } from 'vue-router'

interface Props<CustomProp extends boolean = false> {
	custom?: CustomProp
	to?: RouteLocationRaw
	href?: NuxtLinkProps['to']
	external?: boolean
	target?: '_blank' | '_parent' | '_self' | '_top' | (string & {}) | null
	rel?: 'noopener' | 'noreferrer' | 'nofollow' | 'sponsored' | 'ugc' | (string & {}) | null
	noRel?: boolean
	prefetchedClass?: string
	prefetch?: boolean
	prefetchOn?:
		| 'visibility'
		| 'interaction'
		| Partial<{
				visibility: boolean
				interaction: boolean
		  }>
	noPrefetch?: boolean
}

const props = defineProps<Props & { class?: string }>()
</script>
