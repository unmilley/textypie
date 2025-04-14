<template>
	<div class="w-dvw h-dvh">
		<pre @click="text = Math.floor(Number(new Date()) * Math.random()).toString()">text: {{ text }}</pre>
		<vue-monaco-editor v-model:value="text" theme="vs-dark" :options="MONACO_EDITOR_OPTIONS" @mount="handleMount" />
	</div>
</template>

<script lang="ts" setup>
import { VueMonacoEditor } from '@guolao/vue-monaco-editor'
import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

type MonacoEditor = typeof monacoEditor

const MONACO_EDITOR_OPTIONS: monacoEditor.editor.IStandaloneEditorConstructionOptions = {
	automaticLayout: true,
	formatOnType: true,
	formatOnPaste: true,
	minimap: { enabled: false },
	tabSize: 2,
	smoothScrolling: true,
	linkedEditing: true,
	folding: true,
	lineHeight: 20,
	useTabStops: false,
	fontSize: 12,
	stickyScroll: { enabled: false },
	unicodeHighlight: {
		invisibleCharacters: false,
		allowedLocales: { ru: true },
	},
	cursorStyle: 'line-thin',
	glyphMargin: false,
	cursorBlinking: 'phase',
	cursorSmoothCaretAnimation: 'on',
}

const text = ref(`#00ff00`)
const history = useThrottledRefHistory(text, { deep: true, throttle: 5e3 })

const editor = shallowRef<monacoEditor.editor.IStandaloneCodeEditor>()
const handleMount = (editorInstance: monacoEditor.editor.IStandaloneCodeEditor, monaco: MonacoEditor) => {
	editor.value = editorInstance
	editor.value.addCommand(monacoEditor.KeyMod.CtrlCmd | monacoEditor.KeyCode.KeyZ, history.undo)
	editor.value.addCommand(monacoEditor.KeyMod.CtrlCmd | monacoEditor.KeyCode.KeyY, history.redo)
}
</script>
