<template>
	<button
		v-if="isFinished"
		class="btn bg-base-300 btn-sm border border-base-content/30 max-[28.5rem]:hidden"
		:disabled="!isApp"
		@click.prevent.stop="open()"
	>
		<Icon name="bx:search" size="1.25rem" class="opacity-50" />
		<div class="divider divider-horizontal !w-1 mx-0"></div>
		<span class="w-36 text-left text-sm font-light opacity-80">{{ isVisible ? 'Select an action' : 'Search' }}</span>
		<kbd class="kbd kbd-sm min-w-14 capitalize text-base-content/80">{{ kbd }}</kbd>
	</button>
</template>

<script lang="ts" setup>
const { isVisible, open } = useModal('action-bar')
const isApp = computed(() => useRoute().name === 'app')

const { data: combination, isFinished } = useSettings<Combinations>('master-key')
const kbd = computed(() => {
	if (!isFinished.value || typeof combination.value === undefined || !combination.value.length) return '???'
	return combination.value.map(({ key }) => key).join(' ')
})
</script>
