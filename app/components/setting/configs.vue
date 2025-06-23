<template>
	<fieldset class="fieldset min-w-xs w-max max-w-[40rem] bg-base-100 border border-base-300 p-4 rounded-box">
		<legend class="fieldset-legend">Scripts</legend>

		<label class="fieldset-label">Action name</label>
		<div class="join">
			<input type="text" class="input join-item" v-model="action" placeholder="case" />
			<div class="tooltip" data-tip="Enable all scripts">
				<button class="btn btn-soft btn-error join-item" :disabled="isAllEnabled" @click="enableAllScripts">
					Reset
				</button>
			</div>
		</div>

		<div class="h-96 overflow-x-auto">
			<table class="table table-pin-rows bg-base-200">
				<template v-for="letter in Object.keys(table.letters)" :key="letter">
					<thead>
						<tr>
							<th class="uppercase">{{ letter }}</th>
						</tr>
					</thead>
					<tbody>
						<template v-for="data in table.letters[letter]" :key="data.name">
							<tr :title="data.name">
								<td>
									<label class="label">
										<input
											type="checkbox"
											class="checkbox"
											:checked="inDisabled(data.name)"
											@input="changeViability(data.name)"
										/>
										{{ data.name }}
									</label>
								</td>
							</tr>
						</template>
					</tbody>
				</template>
			</table>
		</div>
	</fieldset>
</template>

<script lang="ts" setup>
const action = ref('')
const { actions, disabledActions } = useActions()
const { results } = useFuse(action, actions, {
	matchAllWhenSearchEmpty: true,
	fuseOptions: { findAllMatches: true, keys: ['name'], threshold: 0.1 },
	resultLimit: 10,
})

const table = computed(() => {
	const filtered = Object.values(results.value)
		.map(({ item }) => ({ ...item }))
		.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

	const letters = filtered.reduce((acc, el) => {
		const letter = el.name[0]!.toLowerCase()
		if (acc[letter]) acc[letter].push(el)
		else acc[letter] = [el]
		return acc
	}, {} as Record<string, Config[]>)

	return { filtered, letters }
})

const changeViability = async (data: string) => {
	const id = disabledActions.value.findIndex((name) => name === data)
	if (id === -1) disabledActions.value.push(data)
	else disabledActions.value.splice(id, 1)
}

const inDisabled = (name: string) => {
	return !disabledActions.value.includes(name)
}

const isAllEnabled = computed(() => disabledActions.value.length === 0)

const enableAllScripts = async () => {
	disabledActions.value = []
	push.info({ title: `Scripts`, message: `All scripts are enable` })
}
</script>
