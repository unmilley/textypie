<template>
	<Body class="w-dvw h-dvh overflow-hidden">
		<NuxtLayout>
			<Notivue v-slot="item">
				<Notification :item="item" :theme="$colorMode.value === 'dark' ? darkTheme : lightTheme">
					<NotificationProgress :item="item" />
				</Notification>
			</Notivue>
			<NuxtPage />
		</NuxtLayout>
	</Body>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme } from 'notivue'
</script>
