<template>
	<li>
		<a class="alert" :class="{ 'menu-focus': isFocused }" @click="$emit('enter')">
			<Icon :name="item.icon" size="1.25rem" />
			<div>
				<h3 class="font-bold">{{ item.name }}</h3>
				<pre class="text-pretty text-xs">{{ item.description }} {{ item.description }}</pre>
				<div class="flex gap-1 mt-1">
					<div v-for="tag in tags.data" class="badge badge-xs badge-dash">
						{{ tag }}
					</div>
					<span v-if="tags.isLeft" class="text-base-content/75">...</span>
				</div>
			</div>
		</a>
	</li>
</template>

<script lang="ts" setup>
const { item } = defineProps<{
	item: {
		name: string
		description: string
		icon: string
		tags: string
	}
	isFocused: boolean
}>()
defineEmits<{ enter: [] }>()

const tags = computed(() => {
	const tags = item.tags.split(',').map((v) => v.trim())
	return {
		data: [...tags].splice(0, 5),
		isLeft: tags.length > 5,
	}
})
</script>
