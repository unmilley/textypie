<template>
	<fieldset v-if="isFinished" class="fieldset w-xs bg-base-100 border border-base-300 p-4 rounded-box">
		<legend class="fieldset-legend">Editor</legend>

		<label class="fieldset-label">Font size</label>
		<input type="number" class="input" v-model="data.fontSize" />

		<label class="fieldset-label">Line height</label>
		<input type="number" class="input" v-model="data.lineHeight" />
	</fieldset>
</template>

<script lang="ts" setup>
const { data, isFinished } = useSettings<MonacoEditorOptions>('editor')
</script>
