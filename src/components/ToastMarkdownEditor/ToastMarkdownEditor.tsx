import { useRef } from 'react'
import { Editor, Editor as ToastEditorInstance } from '@toast-ui/react-editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import type { ToastMarkdownEditorProps } from '@cknTypes/types'

export const ToastMarkdownEditor = ({ initialValue = '', onChange, title }: ToastMarkdownEditorProps) => {
  // Ref type is React.RefObject<ToastEditorInstance>
  const editorRef = useRef<ToastEditorInstance>(null)

  const handleChange = () => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance()
      const markdown = editorInstance.getMarkdown()
      if (onChange) onChange(markdown)
    }
  }

  // See https://github.com/nhn/tui.editor/blob/master/docs/en/toolbar.md
  const toolbarItems = [
    [
    {
      name: 'heading',
      tooltip: 'heading',
      command: 'heading',
      text: 'H',      
      className: 'toastui-editor-toolbar-icons-custom',
      style: { fontStyle: 'regular' },
    },
    {
      name: 'italic',
      tooltip: 'italic',
      command: 'italic',
      text: 'I',      
      className: 'toastui-editor-toolbar-icons-custom',
      style: { fontStyle: 'italic' },
    },
    {
      name: 'bold',
      tooltip: 'bold',
      command: 'bold',
      text: 'B',
      className: 'toastui-editor-toolbar-icons-custom',
    }      
    ], // group 1
  ]

  return (
    <>
      <div className="w-80 center">
        <div className="w-80 center db mb2 f3 mb3">{title}</div>
        <Editor
          initialValue={initialValue}
          previewStyle="vertical"
          height="400px"
          initialEditType="wysiwyg"
          useCommandShortcut={true}
          ref={editorRef}
          onChange={handleChange}
          toolbarItems={toolbarItems}  
        />
      </div>
    </>
  )
}
