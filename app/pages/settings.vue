<template>
	<div class="container px-4">
		<div class="breadcrumbs text-sm">
			<ul>
				<li><nuxt-link to="/app" class="link">App</nuxt-link></li>
				<li>Settings</li>
			</ul>
		</div>
		<!--  -->
		<SettingActionCombination />
		<SettingEditor />
		<SettingTabs />
	</div>
</template>

<script lang="ts" setup></script>
