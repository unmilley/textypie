<template>
	<div>
		<AppNavbar>
			<TauriOnly>
				<TauriTitlebarActions />
			</TauriOnly>
		</AppNavbar>
		<div class="mt-9 overflow-hidden">
			<slot />
		</div>
	</div>
</template>

<script lang="ts" setup></script>
