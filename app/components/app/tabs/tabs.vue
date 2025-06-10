<template>
	<div>
		<VueDraggable
			ref="scrollContainer"
			tag="div"
			role="tablist"
			class="tabs flex-nowrap tabs-lift tabs-xs overflow-x-auto overflow-y-hidden whitespace-nowrap horizontal-scroll-container"
			:animation="150"
			v-model="tabs"
			@dblclick="add"
			@start="emits('changeDragTab', true)"
			@end="emits('changeDragTab', false)"
			@wheel.prevent="handleWheel"
		>
			<AppTabsTab
				v-for="(tab, idx) in tabs"
				:key="tab.title"
				:tab
				:idx
				:isVisibleClose
				:isActiveTab="activeTabTitle === tab.title"
				@openContextMenu="openContextMenu"
				@changeActive="changeActive(idx)"
				@removeTab="removeTab(idx)"
			/>
		</VueDraggable>
		<Teleport to="body">
			<AppTabsMenu
				v-if="isContextMenu"
				:x
				:y
				@close="toggleContextMenu(false)"
				@removeTab="removeTab(tabIdForContextMenu)"
			/>
		</Teleport>
	</div>
</template>

<script lang="ts" setup>
import { VueDraggable } from 'vue-draggable-plus'

const { tabs, activeTabTitle, changeActive, addTab, removeTab } = useTabs()

const scrollContainer = useTemplateRef<typeof VueDraggable>('scrollContainer')
const { x, y } = useMouse()
const [isContextMenu, toggleContextMenu] = useToggle(false)

const { data: isVisibleClose } = useSettings<boolean>('tabs')
let tabIdForContextMenu = 0

const emits = defineEmits<{
	changeDragTab: [value: boolean]
}>()

const add = ({ target }: MouseEvent) => {
	if ((target as HTMLElement).role !== 'tablist') return
	addTab({})
}

const openContextMenu = (id: number) => {
	tabIdForContextMenu = id
	toggleContextMenu(true)
}

const handleWheel = (event: WheelEvent) => {
	if (!scrollContainer.value || !scrollContainer.value.$el) return
	scrollContainer.value.$el.scrollLeft += event.deltaY * (tabs.value.length / 5)
}
</script>
