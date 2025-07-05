import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import type { JSONContent } from '@tiptap/core'

export const TiptapEditor: React.FC = () => {

  const [contentJSON, setContentJSON] = useState<null | JSONContent>(null)
  const [contentText, setContentText] = useState<null | string>(null)
  const [contentHTML, setContentHTML] = useState<null | string>(null)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] })
    ],
    content: '<p>Hello, <strong>Tiptap</strong>! Try the toolbar buttons.</p>',
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      setContentJSON(json)
      const text = editor.getText()
      setContentText(text)
      const html = editor.getHTML()
      setContentHTML(html)
      // You can also console.log(json) to see the live JSON!
    }
  })

  if (!editor) return null

  // const buttonClass = (active: boolean) =>
  //   `px-3 py-1 mr-2 rounded border ${
  //     active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
  //   } transition-colors duration-200`

  return (
    <>
      <div className="ba pa3X br3 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="flex justify-center mb-6X bg-brandX bb bw1 b--moon-gray h2X pv1" style={{height: '3rem'}}>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={'w2 h2 ma1 f3 bg-brand white bn'}
            // className={buttonClass(editor.isActive('heading', { level: 1 }))}
          >
            H1
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={'w2 h2 ma1 f3 bg-brand white bn'}
            // className={buttonClass(editor.isActive('bold'))}
            aria-label="Bold"
            title="Bold (Ctrl+B)"
            type="button"
          >
            <b>B</b>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={'w2 h2 ma1 f3 bg-brand white bn'}
            // className={buttonClass(editor.isActive('italic'))}
            aria-label="Italic"
            title="Italic (Ctrl+I)"
            type="button"
          >
            <em>I</em>
          </button>

          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
            className={'w2 h2 ma1 f3 bg-brand white bn'}
            // className={buttonClass(editor.isActive('underline'))}
            aria-label="Underline"
            title="Underline (Ctrl+U)"
            type="button"
          >
            <u>U</u>
          </button>
        </div>

        <EditorContent
          editor={editor}
          className="min-h-[200px] h5 ph3 baX b---black-300X roundedX p-4X focus:outline-none focus:ring-2X focus:ring-blue-400X"
        />
      </div>
      <pre>{contentHTML}</pre>
      <pre>{contentText}</pre>
      <pre>{JSON.stringify(contentJSON, null, 2)}</pre>
    </>
  )
}
