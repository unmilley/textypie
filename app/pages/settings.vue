<template>
	<div class="container px-4">
		<div class="breadcrumbs text-sm">
			<ul>
				<li><nuxt-link to="/app" class="link">App</nuxt-link></li>
				<li>Settings</li>
			</ul>
		</div>
		<!--  -->
		<div class="flex flex-wrap gap-4">
			<SettingActionCombination />
			<SettingEditor />
			<SettingTabs />
			<SettingConfigs />
		</div>
	</div>
</template>

<script lang="ts" setup></script>
