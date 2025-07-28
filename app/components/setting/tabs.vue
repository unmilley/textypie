<template>
	<fieldset
		v-if="isFinished"
		class="fieldset w-xs bg-base-100 border border-base-300 p-4 rounded-box self-start"
		:class="{ 'hidden md:grid': !$isTauri }"
	>
		<legend class="fieldset-legend">Tabs</legend>

		<label class="label">
			<input type="checkbox" v-model="data" class="checkbox" />
			Action Close Visibility
		</label>
	</fieldset>
</template>

<script lang="ts" setup>
const { data, isFinished } = useSettings<boolean>('tabs', true)
</script>
