<template>
	<AppDraggableFile @change="getContent">
		<vue-monaco-editor
			v-model:value="text"
			:theme="$colorMode.value === 'dark' ? 'vs-dark' : 'vs-light'"
			:options="MONACO_EDITOR_OPTIONS"
			@mount="handleMount"
		/>
		<ActionBar v-model="text" />
	</AppDraggableFile>
</template>

<script lang="ts" setup>
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

type MonacoEditor = typeof monacoEditor

const { data } = useIdStorage<MonacoEditorOptions>('editor', { lineHeight: 20, fontSize: 12 })

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
	}),
)

const text = ref(`#00ff00`)
const history = useThrottledRefHistory(text, { deep: true, throttle: 5e3 })

const editor = shallowRef<monacoEditor.editor.IStandaloneCodeEditor>()
const handleMount = (editorInstance: monacoEditor.editor.IStandaloneCodeEditor, monaco: MonacoEditor) => {
	editor.value = editorInstance
	editor.value.addCommand(monacoEditor.KeyMod.CtrlCmd | monacoEditor.KeyCode.KeyZ, history.undo)
	editor.value.addCommand(monacoEditor.KeyMod.CtrlCmd | monacoEditor.KeyCode.KeyY, history.redo)
}

const { file, open, save, saveAs } = useFileSystemAccess()

const getContent = async (event: File) => {
	file.value = event
	text.value = await event.text()

	push.info({ title: event.name, message: 'File is uploaded', duration: 15000 })
}
</script>
