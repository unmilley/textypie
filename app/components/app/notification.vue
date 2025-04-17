<template>
	<div
		v-if="data"
		:class="['alert alert-soft group', data.alert]"
		:key="item.duplicateCount"
		:role="item.ariaRole"
		:aria-live="item.ariaLive"
	>
		<Icon :name="data.icon" size="1.25rem" />

		<template v-if="item.title">
			<div>
				<h3 class="font-bold">{{ item.title }}</h3>
				<div class="text-xs">{{ item.message }}</div>
			</div>
		</template>
		<template v-else>
			<span>{{ item.message }}</span>
		</template>

		<template v-if="item.props.action">
			<button class="btn btn-sm btn-outline btn-soft" @click="item.props.action[1]">{{ item.props.action[0] }}</button>
		</template>
		<button
			class="btn btn-circle btn-xs btn-soft absolute -top-2 right-0 transition-opacity opacity-0 group-hover:opacity-100"
			:class="data.btn"
			@click="item.clear"
			aria-label="Dismiss"
		>
			<Icon name="bx:x-circle" size="1.25rem" />
		</button>
	</div>
</template>

<script lang="ts" setup>
import { type NotivueItem } from 'notivue'

type ColorType = {
	btn: string
	alert: string
	text: string
	icon: string
}
type NotificationType = keyof typeof dataTypes

const { item } = defineProps<{ item: NotivueItem & { key?: string } }>()

const colorToClass = {
	success: { btn: 'btn-success', alert: 'alert-success', text: 'text-success' },
	error: { btn: 'btn-error', alert: 'alert-error', text: 'text-error' },
	warning: { btn: 'btn-warning', alert: 'alert-warning', text: 'text-warning' },
	info: { btn: 'btn-info', alert: 'alert-info', text: 'text-info' },
}

const dataTypes: { [x in keyof typeof colorToClass]: ColorType } = {
	success: { icon: 'bx:check-circle', ...colorToClass['success'] },
	error: { icon: 'bx:error-circle', ...colorToClass['error'] },
	warning: { icon: 'bx:error-circle', ...colorToClass['warning'] },
	info: { icon: 'bx:info-circle', ...colorToClass['info'] },
}

const data = computed(() => {
	const { type } = item

	if (!(type in dataTypes)) return void 0
	const found = dataTypes[type as NotificationType]

	return { ...found }
})
</script>
