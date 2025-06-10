<template>
	<div class="relative size-full">
		<vue-monaco-editor
			v-model:value="content"
			:theme="$colorMode.value === 'dark' ? 'vs-dark' : 'vs-light'"
			:options="MONACO_EDITOR_OPTIONS"
			@mount="handleMount"
		/>
		<div
			class="absolute inset-0 size-full flex flex-col items-center justify-center opacity-40 pointer-events-none select-none"
			v-show="!content.length"
		>
			<Icon name="textypie:logo" size="4.5rem" />

			<p class="relative w-full h-16">
				<ActionBarPlaceholders
					class="justify-center *:text-center *:pl-0"
					:is-visible="!content.length"
					:placeholders
				/>
			</p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

type MonacoEditor = typeof monacoEditor

const { data } = useSettings<MonacoEditorOptions>('editor', { lineHeight: 20, fontSize: 12 })

const MONACO_EDITOR_OPTIONS = computed(
	(): MonacoEditorOptions => ({
		automaticLayout: true,
		formatOnType: true,
		formatOnPaste: true,
		minimap: { enabled: false },
		tabSize: 2,
		smoothScrolling: true,
		linkedEditing: true,
		folding: true,
		lineHeight: data.value.lineHeight,
		useTabStops: false,
		fontSize: data.value.fontSize,
		fontFamily: '"Fira Code", Menlo, Monaco, "Courier New", monospace',
		fontLigatures: true,
		stickyScroll: { enabled: false },
		unicodeHighlight: {
			invisibleCharacters: false,
			allowedLocales: { ru: true },
		},
		cursorStyle: 'line-thin',
		glyphMargin: false,
		cursorBlinking: 'phase',
		cursorSmoothCaretAnimation: 'on',
		contextmenu: false,
		links: false,
		acceptSuggestionOnCommitCharacter: false,
	}),
)
const content = defineModel<string>({ required: true })

const history = useThrottledRefHistory(content, { deep: true, throttle: 5e3 })

const editor = shallowRef<monacoEditor.editor.IStandaloneCodeEditor>()
const handleMount = (editorInstance: monacoEditor.editor.IStandaloneCodeEditor, monaco: MonacoEditor) => {
	editorInstance.addCommand(monacoEditor.KeyMod.CtrlCmd | monacoEditor.KeyCode.KeyZ, history.undo)
	editorInstance.addCommand(monacoEditor.KeyMod.CtrlCmd | monacoEditor.KeyCode.KeyY, history.redo)

	editor.value = editorInstance
}

onStartTyping(() => {
	if (!editor.value?.hasTextFocus()) editor.value?.focus()
})

const placeholders = ['Start typing', 'Drop file here', 'Dblclick an empty space on the tab \nfor a new tab']
</script>
