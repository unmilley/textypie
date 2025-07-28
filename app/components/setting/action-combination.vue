<template>
	<fieldset
		v-if="isFinished"
		class="fieldset w-xs bg-base-100 border border-base-300 p-4 rounded-box"
		:class="{ 'hidden md:grid': !$isTauri }"
	>
		<legend class="fieldset-legend">Action combination</legend>

		<label class="fieldset-label">Modifier</label>
		<input type="text" class="input" v-model="combination[0].key" @keydown="handleKeydown($event, 0)" />

		<label class="fieldset-label">Key</label>
		<input type="text" class="input" v-model="combination[1].key" @keydown="handleKeydown($event, 1)" />
	</fieldset>
</template>

<script lang="ts" setup>
const { data: combination, isFinished } = useSettings<Combinations>('master-key')

const supportedModifiers = ['Control', 'Shift', 'Alt']
const notSupportedKeys = ['KeyZ', 'KeyY', 'KeyF']

const handleKeydown = async (event: KeyboardEvent, index: 0 | 1) => {
	event.preventDefault()
	if (index === 0 && !supportedModifiers.includes(event.key)) return
	if (index === 1 && notSupportedKeys.includes(event.code)) return

	combination.value[index] = {
		key: event.key === 'Control' ? 'Ctrl' : event.key,
		code: event.code,
	}
}
</script>
