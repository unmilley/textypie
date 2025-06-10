<template>
	<div ref="menu" class="fixed z-50 w-max top-0 left-0" @click="emits('close')" :style>
		<ul class="menu z-1 p-2 ml-2 mt-1 shadow-sm bg-base-100/80 backdrop-blur-xs border border-base-300 rounded-box">
			<li>
				<a @click.prevent="emits('removeTab')"> Close </a>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
const { x, y } = defineProps<{ x: number; y: number }>()
const emits = defineEmits<{
	close: []
	removeTab: []
}>()
const style = ref('')

onMounted(() => {
	style.value = `transform: translate(${x}px, ${y}px);`
})
const menu = useTemplateRef('menu')
onClickOutside(menu, () => emits('close'))
</script>
