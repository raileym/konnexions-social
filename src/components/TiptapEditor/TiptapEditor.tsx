import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'
import Underline from '@tiptap/extension-underline'
import Heading from '@tiptap/extension-heading'
import { Markdown } from 'tiptap-markdown';
import type { TiptapEditorProps } from '@cknTypes/types'
import { useState } from 'react'

export const TiptapEditor = ({ initialValue, title, onChange }: TiptapEditorProps ) => {

  const [markdownContent, setMarkdownContent] = useState<string | null>(null)
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      Heading.configure({ levels: [1, 2, 3] }),
      Markdown
    ],
    content: initialValue, // '<p>Hello, <strong>Tiptap</strong>! Try the toolbar buttons.</p>',
    onUpdate: ({ editor }) => {
      const markdown = editor.storage.markdown.getMarkdown()
      onChange(markdown)
      setMarkdownContent(markdown)
    }
  })

  if (!editor) return null

  // const buttonClass = (active: boolean) =>
  //   `px-3 py-1 mr-2 rounded border ${
  //     active ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
  //   } transition-colors duration-200`

  return (
    <>
      <div className="w-80 center db mb4 f3 mb3">{title}</div>
      <div className="ba pa3X br3 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
        <div className="flex justify-center mb-6X bg-brandX bb bw1 b--moon-gray h2X pv1" style={{height: '3rem'}}>
          <div className="bg-redX mr4">
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              className={'w2 h2 ma1 f4 bg-brand white bn'}
              // className={buttonClass(editor.isActive('heading', { level: 1 }))}
            >
              H1
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              className={'w2 h2 ma1 f4 bg-brand white bn'}
              // className={buttonClass(editor.isActive('heading', { level: 2 }))}
            >
              H2
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              className={'w2 h2 ma1 f4 bg-brand white bn'}
              // className={buttonClass(editor.isActive('heading', { level: 3 }))}
            >
              H3
            </button>
          </div>
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
      <pre>{markdownContent}</pre>
    </>
  )
}
