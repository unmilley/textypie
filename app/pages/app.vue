<template>
	<AppDraggableFile @change="getContent" :isActiveDragTab>
		<AppTabs @changeDragTab="changeDragTab" />

		<AppEditor v-model="activeTabContent" />
		<ActionBar v-model="activeTabContent" />
	</AppDraggableFile>
</template>

<script lang="ts" setup>
const [isActiveDragTab, changeDragTab] = useToggle(false)

const { tabs, activeTabContent, changeActive, addTab } = useTabs()

const getContent = async (file: File) => {
	const title = file.name

	if (tabs.value.map(({ title }) => title).includes(title)) {
		push.error({ title, message: 'File is exist' })
		return changeActive(title)
	}

	const content = await file.text()
	addTab({ title, content, file })

	push.info({ title, message: 'File is uploaded' })
}

onMounted(async () => {
	await generateActions(true)
})
</script>
