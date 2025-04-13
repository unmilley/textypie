<template>
	<div>
		<TauriOnly>
			<TauriTitlebar />
		</TauriOnly>
		<div :class="{ 'mt-9': $isTauri }" class="overflow-hidden">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup></script>
