<template>
	<details class="dropdown" v-bind="$attrs" ref="details">
		<slot />
	</details>
</template>

<script lang="ts" setup>
const details = useTemplateRef('details')
const close = () => {
	if (!details.value) return
	details.value.open = false
}
onClickOutside(details, close)
defineExpose({ close })
</script>
