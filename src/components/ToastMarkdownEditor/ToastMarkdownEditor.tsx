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

  const toolbarItems = [
    ['heading', 'bold', 'italic'], // group 1
  ]

  return (
    <>
      <div className="w-80 center">
        <div className="w-80 center db mb2 f3 mb3">{title}</div>
        <Editor
          initialValue={initialValue}
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
          useCommandShortcut={true}
          ref={editorRef}
          onChange={handleChange}
          toolbarItems={toolbarItems}  
        />
      </div>
    </>
  )
}
