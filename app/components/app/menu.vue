<template>
	<ui-dropdown ref="dropdown">
		<summary class="ml-2 btn btn-sm btn-square btn-ghost">
			<Icon name="textypie:logo-fill" size="2rem" />
		</summary>
		<ul
			class="menu dropdown-content z-1 w-52 p-2 ml-2 mt-1 shadow-sm bg-base-100/80 backdrop-blur-xs border border-base-300 rounded-box"
		>
			<ui-dropdown class="dropdown-right">
				<summary class="btn btn-ghost pl-3 h-9 font-normal pr-0 w-full justify-between">
					Theme
					<Icon name="bx:chevron-right" size="1.25rem" />
				</summary>
				<ul
					class="menu dropdown-content z-1 w-52 p-2 ml-3 shadow-sm bg-base-100/80 backdrop-blur-xs border border-base-300 rounded-box"
				>
					<li v-for="t in themes" :key="t.value">
						<a
							:class="{ 'menu-active': $colorMode.preference === t.value }"
							class="capitalize"
							@click="$colorMode.preference = t.value"
						>
							<Icon :name="t.icon" />
							{{ t.value }}
						</a>
					</li>
				</ul>
			</ui-dropdown>
			<li @click="dropdown?.close()">
				<nuxt-link to="/settings">Settings</nuxt-link>
			</li>
		</ul>
	</ui-dropdown>
</template>

<script lang="ts" setup>
const { $colorMode } = useNuxtApp()

const dropdown = useTemplateRef('dropdown')

const themes = [
	{ value: 'dark', icon: 'bx:moon' },
	{ value: 'light', icon: 'bx:sun' },
	{ value: 'system', icon: 'bx:desktop' },
]
</script>
