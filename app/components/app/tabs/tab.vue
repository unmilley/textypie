<template>
	<a
		role="tab"
		:title="tab.title"
		class="tab justify-between gap-2 !pr-2 group"
		:class="{ 'tab-active': isActiveTab }"
		@click.prevent.stop="emits('changeActive', idx)"
		@click.middle.prevent.stop="emits('removeTab', idx)"
		@click.right.prevent.stop="emits('openContextMenu', idx)"
	>
		<span>{{ splitTitle(tab.title, 25) }}</span>
		<button
			v-if="isVisibleClose || isMobile"
			class="btn btn-square btn-xs btn-ghost md:invisible md:group-hover:visible"
			@click="emits('removeTab', idx)"
		>
			<Icon name="bx:x" size="1rem" />
		</button>
	</a>
</template>

<script lang="ts" setup>
const { tab, isVisibleClose = false } = defineProps<{
	tab: Tab
	idx: number
	isVisibleClose?: boolean
	isActiveTab: boolean
}>()

const emits = defineEmits<{
	openContextMenu: [idx: number]
	changeActive: [idx: number]
	removeTab: [idx: number]
}>()

const isMobile = useIsMobile()

const splitTitle = (title: string, len = 50) => {
	try {
		if (len < 3) throw new Error('Length must be longer than 4')
		if (title.length <= len) return title
		return `${title.substring(0, len - 3).trimEnd()}...`
	} catch (error: any) {
		console.error(error.message)
		return title
	}
}
</script>
