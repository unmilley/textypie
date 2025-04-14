<template>
	<button class="btn btn-sm border border-base-content/50" @click.prevent.stop="open()">
		<Icon name="bx:search" size="1.25rem" class="opacity-50" />
		<div class="divider divider-horizontal !w-1 mx-0"></div>
		<span class="w-32 text-left text-sm opacity-80">{{ isVisible ? 'Select an action' : 'Search' }}</span>
		<kbd class="kbd kbd-sm min-w-14 capitalize">{{ combination.map(({ key }) => key).join(' ') }}</kbd>
	</button>
</template>

<script lang="ts" setup>
const { isVisible, open } = useModal('action-bar')

/* TODO: change useState to any storage in browser */
const combination = useState<Combinations>('master-key', () => [
	{ key: 'Ctrl', code: 'ControlLeft' },
	{ key: 'q', code: 'KeyQ' },
])
</script>
