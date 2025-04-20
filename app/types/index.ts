import * as monacoEditor from 'monaco-editor/esm/vs/editor/editor.api'

export type Combination = { key: string; code: string }
export type Combinations = [Combination, Combination]

export type MonacoEditorOptions = monacoEditor.editor.IStandaloneEditorConstructionOptions
