<template>
	<div
		class="w-dvw h-dvh relative"
		ref="main"
		:class="[
			`after:fixed after:inset-4`,
			'after:rounded-2xl after:bg-base-100/60 after:backdrop-blur-xs after:border after:border-dashed after:border-base-content',
			'after:shadow-[0px_0px_160px_0px_var(--color-primary)]',
			$isTauri && 'after:top-12',
			(!isOverDropZone || isActiveDragTab) && 'after:hidden',
		]"
	>
		<div
			:class="[
				'fixed z-10 w-full flex flex-col justify-center items-center h-full',
				$isTauri && 'top-8',
				(!isOverDropZone || isActiveDragTab) && 'hidden',
			]"
		>
			<Icon name="bx:cloud-upload" size="3rem" />
			<p class="">Drop file here</p>
		</div>

		<slot />
	</div>
</template>

<script lang="ts" setup>
const { isActiveDragTab } = defineProps<{ isActiveDragTab: boolean }>()
const emit = defineEmits<{ change: [File] }>()

const handleFileChange = (files: File[] | null) => {
	if (!files || !files[0]) return
	emit('change', files[0])
}

const main = useTemplateRef('main')
const { isOverDropZone } = useDropZone(main, handleFileChange)
</script>
