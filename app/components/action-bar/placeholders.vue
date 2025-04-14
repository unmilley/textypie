<template>
	<div class="pointer-events-none absolute inset-0 flex items-center">
		<Transition
			v-show="isVisible"
			mode="out-in"
			enter-active-class="transition duration-300 ease-out"
			leave-active-class="transition duration-300 ease-in"
			enter-from-class="opacity-0 translate-y-3"
			enter-to-class="opacity-100 translate-y-0"
			leave-from-class="opacity-100 translate-y-0"
			leave-to-class="opacity-0 -translate-y-3"
		>
			<p
				:key="currentPlaceholder"
				class="w-[calc(100%-2rem)] truncate pl-9 text-left text-sm font-normal text-neutral-500 sm:text-base dark:text-zinc-500"
			>
				{{ placeholders[currentPlaceholder] }}
			</p>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
const { placeholders = ['Add Slashes', 'Count Words', 'Format JSON', 'Hex To ASCII', 'Minify CSS'], isVisible } =
	defineProps<{
		placeholders?: string[]
		isVisible: boolean
	}>()

const currentPlaceholder = ref<number>(0)
const { pause, resume, isActive } = useIntervalFn(() => {
	currentPlaceholder.value = (currentPlaceholder.value + 1) % placeholders.length
}, 3000)

watchThrottled(
	() => isVisible,
	(val) => {
		if (!val && !isActive.value) resume()
		else pause()
	},
	{ throttle: 500 },
)
</script>
