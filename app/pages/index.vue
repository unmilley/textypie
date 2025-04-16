<template>
	<div class="hero bg-base-100 min-h-screen">
		<div class="hero-content">
			<div class="max-w-md">
				<h1 class="text-5xl font-bold flex items-center gap-2">
					<Icon name="textypie:logo-fill" size="3rem" />
					<span>Textypie</span>
				</h1>
				<p class="py-6">
					A scripting notebook for developers! Modify, adapt, convert in safety – now you can do it all!
				</p>
				<div class="flex gap-4">
					<nuxt-link to="/app" class="btn h-16 alert gap-2 ~min-w-max">
						<Icon name="textypie:logo" size="2.2rem" />
						<div>
							<h3 class="text-xs">Web version</h3>
							<div class="text-lg font-bold">To app</div>
						</div>
					</nuxt-link>
					<tauri-link href="https://github.com/unmilley/textypie" target="_blank" class="btn h-16 alert w-max">
						<Icon name="bx:bxl-github" size="2.2rem" />
						<div>
							<h3 class="text-xs">Get in on</h3>
							<div class="text-lg font-bold">Github</div>
						</div>
					</tauri-link>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup></script>
