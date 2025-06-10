import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'
import { ConfigSchema, type zInfer } from '~/src/schemas'

export type Combination = { key: string; code: string }
export type Combinations = [Combination, Combination]

export type MonacoEditorOptions = monacoEditor.editor.IStandaloneEditorConstructionOptions

export type Config = zInfer<typeof ConfigSchema>

export type Tab = {
	title: string
	content: string
	file?: File
}
